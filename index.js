require('dotenv/config')
//Import modules
const express = require('express');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');
//Server
const app = express();


const ecosRoute = require('./routes/ecos');
const estacionRoute = require('./routes/estaciones');

//Middlewares
//app.use(morgan('dev'));
//app.use(express('json'));
app.use(bodyParser.json());


//Routes
app.use('/ecos', ecosRoute);
app.use('/estaciones', estacionRoute);
//app.use(require('./routes/espectrogramas'));
//app.use(require('./routes/curvasdeluz'));
//app.use(require('./routes/imagenes'));
//app.use(require('./routes/sonidos'));
//app.use(require('./routes/usuarios'));
//app.use(require('./routes/observaciones'));
//app.use(require('./routes/tareas'));

//var accesLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'});
//app.use(morgan('combined', {stream: accesLogStream}));

//Settings
app.set('port',process.env.PORT || 3000)

//Server is listening
app.listen(app.get('port'),() => {
    console.log('Server on port %d', app.get('port'));
});