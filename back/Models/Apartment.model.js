const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
    city: { type: String, required: true },
    size: { type: String, required: true },
    neighborhood: { type: String },
    price: { type: String, required: true },
    rooms: { type: String, required: true },
    rent: { type: Boolean, required: true },
    date: { type: Date, default: Date.now },
    idCustomer: { type: String, required: true },
}, { versionKey: false });

const apartmentModel = mongoose.model("Apartment", apartmentSchema);

module.exports = apartmentModel;






