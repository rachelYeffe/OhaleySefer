// mailRouter.js
const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  console.log('📨 POST /mail/send');

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    console.log('➡️ Sending to:', email);

    // נתיב לקובץ מצורף
    const filePath = path.join(__dirname, '..', 'Files', 'טופס רישום אורחות יושר תשפז+תקנון.pdf');
    console.log('📎 File path:', filePath);

    // יצירת Transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS // App Password אם יש 2FA
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000
    });

    // בדיקה אם החיבור ל-SMTP עובד
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
          filename: 'טופס רישום אורחות יושר תשפז + תקנון.pdf',
          path: filePath
        }
      ]
    });

    console.log('✅ Mail sent');
    res.status(200).json({ message: 'Mail sent successfully' });

  } catch (error) {
    console.error('❌ Mail error:', error);
    res.status(500).json({
      message: 'Failed to send mail',
      error: error.message
    });
  }
});

module.exports = router;
