const Customers = require('../Models/customer.model');

const getCustomerById = async (customerId) => {
    try {
        const customer = await Customers.findById(customerId);
        if (!customer) {
            throw new Error(`Customer with ID ${customerId} not found`);
        }
        return customer;
    } catch (error) {
        console.error(`Error in fetching Customer: ${error.message}`);
        throw error;
    }
};
const getCustomers = async () => {
    try {
        const customers = await Customers.find();
        console.log('customers fetched from MongoDB');
        return customers;
    } catch (error) {
        console.error(`Error in fetching Customers: ${error.message}`);
        throw error;
    }
};

const deleteCustomer = async (customerId) => {
    try {
        const customer = await Customers.findByIdAndDelete(customerId);
        if (!customer) {
            throw new Error(`Customer  with ID ${customerId} not found`);
        } 
        return customer;
    } catch (error) {
        console.error(`Error in deleting Customer: ${error.message}`);
        throw error;
    }
};


const putCustomer = async (updateCustomer) => {
    try {
        const customer = await Customers.findByIdAndUpdate(updateCustomer._id, updateCustomer, { new: true });
        if (!customer) {
            throw new Error(`Customer with ID ${updateCustomer._id} not found`);
        }
        console.log("Customer successfully updated in MongoDB");
        return customer;
    } catch (error) {
        console.error(`Error in updating Customer: ${error.message}`);
        throw error;
    }
};


const postCustomer = async (newCustomer) => {
    try {
        const customer = new Customers(newCustomer);
        const savedCustomer = await customer.save();

        console.log("Customer successfully added to MongoDB");
        return savedCustomer;
    } catch (error) {
        console.error(`Error in adding Customer: ${error.message}`);
        throw error;
    }
};

module.exports = {
    postCustomer,
    putCustomer,
    deleteCustomer,
    getCustomers,
    getCustomerById
};

