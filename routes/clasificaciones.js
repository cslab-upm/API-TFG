//Import modules
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const conn = require('../database');

const Clasificacion = require('../models/Clasificacion');



router.get('/', async (req, res) => {
    const clasificacion = await clasificacion.find();
    try {
        if(!clasificacion){
            res.status(400).send('No existen clasificaciones')
        }
        res.json(clasificacion).status(200);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: '/clasificaciones/'})
    }
});


router.get('/:clasificacionId', async (req, res) => {
    const clasificacion = await Clasificacion.findById(req.params.clasificacionId);
    try {
        if (!clasificacion){
            res.status(400).send('No se encuentra la clasificacion')
        }
        res.json(clasificacion).status(200);
    } catch (err) {
        //res.status(400).send({error: '/clasificaciones/id_clasificacion'})
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const clasificacion = new Clasificacion({
        _id: req.body._id,
        respuesta1: req.body.respuesta1,
        respuesta2: req.body.respuesta2,
        respuesta3: req.body.respuesta3,
    });
    try {
        const savedclasificacion = await clasificacion.save();
        res.json(savedclasificacion);
    } catch (error) {
        res.json({ message: error });
    }
});


 //FIXME: eliminar el clasificacionId en caso de que exista en el body
 router.patch('/:clasificacionId', async (req, res) => {
    try {
        const result = await Clasificacion.findByIdAndUpdate(req.params.clasificacionId,req.body);
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});



router.delete('/:_id', async (req, res) => {
    try { 
        const clasificacionEliminada = await Clasificacion.findByIdAndDelete(req.params._id);
        res.json(clasificacionEliminada);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;