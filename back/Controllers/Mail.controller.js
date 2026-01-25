const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');

// 1️⃣ הגדרת API Key של SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/send', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const filePath = path.join(__dirname, '../Files/טופס רישום אורחות יושר תשפז+תקנון.pdf');

  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ message: 'File not found' });
  }

  try {
    const msg = {
      to: email,
      from: 'R0548431830@gmail.com', // חייב להיות ה-Sender המאומת ב-SendGrid
      replyTo: 'R0548431830@gmail.com',
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
          content: fs.readFileSync(filePath).toString('base64'),
          filename: 'טופס רישום - אהלי ספר.pdf',
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };

    await sgMail.send(msg);
    console.log(`✅ Email sent to ${email}`);
    res.status(200).json({ message: 'Mail sent successfully' });

  } catch (error) {
    console.error('❌ SendGrid Error:', error);
    res.status(500).json({ message: 'Failed to send mail', details: error.toString() });
  }
});

module.exports = router;
