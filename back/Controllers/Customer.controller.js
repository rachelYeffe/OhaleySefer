const { Router } = require('express');

const customerService = require('../Services/customer.service');

const router = Router();

router.get('/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const customerData = await customerService.getCustomerById(customerId);
        res.send(customerData);
    } catch (error) {
        console.error(`Error in fetching customer: ${error.message}`);
        res.status(500).send(`Error in fetching customer: ${error.message}`);
    }
});
router.get('/', async (req,res) => {
    try {
        const customerData = await customerService.getCustomers();
        res.send(customerData);
    } catch (error) {
        console.error(`Error in fetching customer: ${error.message}`);
        res.status(500).send(`Error in fetching customer: ${error.message}`);
    }
});

router.delete('/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        await customerService.deleteCustomer(customerId);
        res.send("customer deleted successfully");
    } catch (error) {
        console.error(`Error in deleting customer: ${error.message}`);
        res.status(500).send(`Error in deleting customer: ${error.message}`);
    }
});

router.put('/', async (req, res) => {
    try {
        const customer = req.body;
        await customerService.putCustomer(customer);
        res.send("customer update successfully");
    } catch (error) {
        console.error(`Error in update customer: ${error.message}`);
        res.status(500).send(`Error in update customer: ${error.message}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const customer = req.body;
        await customerService.postCustomer(customer);
        res.send("customer post successfully");
    } catch (error) {
        console.error(`Error in post customer: ${error.message}`);
        res.status(500).send(`Error in post customer: ${error.message}`);
    }
});
module.exports = router;
