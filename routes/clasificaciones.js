//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const Clasificacion = require('../models/Clasificacion');
const { nextTick } = require('async');

//TODO: Gestion de errores

/**
 * 
 *  @swagger
 * 
 * /clasificaciones/:
 *  get:
 *     tags: ['Clasificacion']
 *     description: Devuelve todos las clasificaciones
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         example:
 *         schema:
 *           $ref: '#/components/schemas/Clasificacion' 
 *       '400':
 *         description: No se ha encontrado las clasificaciones 
*/
router.get('/', async (req, res) => {
    try {
        const clasif = await Clasificacion.find();
        if (!clasif){
            res.status(400).send({error: 'No se ha encontrado el sonido'}); 
            return;
        }
        res.json(clasif);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

/**
 * 
 *  @swagger
 * 
 * /clasificaciones/{id}:
 *  get:
 *     tags: ['Clasificacion']
 *     description: Devuelve una clasificacion segun el id introducido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la clasificacion
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         example:
 *         schema:
 *           $ref: '#/components/schemas/Clasificacion' 
 *       '400':
 *         description: No se ha encontrado la clasificacion indicada
*/
router.get('/:_id', async (req, res) => {
    try {
        const clasif = await Clasificacion.findById(req.params._id);
        if (!clasif){
            res.status(400).send({error: 'No se ha encontrado la clasificacion'}); 
            return;
        }
        res.json(clasif);
    } catch (err) {
        res.json({ message: err });
    }
});

/**
 * 
 *  @swagger
 * 
 * /clasificaciones/:
 *  post:
 *     tags: ['Clasificacion']
 *     description: Introduce una nueva clasificacion
 *     parameters:
 *       - name: Clasificacion
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Clasificacion'
 *     responses:
 *       '200':
 *         schema:
 *           $ref: '#/components/schemas/Clasificacion'
 *         description: Clasificacion creada
 *       '400':
 *         description: No se ha encontrado la clasificacion indicada
 */
router.post('/', async (req, res) => {
    const clasif = new Clasificacion({
        _id: req.body._id,
        idEco: req.body.idEco,
        Nombre: req.body.Nombre,
        Respuesta1: req.body.Respuesta1,
        Respuesta2: req.body.Respuesta2,
        Respuesta3: req.body.Respuesta3,
    });
    try {
        //res.json(esp);
        const savedClas = await clasif.save();
        res.json(savedClas);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

/**
 * 
 *  @swagger
 * 
 * /clasificaciones/{id}:
 *  patch:
 *     tags: ['Clasificacion']
 *     description: Modifica una clasificacion existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la clasificacion
 *         required: true
 *       - name: clasificacion
 *         in: body
 *         description: Campos de la clasificacion a modificar y/o añadir
 *         required: true
 *         schema: 
 *           $ref: '#/components/schemas/Clasificacion'
 *     example:
 *         schema:
 *           $ref: '#/components/schemas/Clasificacion' 
 *     responses:
 *       '200':
 *         description: Clasificacion creado
 *         schema:
 *           $ref: '#/components/schemas/Clasificacion'
 *       '400':
 *         description: No se ha encontrado la clasificacion indicada
 */
router.patch('/:_id', async (req, res) => {
    try {
        if (req.body._id){
            delete req.body._id;
        }
        const result = await Clasificacion.findByIdAndUpdate(req.params._id,req.body);
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});

/**
 * 
 *  @swagger
 * 
 * /clasificaciones/{id}:
 *  delete:
 *     tags: ['Clasificacion']
 *     description: Elimina una clasificacion
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la clasificacion
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Clasificacion"
 *       '400':
 *         description: No se ha encontrado la clasificacion indicado
*/
router.delete('/:_id', async (req, res) => {
    try { 
        const clasif = await Clasificacion.findByIdAndDelete(req.params._id);
        if (!clasif){
            res.status(400).send({error: 'No se ha encontrado la clasificacion indicada'}); 
            return;
        }
        res.json(clasif);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;