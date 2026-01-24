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

    console.log('📨 מנסה לשלוח למייל:', email);

    const filePath = path.join(
      __dirname,
      '..',
      'Files',
      'טופס רישום אורחות יושר תשפז+תקנון.pdf'
    );

    const fileBuffer = fs.readFileSync(filePath);

    // שליחה עם try/catch פנימי כדי ללכוד כל שגיאה
    try {
      const response = await resend.emails.send({
        from: 'Ahalei Sefer <onboarding@resend.dev>',
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

      console.log('✅ מייל נשלח בהצלחה!', response);
      res.json({ message: 'Mail sent successfully', response });

    } catch (err) {
      console.error('❌ שגיאה בשליחת המייל:', err);
      res.status(500).json({ message: 'Mail failed', error: err.message });
    }

  } catch (err) {
    console.error('❌ שגיאה בשרת:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
