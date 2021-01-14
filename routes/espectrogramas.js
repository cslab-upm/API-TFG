//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const Espectrograma = require('../models/Espectrograma');

//TODO: Gestion de errores

/**
 * 
 *  @swagger
 * 
 * /espectrogramas/:
 *  get:
 *     tags: ['Espectrograma']
 *     description: Devuelve todos los espectrogramas
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Espectrogramas"
 *       '400':
 *         description: Error
 *         schema:
 *           $ref: "#/components/schemas/Espectrogramas"
*/
router.get('/', async (req, res) => {
    try {
        const esp = await Espectrograma.find();
        res.json(esp);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

/**
 * 
 *  @swagger
 * 
 * /espectrogramas/{id}:
 *  get:
 *     tags: ['Espectrograma']
 *     description: Devuelve un espectrograma segun el id introducido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador del espectrograma
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Espectrograma"
 *       '400':
 *         description: No se ha encontrado el espectrograma indicado
 *         schema:
 *           $ref: "#/components/schemas/Espectrograma"
*/
router.get('/:_id', async (req, res) => {
    try {
        const esp = await Espectrograma.findById(req.params._id);
        res.json(esp);
    } catch (err) {
        res.json({ message: err });
    }
});

/**
 * 
 *  @swagger
 * 
 * /espectrogramas/:
 *  post:
 *     tags: ['Espectrograma']
 *     description: Introduce un nuevo espectrograma
 *     parameters:
 *       - name: Espectrograma
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Espectrograma'
 *     responses:
 *       '200':
 *         schema:
 *           $ref: '#/components/schemas/Espectrograma'
 *         description: Espectrograma creado
 *       '400':
 *         description: Error
 */
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

/**
 * 
 *  @swagger
 * 
 * /espectrogramas/{id}:
 *  patch:
 *     tags: ['Espectrograma']
 *     description: Modifica un espectrograma existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador del espectrograma
 *         required: true
 *       - name: nombre
 *         description: El identificador del espectrograma
 *         required: true
 *     example:
 *         schema:
 *           $ref: '#/components/schemas/Espectrograma' 
 *     responses:
 *       '200':
 *         description: Espectrograma creado
 *         schema:
 *           $ref: '#/components/schemas/Espectrograma'
 *       '400':
 *         description: No se ha encontrado la curva de luz indicada
 */
router.patch('/:_id', async (req, res) => {
    try {
        if (req.body._id){
            delete req.body._id;
        }
        const result = await Espectrograma.findByIdAndUpdate(req.params._id,req.body);
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});

/**
 * 
 *  @swagger
 * 
 * /espectrogramas/{id}:
 *  delete:
 *     tags: ['Espectrograma']
 *     description: Elimina una curva de luz
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador del espectrograma
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Espectrograma"
 *       '400':
 *         description: No se ha encontrado el espectrograma indicado
 *         schema:
 *           $ref: "#/components/schemas/Espectrograma"
*/
router.delete('/:_id', async (req, res) => {
    try { 
        const esp = await Espectrograma.findByIdAndDelete(req.params._id);
        res.json(esp);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;