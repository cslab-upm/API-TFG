const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Middleware
//app.use('/ecos', () => {
//    console.log('This is a middleware running')
//}) 
mongoose.connect('mongodb://localhost:27017/SonidosDelCielo',{
    useNewUrlParser: true,
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