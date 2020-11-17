const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Import Routes
const ecosRoute = require('./routes/ecos');
app.use('/ecos', ecosRoute);


//Middleware
//app.use('/ecos', () => {
//    console.log('This is a middleware running')
//}) 
mongoose.connect(process.env.DB_CONNECTION, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => console.log('connected to db!')
);



//ROUTES
app.get('/', (req,res) => {
    res.send('We are on home');
});

app.get('/ecos', (req,res) => {
    res.send('We are on ecos');
});

//How to we start listening to the server
app.listen(3000);