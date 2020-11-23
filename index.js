require('dotenv/config')

//Import modules
const express = require('express')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
// const morgan = require('morgan');

//Server
const app = express();

const swaggerOptions = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'Sonidos del Cielo API',
            version: '1.0.0',
            description: "You can find out more about the project at \n[http://www.sonidosdelcielo.org/](http://www.sonidosdelcielo.org/)\n"},
        contact: {
            name: 'Sonidos del Cielo',
            url: 'http://sonidosdelcielo.org', 
        },
        servers:[
            {url:'http://localhost:3000/ecos'},
        ]
    },
    apis:['./routes/ecos.js',]
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//const endpointsRoute = require('./endpoints')

const ecosRoute = require('./routes/ecos');
const estacionRoute = require('./routes/estaciones');
const espectrogramasRoute = require('./routes/espectrogramas')
const curvasDeLuzRoute = require('./routes/curvasdeluz')

//Middlewares
//app.use(morgan('dev'));
//app.use(express('json'));

app.use(bodyParser.json());


//Routes
app.use('/ecos', ecosRoute);
app.use('/estaciones', estacionRoute);
app.use('/espectrogramas', espectrogramasRoute);
app.use('/curvasdeluz', curvasDeLuzRoute);
//app.use(require('./routes/imagenes'));
//app.use(require('./routes/sonidos'));
//app.use(require('./routes/usuarios'));
//app.use(require('./routes/observaciones'));
//app.use(require('./routes/tareas'));

//app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//var accesLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'});
//app.use(morgan('combined', {stream: accesLogStream}));

//Settings
app.set('port',process.env.PORT || 3000)

//Server is listening
app.listen(app.get('port'),() => {
    console.log('Server on port %d', app.get('port'));
});