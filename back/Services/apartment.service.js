const Apartments = require('../Models/Apartment.model');

const getApartmentById = async (apartmentId) => {
    try {
        const apartment = await Apartments.findById(apartmentId);
        if (!apartment) {
            throw new Error(`Apartment with ID ${apartmentId} not found`);
        }
        return apartment;
    } catch (error) {
        console.error(`Error in fetching Apartment: ${error.message}`);
        throw error;
    }
};
const getApartments = async () => {
    try {
        const apartments = await Apartments.find();
        console.log('Apartments fetched from MongoDB');
        return apartments;
    } catch (error) {
        console.error(`Error in fetching Apartments: ${error.message}`);
        throw error;
    }
};

const deleteApartment = async (apartmentId) => {
    try {
        const apartment = await Apartments.findByIdAndDelete(apartmentId);
        if (!apartment) {
            throw new Error(`Apartment  with ID ${apartmentId} not found`);
        } 
        return apartment;
    } catch (error) {
        console.error(`Error in deleting Apartment: ${error.message}`);
        throw error;
    }
};


const putApartment = async (updateApartment) => {
    try {
        const apartment = await Apartments.findByIdAndUpdate(updateApartment._id,updateApartment, { new: true });
        if (!apartment) {
            throw new Error(`Apartment with ID ${updateApartment._id} not found`);
        }
        console.log("Apartment successfully updated in MongoDB");
        return apartment;
    } catch (error) {
        console.error(`Error in updating apartment: ${error.message}`);
        throw error;
    }
};


const postApartment = async (newApartment) => {
    try {
        const apartment = new Apartments(newApartment);
        const savedApartment = await apartment.save();

        console.log("Apartment successfully added to MongoDB");
        return savedApartment;
    } catch (error) {
        console.error(`Error in adding apartment: ${error.message}`);
        throw error;
    }
};

module.exports = {
    postApartment,
    putApartment,
    deleteApartment,
    getApartments,
    getApartmentById
};

