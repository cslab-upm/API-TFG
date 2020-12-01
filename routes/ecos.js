//Import modules
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const conn = require('../database');
const Eco = require('../models/Eco');
require('dotenv/config')
var mongoClient = require('mongodb').mongoClient; 


//TODO: Gestion de errores

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
 *         example: 
 *             $ref: '#/components/schemas/Eco'
 *       '400':
 *         description: Error
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
 *         type: integer
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Eco"
 *       # responses may fall through to errors
 *       '400':
 *         description: Error
 *         schema:
 *           $ref: "#/components/schemas/Eco"
*/
router.get('/:ecoId', async (req, res) => {
    try {
        const eco = await Eco.findById(req.params.ecoId);
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

/**
 * 
 *  @swagger
 * 
 * /ecos/{id}:
 *  patch:
 *     tags: ['Ecos']
 *     description: Modifica una estacion existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la estacion
 *         required: true
 *         type: integer
 *       - name: Eco
 *         in: body
 *         description: los parametros del eco que queremos modificar
 *         schema: 
 *           $ref: '#/components/schemas/Eco'
 *         required: true
 *     example:
 *         schema:
 *           $ref: '#/components/schemas/Eco' 
 *     responses:
 *       '200':
 *         description: Estacion creada
 *         schema:
 *           $ref: '#/components/schemas/Eco'
 *       '400':
 *         description: No se ha encontrado el eco indicado
 */
router.patch('/:id', async (req, res) => {
    try {
        const result = await Eco.findByIdAndUpdate(req.params.id,req.body);
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
 *         type: integer
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Eco"
 *       '400':
 *         description: No se ha encontrado el eco indicado
 *         schema:
 *           $ref: "#/components/schemas/Eco"
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