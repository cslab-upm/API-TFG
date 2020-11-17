const mongoose = require('mongoose');

const EcoSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
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
    Duracion: mongoose.Types.Decimal128
});

module.exports = mongoose.model('Eco', EcoSchema);