const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  try {
    const { email } = req.body;

    const filePath = path.join(
      __dirname,
      '../Files/טופס רישום אורחות יושר תשפז+תקנון.pdf'
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `" אהלי ספר" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'טפסי רישום',
      html: `
    <div style="text-align: right; direction: rtl; font-family: Arial, sans-serif;">
      <p>שלום,</p>
      <p>מצורפים טפסי רישום.</p>
      <p>לאחר מילוי הטפסים, יש להחזירם לכתובת מייל זו.</p>
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

    res.status(200).json({ message: 'Mail sent successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send mail' });
  }
});
router.post('/send-test', (req, res) => {
  try {
    console.log('MAIL_USER:', process.env.MAIL_USER);
    console.log('MAIL_PASS:', process.env.MAIL_PASS ? '****' : 'missing');

    const filePath = path.join(
      __dirname,
      '../Files/טופס רישום אורחות יושר תשפז+תקנון.pdf'
    );
    const fs = require('fs');
    if (!fs.existsSync(filePath)) {
      console.error('Attachment file not found:', filePath);
      return res.status(500).json({ message: 'Attachment missing' });
    }

    res.status(200).json({ message: 'Env & file ok!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Test failed' });
  }
});

module.exports = router;
