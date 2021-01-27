require('./config/db')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
const flight = require("./routes/flightRoutes")

app.use(cors())
app.use(bodyParser.json())


app.listen(5000,()=>{
    console.log("Server started at 5000 port")
})

app.use('/',flight)