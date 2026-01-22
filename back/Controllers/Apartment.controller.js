const { Router } = require('express');

const apartmentService = require('../Services/apartment.service');

const router = Router();

router.get('/:apartmentId', async (req, res) => {
    try {
        const apartmentId = req.params.apartmentId;
        const apartmentData = await apartmentService.getApartmentById(apartmentId);
        res.send(apartmentData);
    } catch (error) {
        console.error(`Error in fetching apartment: ${error.message}`);
        res.status(500).send(`Error in fetching apartment: ${error.message}`);
    }
});
router.get('/', async (req,res) => {
    try {
        const apartmentData = await apartmentService.getApartments();
        res.send(apartmentData);
    } catch (error) {
        console.error(`Error in fetching apartment: ${error.message}`);
        res.status(500).send(`Error in fetching apartment: ${error.message}`);
    }
});

router.delete('/:apartmentId', async (req, res) => {
    try {
        const apartmentId = req.params.apartmentId;
        await apartmentService.deleteApartment(apartmentId);
        res.send("Apartment deleted successfully");
    } catch (error) {
        console.error(`Error in deleting apartment: ${error.message}`);
        res.status(500).send(`Error in deleting apartment: ${error.message}`);
    }
});

router.put('/', async (req, res) => {
    try {
        const apartment = req.body;
        await apartmentService.putApartment(apartment);
        res.send("Apartment update successfully");
    } catch (error) {
        console.error(`Error in update apartment: ${error.message}`);
        res.status(500).send(`Error in update apartment: ${error.message}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const apartment = req.body;
        await apartmentService.postApartment(apartment);
        res.send("Apartment post successfully");
    } catch (error) {
        console.error(`Error in post apartment: ${error.message}`);
        res.status(500).send(`Error in update apartment: ${error.message}`);
    }
});
module.exports = router;
