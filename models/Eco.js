const mongoose = require('mongoose');

const EcoSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    Fecha: {
        type: String,
        required: true
    },
    Id_Estacion: {
        type: Number,
        default: 1 
    },
    Duracion: Number
});

module.exports = mongoose.model('Eco', EcoSchema);