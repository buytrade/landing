import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import { MongoClient } from 'mongodb'

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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailTrim)) {
    return res.status(400).json({ error: 'invalid email' })
  }

  try {
    const col = db.collection('waitlist')
    const existing = await col.findOne({ email: emailTrim })
    if (existing) {
      return res.status(200).json({ ok: true, message: 'already subscribed' })
    }

    const result = await col.insertOne({ email: emailTrim, createdAt: new Date() })
    return res.status(201).json({ ok: true, id: result.insertedId })
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

process.on('SIGINT', async () => {
  console.log('Shutting down...')
  await client.close()
  process.exit(0)
})

start()
