//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const Estaciones = require('../models/Estacion');


router.get('/', async (req, res) => {
    try {
        const estacion = await Estaciones.find();
        res.json(estacion);
    } catch (error) {
        console.log (error);
        res.json({ message: error });
    }
});


router.post('/', async (req, res) => {
    const estacion = new Estaciones({
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

module.exports = router;