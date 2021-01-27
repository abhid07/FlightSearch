const express = require('express');
const { addFlight, getFlight, deleteFlight, editFlight, getOneFlight } = require('../controller/flightController');
const router = express.Router()

//route to add flight details
router.post('/addFlight',addFlight)

//route to get 
router.get('/getFlightDetails',getFlight)

//route to delete flight
router.delete('/deleteFlight/:id',deleteFlight)

//route to edit flight
router.put('/editFlight/:id',editFlight)

//route to get one flight
router.get('/getOne/:id',getOneFlight)

module.exports=router