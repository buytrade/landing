import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import { MongoClient } from 'mongodb'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'
const MONGO_DB = process.env.MONGO_DB || 'buytrade'
const PORT = process.env.PORT || 4000

const client = new MongoClient(MONGO_URI)
let db

// Configure nodemailer with Zoho SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // Accept self-signed certificates (for development)
  }
})

// Email templates
const createWelcomeEmail = (email) => ({
  from: `"BuyTrade Team" <${process.env.SMTP_USER}>`,
  to: email,
  subject: 'Welcome to BuyTrade Waitlist! 🚀',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #6d00f1 0%, #4c00a8 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to BuyTrade! 🎉</h1>
      </div>
      
      <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">You're on the waitlist!</h2>
        <p style="color: #666; line-height: 1.6; font-size: 16px;">
          Thank you for joining the BuyTrade waitlist! You're one step closer to accessing our revolutionary trading platform.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #6d00f1; margin: 20px 0;">
          <h3 style="color: #6d00f1; margin-top: 0;">What happens next?</h3>
          <ul style="color: #666; padding-left: 20px;">
            <li>We'll notify you as soon as we launch</li>
            <li>Get exclusive early access to new features</li>
            <li>Receive trading tips and market insights</li>
            <li>Be the first to know about special offers</li>
          </ul>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px;">
        <p style="color: #888; font-size: 14px;">
          Follow us on social media for updates:<br>
          <a href="https://youtube.com/@buytradeapp" style="color: #6d00f1; text-decoration: none;">YouTube</a> |
          <a href="https://www.instagram.com/buytradeapp" style="color: #6d00f1; text-decoration: none;">Instagram</a> |
          <a href="https://t.me/buytradeappforfreesignals" style="color: #6d00f1; text-decoration: none;">Telegram</a>
        </p>
        
        <p style="color: #bbb; font-size: 12px; margin-top: 30px;">
          © 2024 BuyTrade. All rights reserved.<br>
          This email was sent to ${email} because you signed up for our waitlist.
        </p>
      </div>
    </div>
  `,
  text: `
Welcome to BuyTrade!

Thank you for joining our waitlist! You're one step closer to accessing our revolutionary trading platform.

What happens next?
- We'll notify you as soon as we launch
- Get exclusive early access to new features  
- Receive trading tips and market insights
- Be the first to know about special offers

Follow us for updates:
- YouTube: https://youtube.com/@buytradeapp
- Instagram: https://www.instagram.com/buytradeapp
- Telegram: https://t.me/buytradeappforfreesignals

© 2025 BuyTrade. All rights reserved.
  `,
})

async function sendWelcomeEmail(email) {
  try {
    const mailOptions = createWelcomeEmail(email)
    const result = await transporter.sendMail(mailOptions)
    console.log('Welcome email sent to:', email, 'MessageID:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Failed to send welcome email to:', email, error.message)
    // Log the specific error code for debugging
    if (error.code === 'EAUTH') {
      console.error('🚨 SMTP Authentication Error - Check Zoho credentials')
      console.error('💡 Possible solutions:')
      console.error('   - Generate App-Specific Password in Zoho')
      console.error('   - Verify 2FA settings')
      console.error('   - Check SMTP access is enabled')
    }
    return { success: false, error: error.message, code: error.code }
  }
}

async function start() {
  try {
    await client.connect()
    db = client.db(MONGO_DB)
    console.log('Connected to MongoDB:', MONGO_URI, 'DB:', MONGO_DB)

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

// Basic health
app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

// POST /api/signup
// Rate limiter: small limit to prevent abuse (adjust as needed)
const signupLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
})

app.post('/api/signup', signupLimiter, async (req, res) => {
  const { email } = req.body || {}
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'email is required' })
  }

  const emailTrim = email.trim().toLowerCase()
  console.log('🔔 Signup attempt for email:', emailTrim)
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailTrim)) {
    console.log('❌ Invalid email format:', emailTrim)
    return res.status(400).json({ error: 'invalid email' })
  }

  try {
    const col = db.collection('waitlist')
    const existing = await col.findOne({ email: emailTrim })
    if (existing) {
      console.log('📝 Email already exists in database:', emailTrim)
      return res.status(200).json({ ok: true, message: 'already subscribed' })
    }

    console.log('💾 Adding new email to database:', emailTrim)
    const result = await col.insertOne({ email: emailTrim, createdAt: new Date() })
    
    // Send welcome email after successful signup
    console.log('📧 Attempting to send welcome email to:', emailTrim)
    const emailResult = await sendWelcomeEmail(emailTrim)
    
    return res.status(201).json({ 
      ok: true, 
      id: result.insertedId,
      emailSent: emailResult.success 
    })
  } catch (err) {
    console.error('signup error', err)
    return res.status(500).json({ error: 'server error' })
  }
})

// Simple listing (dev only)
app.get('/api/waitlist', async (req, res) => {
  try {
    const col = db.collection('waitlist')
    const list = await col.find().sort({ createdAt: -1 }).limit(200).toArray()
    res.json({ ok: true, count: list.length, list })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
})

// Test email endpoint (admin only)
app.post('/api/test-email', async (req, res) => {
  const { email } = req.body || {}
  if (!email) {
    return res.status(400).json({ error: 'email required for test' })
  }

  console.log('Testing email send to:', email)
  const emailResult = await sendWelcomeEmail(email)
  
  res.json({
    ok: true,
    emailTest: emailResult,
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      secure: process.env.SMTP_SECURE
    }
  })
})

process.on('SIGINT', async () => {
  console.log('Shutting down...')
  await client.close()
  process.exit(0)
})

start()
