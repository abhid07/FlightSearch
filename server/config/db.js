const mongoose = require('mongoose');
const url = "mongodb+srv://Admin:root@cluster0.sohjb.mongodb.net/flightdata?retryWrites=true&w=majority"
mongoose.connect(url,{
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(success=>console.log("Database is connected"))
.catch(err=>console.log(err))


module.exports = mongoose