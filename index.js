//Import modules
const express = require('express');
const body_parser = require('body-parser');
const { json } = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
//Server
const server = express();

//Middlewares
server.use(morgan('dev'));
//server.use(express('json'));
//server.use(body_parser.json());

//Routes
server.use(require('./routes/ecos'));
//server.use(require('./routes/espectrogramas'));
//server.use(require('./routes/curvasdeluz'));
//server.use(require('./routes/imagenes'));
//server.use(require('./routes/estaciones'));
//server.use(require('./routes/sonidos'));
//server.use(require('./routes/usuarios'));
//server.use(require('./routes/observaciones'));
//server.use(require('./routes/tareas'));

var accesLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'});
server.use(morgan('combined', {stream: accesLogStream}));

//Settings
server.set('port',process.env.PORT || 3000)

//Ponemos el servidor a escuchar en el 3000 y cuando se ponga a escuchar nos sale el mensaje de la funcion
server.listen(server.get('port'),() => {
    console.log('Server on port %d', server.get('port'));
});