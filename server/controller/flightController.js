const Flight = require('../model/Flight');

//Adding flight data
exports.addFlight = ((req, res) => {
    const newFlight = new Flight(req.body)
    newFlight.save()
        .then(flight => res.json({ flight }))
        .catch(err => console.log(err))
})

//getting flight details
exports.getFlight = ((req, res) => {
    Flight.find()
        .then(flight => res.json(flight))
        .catch(err => res.json(err))
})

//delete flight by id
exports.deleteFlight = ((req, res) => {
    Flight.findByIdAndDelete({ _id: req.params.id })
        .then(flight => res.json(flight))
        .catch(err => console.log(err))
})

//edit flight details
exports.editFlight = ((req, res) => {
    Flight.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(flight => res.json(flight))
        .catch(err => console.log(err))
})

//flight get by id
exports.getOneFlight = ((req, res) => {
    Flight.findOne({ _id: req.params.id })
        .then(flight => res.json(flight))
        .catch(err => console.log(err))
})