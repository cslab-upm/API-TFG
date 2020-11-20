//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const CurvaDeLuz = require('../models/CurvaDeLuz');

//TODO: Gestion de errores

//GET Todas las curvas de luz
router.get('/', async (req, res) => {
    try {
        const curva = await CurvaDeLuz.find();
        res.json(curva);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

//Get curva de luz por id
router.get('/:_id', async (req, res) => {
    try {
        const curva = await CurvaDeLuz.findById(req.params._id);
        res.json(curva);
    } catch (err) {
        res.json({ message: err });
    }
});

//POST Curva de Luz
router.post('/', async (req, res) => {
    const curva = new CurvaDeLuz({
        _id: req.body._id,
        Id_Estacion: req.body.Id_Estacion,
        Votable: req.body.Votable,
        Imagen: req.body.Imagen,
        Csv: req.body.Csv
    });
    try {
        //res.json(esp);
        const savedCurva = await curva.save();
        res.json(savedCurva);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

//Utilizamos patch para que no sea necesario sobreesribir todo el objeto
router.patch('/:_id', async (req, res) => {
    try {
        const result = await CurvaDeLuz.findByIdAndUpdate(req.params._id,req.body);
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});

//Delete espectrograma por id
router.delete('/:_id', async (req, res) => {
    try { 
        const esp = await CurvaDeLuz.findByIdAndDelete(req.params._id);
        res.json(esp);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;