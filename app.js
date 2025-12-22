//Importing modules
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
//Connection to the mongodb database
mongoose.connect('mongodb://localhost:27017/ExpressIntegration')
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready "
        + "and Server is Listening on Port ", PORT);
    })
})
.catch((err)=>{
    console.log("A error has been occurred while"
        + " connecting to database.");    
})