require('dotenv/config')
//require('dotenv').config
//Import modules
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');

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
        layout: "OperationsLayout",
        servers:[
            {url:'http://localhost:3000/'},
        ]
    },
    apis:['index.js','./routes/*.js']
    //apis:['index.js','./routes/ecos.js','./routes/estaciones.js', './routes/curvasdeluz']
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//const endpointsRoute = require('./endpoints')
/**
*  @swagger
*  components:
*    schemas:
*      Eco:
*        type: object
*        properties:
*          _id:
*            type: string
*          Fecha:
*            type: string
*          Id_Estacion:
*            type: string
*          Duracion:
*            type: integer
*
*      Estacion:
*           type: object
*           properties:
*               id:
*                   type: string
*               localizacion:
*                   type: string
*               web:
*                   type: string
*           required:
*               - id
*               - localizacion
*
*      Curva de Luz:
*            type: object
*            properties:
*               id:
*                   type: string
*               id_estacion:
*                   type: integer
*               Votable:
*                   type: string
*               Csv:
*                   type: string
*               Imagen:
*                   type: string
*
*      Espectrograma:
*            type: object
*            properties:
*               id:
*                   type: string
*               id_estacion:
*                   type: integer
*               Votable:
*                   type: string
*               Imagen:
*                   type: string
*               Csv:
*                   type: string
*/

/**
 * @swagger
 * tags:
 *   - name: Ecos
 *     description: Todo sobre ecos
 * 
 *   - name: Estacion
 *     description: Informacion sobre las estaciones de radiodeteccion
 * 
 *   - name: Curva de Luz
 *     description: Informacion sobre las curvas de luz
 * 
 *   - name: Espectrograma
 *     description: Informacion sobre los espectrogramas
 */


const ecosRoute = require('./routes/ecos');
const estacionRoute = require('./routes/estaciones');
const espectrogramasRoute = require('./routes/espectrogramas')
const curvasDeLuzRoute = require('./routes/curvasdeluz')
const clasificacionRoute = require('./routes/clasificaciones')

//Middlewares

app.use(cors());

app.use(bodyParser.json());


//Routes
//añadir cualquier ruta necesaria
app.use('/ecos', ecosRoute);
app.use('/estaciones', estacionRoute);
app.use('/espectrogramas', espectrogramasRoute);
app.use('/curvasdeluz', curvasDeLuzRoute);
app.use('/clasificaciones', clasificacionRoute);
//app.use(require('./routes/imagenes'));
//app.use(require('./routes/sonidos'));
//app.use(require('./routes/usuarios'));
//app.use(require('./routes/tareas'));


/**
 * App Configuration
 */
app.set('port',process.env.PORT || 3000)

//Server is listening
app.listen(app.get('port'),() => {
    console.log('Server on port %d', app.get('port'));
});