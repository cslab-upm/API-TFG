const mongoose = require('mongoose');

const EspectrogramaSchema = mongoose.Schema({
    _id: String,
    Id_Estacion: Number,
    Votable: String,
    Imagen: String,
    Csv: String
});

module.exports = mongoose.model('Espectrograma', EspectrogramaSchema, 'Espectrograma'); //3rd param: Collection