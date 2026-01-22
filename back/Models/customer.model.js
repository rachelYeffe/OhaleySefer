const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: { type: String, required: true },   
  lastName: { type: String, required: true },    
  email: { type: String, required: true, unique: true }, 
  phone: { type: String, required: true },     
  address: { type: String },                     
  registeredAt: { type: Date, default: Date.now }, 
  apartments: [{ type: Schema.Types.ObjectId, ref: 'Apartment' }] 
}, { versionKey: false });

const customerModel = mongoose.model("Customer", customerSchema);

module.exports = customerModel;
