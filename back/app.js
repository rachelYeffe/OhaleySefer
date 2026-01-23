const express = require('express');
const cors = require('cors');          // <--- חייב להיות פה
const app = express();
const port = process.env.PORT || 2025;

require('dotenv').config(); 
app.use(express.json());

const apartmentController = require('./Controllers/Apartment.controller.js');
const customerController = require('./Controllers/Customer.controller.js');
const mailController = require('./Controllers/Mail.controller.js');

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use("/apartment", apartmentController);
app.use("/customer", customerController);
app.use("/mail", mailController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
