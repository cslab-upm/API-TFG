//Import modules
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const conn = require('../database');
const Estacion = require('../models/Estacion');

//TODO: Gestion de errores

/**
 *  @swagger
 * 
 *  /estaciones:
 *    get:
 *      tags: ['Estacion']
 *      produces: 
 *           ['application/json']
 *      description: Devuelve una lista de estaciones
 *      responses:
 *          200:
 *              description: succesful operation
 *          400:
 *              description: not found
 */

router.get('/', async (req, res) => {
    const estacion = await Estacion.find();
    try {
        if(!estacion){
            res.status(400).send('No existen estaciones')
        }
        res.json(estacion).status(200);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: '/estaciones/'})
        //res.json({ message: error });
    }
});

/**
 * 
 *  @swagger
 * 
 *  /estaciones/{id}:
 *    get:
 *      parameters:
 *          id:
 *              type: String
 *      tags: ['Estacion']
 *      description: Devuelve una estaciones segun el id
 *      responses:
 *          200:
 *              description: succesful operation
 *      
*/
router.get('/:estacionId', async (req, res) => {
    const estacion = await Estacion.findById(req.params.estacionId);
    try {
        if (!estacion){
            res.status(400).send('No se encuentra la estacion')
        }
        res.json(estacion).status(200);
    } catch (err) {
        //res.status(400).send({error: '/estaciones/id_estacion'})
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