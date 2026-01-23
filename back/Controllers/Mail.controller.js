const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

router.post('/send', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // נתיב לקובץ מצורף
    const filePath = path.join(__dirname, '..', 'Files', 'טופס רישום אורחות יושר תשפז+תקנון.pdf');
    const attachment = fs.readFileSync(filePath).toString('base64');

    // יצירת transporter עם Gmail + App Password
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,       // TLS במקום SSL
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      requireTLS: true,
      connectionTimeout: 30000
    });

    // בדיקה חיבור
    await transporter.verify();
    console.log('✅ SMTP connected');

    // שליחת המייל
    await transporter.sendMail({
      from: `"אהלי ספר" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'טפסי רישום',
      html: `
        <div style="direction: rtl; text-align: right; font-family: Arial">
          <p>שלום,</p>
          <p>מצורפים טפסי רישום.</p>
          <p>לאחר מילוי הטפסים, יש להחזירם למייל זה.</p>
          <p>תודה רבה.</p>
        </div>
      `,
      attachments: [
        {
          content: attachment,
          filename: 'טופס רישום אורחות יושר תשפז + תקנון.pdf',
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    });

    console.log('✅ Mail sent');
    res.status(200).json({ message: 'Mail sent successfully' });

  } catch (error) {
    console.error('❌ Mail error:', error);
    res.status(500).json({ message: 'Failed to send mail', error: error.message });
  }
});

module.exports = router;
