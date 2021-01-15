const mongoose = require('mongoose'), Schema = mongoose.Schema;

const SonidoSchema = new Schema({
    _id: mongoose.SchemaTypes.String,
    Ruta: mongoose.SchemaTypes.String,
    versionKey: false
});

module.exports = mongoose.model('Sonido', SonidoSchema, 'Sonido');