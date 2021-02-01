const mongoose = require('mongoose');
const ObjectID = require('mongodb')

const ClasificacionSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.String,
    idEco: String,
    Nombre: String,
    Respuesta1: String,
    Respuesta2: String,
    Respuesta3: String},{
    versionKey: false
});

module.exports = mongoose.model('Clasificacion', ClasificacionSchema, 'Clasificacion'); //3rd param: Collection