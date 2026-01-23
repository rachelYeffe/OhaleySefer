const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  console.log('📨 POST /mail/send');

  try {
    console.log('MAIL_USER:', process.env.MAIL_USER);
console.log('MAIL_PASS exists:', !!process.env.MAIL_PASS);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    console.log('➡️ Sending to:', email);

    const filePath = path.join(
      __dirname,
      '..',
      'Files',
      'טופס רישום אורחות יושר תשפז+תקנון.pdf'
    );

    console.log('📎 File path:', filePath);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true, // SSL
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      connectionTimeout: 10000, // מונע תקיעות
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    // בדיקת חיבור ל-SMTP (מאוד חשוב ל-Render)
    await transporter.verify();
    console.log('✅ SMTP connected');

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
