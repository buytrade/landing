import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Test Zoho SMTP connection
async function testZohoConnection() {
  console.log('Testing Zoho SMTP connection...')
  console.log('Host:', process.env.SMTP_HOST)
  console.log('Port:', process.env.SMTP_PORT)
  console.log('User:', process.env.SMTP_USER)
  console.log('Password length:', process.env.SMTP_PASS?.length)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true, // Enable debug output
    logger: true // Enable logging
  })

  try {
    // Verify connection
    const verified = await transporter.verify()
    console.log('✅ SMTP connection verified:', verified)

    // Send test email
    const testEmail = {
      from: `"BuyTrade Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to self for testing
      subject: 'Test Email - BuyTrade SMTP Setup',
      text: 'This is a test email to verify Zoho SMTP configuration.',
      html: '<p>This is a test email to verify Zoho SMTP configuration.</p>'
    }

    console.log('Sending test email...')
    const result = await transporter.sendMail(testEmail)
    console.log('✅ Test email sent successfully!')
    console.log('Message ID:', result.messageId)
    console.log('Response:', result.response)

  } catch (error) {
    console.error('❌ SMTP Error:', error.message)
    console.error('Code:', error.code)
    console.error('Response:', error.response)
    
    // Provide troubleshooting tips
    console.log('\n🔍 Troubleshooting tips:')
    console.log('1. Check if 2-factor authentication is enabled in Zoho')
    console.log('2. Generate an App-Specific Password instead of using account password')
    console.log('3. Verify SMTP is enabled in Zoho Mail settings')
    console.log('4. Try port 587 with TLS instead of 465 with SSL')
  }
}

testZohoConnection()