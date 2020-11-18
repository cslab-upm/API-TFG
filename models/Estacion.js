const mongoose = require('mongoose');

const EstacionSchema = mongoose.Schema({
    Localizacion: String,
    web: String
});

module.exports = mongoose.model('Estaciones', EstacionSchema);