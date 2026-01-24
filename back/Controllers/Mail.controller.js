const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

router.post('/send', async (req, res) => {
  try {
    const { email } = req.body;

    // הגדרת נתיב הקובץ - שים לב לוודא שהשם תואם בדיוק למה שיש בתיקייה (כולל רווחים)
    const filePath = path.join(
      __dirname,
      '../Files/טופס רישום אורחות יושר תשפז+תקנון.pdf'
    );

    // בדיקה אם הקובץ קיים בשרת לפני שמתחילים את תהליך השליחה
    if (!fs.existsSync(filePath)) {
      console.error('קובץ לא נמצא בנתיב:', filePath);
      return res.status(400).json({ message: 'הקובץ המצורף חסר בשרת' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // חובה false עבור פורט 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      // הגדרות זמן המתנה למניעת ETIMEDOUT בשרתים איטיים
      connectionTimeout: 10000, 
      greetingTimeout: 10000,
      socketTimeout: 20000,
      tls: {
        rejectUnauthorized: false // עוקף בעיות אבטחה בחיבור מהשרת
      }
    });

    await transporter.sendMail({
      from: `"אהלי ספר" <${process.env.MAIL_USER}>`,
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
          filename: 'registration_form.pdf', // שם הקובץ כפי שיופיע אצל הנמען
          path: filePath,
          contentType: 'application/pdf'
        }
      ]
    });

    console.log('מייל נשלח בהצלחה ל-:', email);
    res.status(200).json({ message: 'Mail sent successfully' });

  } catch (error) {
    console.error('שגיאה בשליחת המייל:', error);
    res.status(500).json({ message: 'Failed to send mail', error: error.message });
  }
});

// נתיב בדיקה לראות אם המערכת מזהה את הקובץ ואת משתני הסביבה
router.get('/debug-check', (req, res) => {
  const filePath = path.join(__dirname, '../Files/טופס רישום אורחות יושר תשפז+תקנון.pdf');
  const fileExists = fs.existsSync(filePath);
  
  res.json({
    userSet: !!process.env.MAIL_USER,
    passSet: !!process.env.MAIL_PASS,
    fileExists: fileExists,
    fullPath: filePath
  });
});

module.exports = router;