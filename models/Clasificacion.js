const mongoose = require('mongoose');

const ClasificacionSchema = mongoose.Schema({
    _id: String,
    respuesta1: mongoose.SchemaTypes.String,
    respuesta2: mongoose.SchemaTypes.String,
    respuesta3: mongoose.SchemaTypes.String,
    versionKey: false
});

module.exports = mongoose.model('Clasificaciones', ClasificacionSchema, 'Clasificacion'); //3rd param: Collection