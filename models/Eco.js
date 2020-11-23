const mongoose = require('mongoose'), Schema = mongoose.Schema;

const EcoSchema = new Schema({
    _id: mongoose.SchemaTypes.String,
    Fecha: mongoose.SchemaTypes.String,
    Id_Estacion: mongoose.SchemaTypes.String,
    Duracion: mongoose.Types.Decimal128,
    versionKey: false
});

module.exports = mongoose.model('Eco', EcoSchema, 'Eco');