const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook?directConnection=true&tls=false&readPreference=primary";
const connectToMongo =()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully.");
    });
}
module.exports = connectToMongo;