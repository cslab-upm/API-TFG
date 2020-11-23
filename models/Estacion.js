const mongoose = require('mongoose');

const EstacionSchema = mongoose.Schema({
    _id: String,
    Localizacion: mongoose.SchemaTypes.String,
    web: mongoose.SchemaTypes.String,
    versionKey: false
});

module.exports = mongoose.model('Estaciones', EstacionSchema, 'Estacion'); //3rd param: Collection