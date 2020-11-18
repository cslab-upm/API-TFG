//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const Estacion = require('../models/Estacion');

//GET Todas las estaciones
router.get('/', async (req, res) => {
    try {
        const estacion = await Estacion.find();
        res.json(estacion);
    } catch (error) {
        console.log (error);
        res.json({ message: error });
    }
});

//Get estacion por id
router.get('/:estacionId', async (req, res) => {
    try {
        const estacion = await Estacion.findById(req.params.estacionId);
        res.json(estacion);
    } catch (err) {
        res.json({ message: err });
    }
});

//POST Estacion
router.post('/', async (req, res) => {
    const estacion = new Estacion({
        _id: req.body._id,
        Localizacion: req.body.Localizacion,
        web: req.body.web
    });
    try {
        const savedEstacion = await estacion.save();
        res.json(savedEstacion);
    } catch (error) {
        res.json({message: error});
    }
});

//Delete estacion por id
router.delete('/:estacionId', async (req, res) => {
    try {
        const estacion = await Estacion.deleteOne({"_id":req.params.estacionId});
        res.json(estacion);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;