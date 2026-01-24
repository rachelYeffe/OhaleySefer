const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const filePath = path.join(
      __dirname,
      '..',
      'Files',
      'טופס רישום אורחות יושר תשפז+תקנון.pdf'
    );

    const fileBuffer = fs.readFileSync(filePath);

    await resend.emails.send({
      from: `אהלי ספר <${process.env.MAIL_FROM}>`,
      to: email,
      subject: 'טפסי רישום',
      html: `
        <div style="direction: rtl; text-align: right;">
          <p>שלום,</p>
          <p>מצורפים טפסי רישום.</p>
          <p>לאחר מילוי הטפסים, יש להחזירם למייל זה.</p>
          <p>תודה רבה.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'טופס רישום.pdf',
          content: fileBuffer
        }
      ]
    });

    res.json({ message: 'Mail sent successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Mail failed', error: err.message });
  }
});

module.exports = router;
