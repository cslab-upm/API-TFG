//Import modules
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const conn = require('../database');
const Eco = require('../models/Eco');


//TODO: Gestion de errores

//GET Todos los Ecos
router.get('/', async (req, res) => {
    try {
        const ecos = await Eco.find();
        res.json(ecos);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

//eco especifico
router.get('/:ecoId', async (req, res) => {
    try {
        const eco = await Eco.findById(req.params.ecoId);
        res.json(eco);
    } catch (err) {
        res.json({ message: err });
    }
});


router.post('/', async (req, res) => {
    const eco = new Eco({
        _id: req.body._id,
        Fecha: req.body.Fecha,
        Id_Estacion: req.body.Id_Estacion,
        Duracion: req.body.Duracion
    });
    try {
        const savedEco = await eco.save();
        res.json(savedEco);
    } catch (error) {
        res.json({ message: error });
    }
    res.json({ message: "POST UNO" });
});

//Update
//FIXME: throw error cuando intentas modificar el id
router.patch('/:id', async (req, res) => {
    try {
        const result = await Eco.findByIdAndUpdate(req.params.id,req.body);
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});
//Delete estacion por id
router.delete('/:_id', async (req, res) => {
    try { 
        const ecoEliminado = await Eco.findByIdAndDelete(req.params._id);
        res.json(ecoEliminado);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;