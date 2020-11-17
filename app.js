const express = require('express');

const app = express();

//Middleware
//app.use('/ecos', () => {
//    console.log('This is a middleware running')
//}) 


//ROUTES
app.get('/', (req,res) => {
    res.send('We are on home');
});

app.get('/ecos', (req,res) => {
    res.send('We are on ecos');
});

//How to we start listening to the server
app.listen(3000);