const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const db_path = process.env.DB_CONNECTION;

require('dotenv/config');
app.use(bodyParser.json());

var db_connec = require('./database');

// mongoose.connect(process.env.DB_CONNECTION, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, error => {
//     if (!error){
//         console.log('Succesful connection');
//     } else {
//         console.log('Error connectinng to database');
//     }
// });

//----------ROUTES-------------------
const ecosRoute = require('./routes/ecos');
//root
app.get('/', (req, res) => {
    res.send('We are on home');
});

//Ecos GET
app.use('/ecos', ecosRoute);
//app.use('/espectrogramas, espectrogramasRoute');


//Middleware
//app.use('/ecos', () => {
//    console.log('This is a middleware running')
//}) 

//How to we start listening to the server
app.listen(3000);