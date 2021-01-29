const mongoose = require('mongoose'), Schema = mongoose.Schema;

const EcoSchema = new Schema({
    _id: mongoose.SchemaTypes.String,
    Fecha: mongoose.SchemaTypes.String,
    Id_Estacion: mongoose.SchemaTypes.String,
    Duracion: Number,
    nClasificaciones: Number,
    versionKey: false
});

module.exports = mongoose.model('Eco', EcoSchema, 'Eco');