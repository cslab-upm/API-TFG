const mongoose = require('mongoose');
const ObjectID = require('mongodb')

const ClasificacionSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.String,
    idUsuario: mongoose.SchemaTypes.String,
    Respuesta1: mongoose.SchemaTypes.String,
    Respuesta2: mongoose.SchemaTypes.String,
    Respuesta3: mongoose.SchemaTypes.String},{
    versionKey: false
});

module.exports = mongoose.model('Clasificacion', ClasificacionSchema, 'Clasificacion'); //3rd param: Collection