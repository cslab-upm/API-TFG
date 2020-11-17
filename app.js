const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db_path = process.env.DB_CONNECTION;

require('dotenv/config');
app.use(bodyParser.json());


mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if (!error){
        console.log('Succesful connection');
    } else {
        console.log('Error connectinng to database');
    }
});




//Import Routes
const ecosRoute = require('./routes/ecos');
const router = require('./routes/ecos');

app.use('/ecos', ecosRoute);
//app.use('/espectrogramas, espectrogramasRoute');


//Middleware
//app.use('/ecos', () => {
//    console.log('This is a middleware running')
//}) 

//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
});

//How to we start listening to the server
app.listen(3000);