const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  console.log("Received /mail/send request");
  try {
    const { email } = req.body;
    console.log("Email received:", email);

    const filePath = path.join(
      __dirname,
      '../Files/טופס רישום אורחות יושר תשפז+תקנון.pdf'
    );
    console.log("Attachment path:", filePath);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // חובה
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });


    console.log("Transporter created, sending mail...");

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
          filename: 'טופס רישום אורחות יושר תשפז + תקנון.pdf',
          path: filePath
        }
      ]
    });

    console.log("Mail sent successfully!");
    res.status(200).json({ message: 'Mail sent successfully' });

  } catch (error) {
    console.error("Error sending mail:", error);
    res.status(500).json({
      message: 'Failed to send mail',
      error: error.toString()
    });
  }
});

module.exports = router;
