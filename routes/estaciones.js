//Import modules
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const conn = require('../database');
const Estacion = require('../models/Estacion');
//const { route } = require('./ecos');


//TODO: Gestion de errores

/**
 * 
 *  @swagger
 * 
 * /estaciones/:
 *  get:
 *     tags: ['Estacion']
 *     description: Devuelve una  lista de estaciones
 *     produces: 
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 *         example: 
 *             $ref: '#/components/schemas/Estacion'
 *       '400':
 *         description: No se ha encontrado la estacion indicada
 */

router.get('/', async (req, res) => {
    const estacion = await Estacion.find();
    try {
        if(!estacion){
            res.status(400).send('No existen estaciones');
        }
        res.json(estacion).status(200);
    } catch (error) {
        console.log(error);
        res.status(400).send({error: '/estaciones/'})
    }
});

/**
 * 
 *  @swagger
 * 
 * /estaciones/{id}:
 *  get:
 *     tags: ['Estacion']
 *     description: Devuelve una estacion
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la estacion
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Estacion"
 *       # responses may fall through to errors
 *       '400':
 *         description: No se ha encontrado la estacion indicada
*/

router.get('/:estacionId', async (req, res) => {
    const estacion = await Estacion.findById(req.params.estacionId);
    try {
        if (!estacion){
            res.status(400).send('No se encuentra la estacion indicada');
            return;
        }
        res.json(estacion).status(200);
    } catch (err) {
        //res.status(400).send({error: '/estaciones/id_estacion'})
        res.json({ message: err });
    }
});


/**
 * 
 *  @swagger
 * 
 * /estaciones/:
 *  post:
 *     tags: ['Estacion']
 *     description: Introduce una nueva estacion
 *     parameters:
 *       - name: Estacion
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Estacion'
 *     responses:
 *       '200':
 *         schema:
 *           $ref: '#/components/schemas/Estacion'
 *         description: Estacion creada
 *       '400':
 *         description: No se ha encontrado la estacion indicada
 */
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

/**
 * 
 *  @swagger
 * 
 * /estaciones/{id}:
 *  patch:
 *     tags: ['Estacion']
 *     description: Modifica una estacion existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la estacion
 *         required: true
 *       - name: Estacion
 *         in: body
 *         description: Campos de la estación a modificar y/o añadir
 *         schema: 
 *           $ref: '#/components/schemas/Estacion'
 *         required: true
 *     example:
 *         schema:
 *           $ref: '#/components/schemas/Estacion' 
 *     responses:
 *       '200':
 *         description: Estacion creada
 *         schema:
 *           $ref: '#/components/schemas/Estacion'
 *       '400':
 *         description: No se ha encontrado la estacion especificada
 */


router.patch('/:estacionId', async (req, res) => {
    try {
        if (req.body._id){
            delete req.body._id;
        }
        const result = await Estacion.findByIdAndUpdate(req.params.estacionId,req.body);
        if(!result){
            res.status(400).send('No se encuentra la estacion indicada');
            return;
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
 * /estaciones/{id}:
 *  delete:
 *     tags: ['Estacion']
 *     description: Elimina una estacion
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la estacion
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: Estacion eliminada
 *         schema:
 *           $ref: '#/components/schemas/Estacion'
 *       '400':
 *         description: No se ha encontrado la estacion indicada
*/
router.delete('/:_id', async (req, res) => {
    try { 
        const estacionEliminada = await Estacion.findByIdAndDelete(req.params._id);
        if(!estacionEliminada){
            res.status(400).send('No se encuentra la estacion indicada');
            return;
        }
        res.json(estacionEliminada);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;