//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const Estacion = require('../models/Estacion');
const { json } = require('body-parser');

//GET Todas las estaciones
router.get('/', async (req, res) => {
    try {
        const estacion = await Estacion.find();
        res.json(estacion);
    } catch (error) {
        console.log(error);
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
        res.json({ message: error });
    }
});

//Utilizamos patch para que no sea necesario sobreesribir todo el objeto
router.patch('/:estacionId', async (req, res) => {
    try {
        const result = await Estacion.findByIdAndUpdate(req.params.estacionId,req.body);
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});


//Delete estacion por id
router.delete('/:_id', async (req, res) => {
    try { 
        const estacionEliminada = await Estacion.findByIdAndDelete(req.params._id);
        res.json(estacionEliminada);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;