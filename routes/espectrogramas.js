//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const Espectrograma = require('../models/Espectrograma');

//TODO: Gestion de errores

//GET Todos los espectrogramas
router.get('/', async (req, res) => {
    try {
        const esp = await Espectrograma.find();
        res.json(esp);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

//Get espectrograma por id
router.get('/:_id', async (req, res) => {
    try {
        const esp = await Espectrograma.findById(req.params._id);
        res.json(esp);
    } catch (err) {
        res.json({ message: err });
    }
});

//POST Espectrograma
router.post('/', async (req, res) => {
    const esp = new Espectrograma({
        _id: req.body._id,
        Id_Estacion: req.body.Id_Estacion,
        Votable: req.body.Votable,
        Imagen: req.body.Imagen,
        Csv: req.body.Csv
    });
    try {
        //res.json(esp);
        const savedEsp = await esp.save();
        res.json(savedEsp);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

//Utilizamos patch para que no sea necesario sobreesribir todo el objeto
router.patch('/:_id', async (req, res) => {
    try {
        const result = await Espectrograma.findByIdAndUpdate(req.params._id,req.body);
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});

//Delete espectrograma por id
router.delete('/:_id', async (req, res) => {
    try { 
        const esp = await Espectrograma.findByIdAndDelete(req.params._id);
        res.json(esp);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;