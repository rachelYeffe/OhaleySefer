const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');

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
      from: {
        email: process.env.MAIL_FROM,
        name: 'אהלי ספר'
      },
      replyTo: process.env.MAIL_FROM,
      subject: 'טפסי רישום – אהלי ספר',
      html: `
        <div style="direction: rtl; text-align: right; font-family: Arial;">
          <p>שלום,</p>
          <p>מצורפים טפסי רישום.</p>
          <p>לאחר מילוי הטפסים, ניתן להשיב למייל זה.</p>
          <p>תודה רבה,</p>
          <strong>אהלי ספר</strong><br/>
          <small>שדרות יחזקאל 7, מודיעין עילית</small>
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
    res.json({ message: 'Mail sent successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Send failed' });
  }
});

module.exports = router;
