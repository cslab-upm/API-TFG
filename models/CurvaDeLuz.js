const mongoose = require('mongoose');

const CurvaDeLuzSchema = mongoose.Schema({
    _id: String,
    Id_Estacion: Number,
    Votable: String,
    Imagen: String,
    Csv: String
});

module.exports = mongoose.model('CurvasDeLuz', CurvaDeLuzSchema, 'Curva Luz'); //3rd param: Collection