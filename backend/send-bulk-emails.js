import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'
const MONGO_DB = process.env.MONGO_DB || 'buytrade'

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
    rejectUnauthorized: false
  }
})

// Email templates (same as in server.js)
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
    return { success: true, messageId: result.messageId }
  } catch (error) {
    return { success: false, error: error.message, code: error.code }
  }
}

// Add delay between emails to avoid rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function sendBulkWelcomeEmails() {
  const client = new MongoClient(MONGO_URI)
  
  try {
    console.log('🔗 Connecting to MongoDB...')
    await client.connect()
    const db = client.db(MONGO_DB)
    
    console.log('📧 Fetching all emails from waitlist...')
    const col = db.collection('waitlist')
    const emails = await col.find().sort({ createdAt: 1 }).toArray()
    
    console.log(`📊 Found ${emails.length} emails in the waitlist`)
    
    if (emails.length === 0) {
      console.log('❌ No emails found in database')
      return
    }
    
    // Ask for confirmation before sending
    console.log('📋 Emails to receive welcome email:')
    emails.forEach((item, index) => {
      const date = new Date(item.createdAt).toISOString().split('T')[0]
      console.log(`  ${index + 1}. ${item.email} (joined: ${date})`)
    })
    
    console.log('\n⚠️  WARNING: This will send welcome emails to ALL users above!')
    console.log('Press Ctrl+C to cancel, or wait 10 seconds to continue...\n')
    
    // 10 second delay for user to cancel
    for (let i = 10; i > 0; i--) {
      process.stdout.write(`Starting in ${i} seconds...\r`)
      await delay(1000)
    }
    console.log('\n🚀 Starting bulk email send...\n')
    
    let successCount = 0
    let failCount = 0
    
    for (let i = 0; i < emails.length; i++) {
      const { email } = emails[i]
      const progress = `[${i + 1}/${emails.length}]`
      
      console.log(`${progress} Sending to: ${email}`)
      
      const result = await sendWelcomeEmail(email)
      
      if (result.success) {
        console.log(`✅ ${progress} Success: ${email} (ID: ${result.messageId.substring(0, 20)}...)`)
        successCount++
      } else {
        console.log(`❌ ${progress} Failed: ${email} - ${result.error}`)
        failCount++
      }
      
      // Add delay between emails (2 seconds) to avoid overwhelming SMTP server
      if (i < emails.length - 1) {
        await delay(2000)
      }
    }
    
    console.log('\n🎉 Bulk email sending completed!')
    console.log(`✅ Successful: ${successCount}`)
    console.log(`❌ Failed: ${failCount}`)
    console.log(`📊 Total: ${emails.length}`)
    
  } catch (error) {
    console.error('💥 Error during bulk email send:', error)
  } finally {
    await client.close()
    console.log('🔐 Database connection closed')
  }
}

// Check command line arguments
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
📧 Bulk Welcome Email Sender

Usage:
  node send-bulk-emails.js [options]

Options:
  --dry-run    Show emails that would be sent without actually sending
  --help, -h   Show this help message

Examples:
  node send-bulk-emails.js           # Send emails to all waitlist users
  node send-bulk-emails.js --dry-run # Preview without sending

⚠️  Make sure your .env file has correct SMTP settings before running!
  `)
  process.exit(0)
}

if (args.includes('--dry-run')) {
  console.log('🧪 DRY RUN MODE - No emails will be sent\n')
  
  const client = new MongoClient(MONGO_URI)
  try {
    await client.connect()
    const db = client.db(MONGO_DB)
    const col = db.collection('waitlist')
    const emails = await col.find().sort({ createdAt: 1 }).toArray()
    
    console.log(`📊 Found ${emails.length} emails that would receive welcome email:`)
    emails.forEach((item, index) => {
      const date = new Date(item.createdAt).toISOString().split('T')[0]
      console.log(`  ${index + 1}. ${item.email} (joined: ${date})`)
    })
    
    console.log('\n✅ Dry run complete. Use without --dry-run to actually send emails.')
  } catch (error) {
    console.error('Error during dry run:', error)
  } finally {
    await client.close()
  }
} else {
  // Run the bulk email sender
  sendBulkWelcomeEmails()
}