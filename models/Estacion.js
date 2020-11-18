const mongoose = require('mongoose');

const EstacionSchema = mongoose.Schema({
    //_id: {Type: Number, default:1},
    Localizacion: String,
    web: String
});

module.exports = mongoose.model('Estaciones', EstacionSchema, 'Estacion'); //3rd param: Collection