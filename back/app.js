const express = require('express');
const app = express();
const port = process.env.PORT || 2025; // שימוש בפורט של Render אם קיים

require('dotenv').config();
app.use(express.json());

// Controllers
const apartmentController = require('./Controllers/Apartment.controller.js');
const customerController = require('./Controllers/Customer.controller.js');
const mailController = require('./Controllers/Mail.controller.js');

// CORS
// מאפשר גם את הפרונט בענן וגם localhost
const allowedOrigins = [
  'http://localhost:4200',
  'https://ohaleysefer-front.onrender.com'
];
app.use(cors({
  origin: function(origin, callback){
    // מאפשר גם קריאות ללא origin (לדוגמה Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Routes
app.use("/apartment", apartmentController);
app.use("/customer", customerController);
app.use("/mail", mailController);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
