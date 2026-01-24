const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

router.post('/send', async (req, res) => {
  try {
    const { email } = req.body; // המייל של הלקוח שביקש את הטפסים

    const filePath = path.join(__dirname, '../Files/טופס רישום אורחות יושר תשפז+תקנון.pdf');

    // 1. בדיקה שהקובץ קיים
    if (!fs.existsSync(filePath)) {
      console.error('File not found at:', filePath);
      return res.status(400).json({ message: 'הקובץ לא נמצא בשרת' });
    }

    // 2. הגדרת הטרנספורטר עם הגדרות אבטחה מחמירות
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // שימוש ב-SSL
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        // מונע בעיות חיבור בשרתי לינוקס
        rejectUnauthorized: false
      }
    });

    // 3. שליחת המייל
    await transporter.sendMail({
      from: `"אהלי ספר" <${process.env.MAIL_USER}>`,
      to: email, // נשלח למי שביקש
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
          filename: 'טופס רישום - אהלי ספר.pdf',
          path: filePath
        }
      ]
    });

    console.log(`Email sent successfully to: ${email}`);
    res.status(200).json({ message: 'Mail sent successfully' });

  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ 
      message: 'Failed to send mail', 
      details: error.message 
    });
  }
});

module.exports = router;