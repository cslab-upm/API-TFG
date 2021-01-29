//Import modules
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const conn = require('../database');
const Eco = require('../models/Eco');
require('dotenv/config')
var mongoClient = require('mongodb').mongoClient; 
const { nextTick } = require('async');


/**
 * 
 *  @swagger
 * 
 * /ecos/:
 *  get:
 *     tags: ['Ecos']
 *     description: Devuelve un eco aleatorio
 *     produces: 
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Eco"
 *       '400':
 *         description: No se encuentra el eco
 */


router.get('/', async (req, res) => {
    // try {
    //     const ecos = await Eco.find();
    //     res.json(ecos);
    // } catch (error) {
    //     console.log(error);
    //     res.json({ message: error });
    // }
    try {
        const eco = await Eco.countDocuments().exec(function(err,count){
            var random = Math.floor(Math.random()*count);
            Eco.findOne().skip(random).exec(function(err,result){
                //console.log(result)
                res.json(result)
            })
        });
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

/**
 * 
 *  @swagger
 * 
 * /ecos/{id}:
 *  get:
 *     tags: ['Ecos']
 *     description: Devuelve un eco
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador del eco
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Eco"
 *       # responses may fall through to errors
 *       '400':
 *         description: No se ha encontrado el eco especificado 
*/
router.get('/:ecoId', async (req, res) => {
    try {
        const eco = await Eco.findById(req.params.ecoId);
        if (!eco){
            res.status(400).send({error: 'No se ha encontrado el eco especificado'});
        }
        res.json(eco);
    } catch (err) {
        res.json({ message: err });
    }
});

/**
 * 
 *  @swagger
 * 
 * /ecos/:
 *  post:
 *     tags: ['Ecos']
 *     description: Introduce un nuevo eco
 *     parameters:
 *       - name: Eco
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Eco'
 *     responses:
 *       '200':
 *         schema:
 *           $ref: '#/components/schemas/Eco'
 *         description: Eco creado
 *       '400':
 *         description: No se ha encontrado el eco indicado
 */
router.post('/', async (req, res) => {
    const eco = new Eco({
        _id: req.body._id,
        Fecha: req.body.Fecha,
        Id_Estacion: req.body.Id_Estacion,
        Duracion: req.body.Duracion,
        nClasificaciones : req.body.nClasificaciones
    });
    try {
        const savedEco = await eco.save();
        res.json(savedEco);
        return;
    } catch (error) {
        res.json({ message: error });
    }
});


/**
 * 
 *  @swagger
 * 
 * /ecos/{id}:
 *  patch:
 *     tags: ['Ecos']
 *     description: Modifica un eco existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador del eco
 *         required: true
 *       - name: Eco
 *         in: body
 *         description: Campos del eco a modificar y/o añadir
 *         schema: 
 *           $ref: '#/components/schemas/Eco'
 *         required: true
 *     example:
 *         schema:
 *           $ref: '#/components/schemas/Eco' 
 *     responses:
 *       '200':
 *         description: Eco creada
 *         schema:
 *           $ref: '#/components/schemas/Eco'
 *       '400':
 *         description: No se ha encontrado el eco especificado
 */
router.patch('/:id', async (req, res) => {
    try {
        if (req.body._id){
            delete req.body._id;
        }
        const result = await Eco.findByIdAndUpdate(req.params.id,req.body);
        if (!result){
            res.status(400).send({error: 'No se ha encontrado el eco especificado'});
        }
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});

/**
 * 
 *  @swagger
 * 
 * /ecos/{id}:
 *  delete:
 *     tags: ['Ecos']
 *     description: Elimina un eco
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador del eco
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: Eco eliminado
 *         schema:
 *           $ref: "#/components/schemas/Eco"
 *       '400':
 *         description: No se ha encontrado el eco indicado 
*/
router.delete('/:_id', async (req, res) => {
    try { 
        const ecoEliminado = await Eco.findByIdAndDelete(req.params._id);
        res.json(ecoEliminado);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;