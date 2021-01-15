//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const CurvaDeLuz = require('../models/CurvaDeLuz');

//TODO: Gestion de errores

//GET Todas las curvas de luz

/**
 * 
 *  @swagger
 * 
 * /curvasdeluz/:
 *  get:
 *     tags: ['Curva de Luz']
 *     description: Devuelve todas las curvas de luz existentes
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Curva de Luz"
 *       '400':
 *         description: No se ha encontrado la curva de luz indicada
*/
router.get('/', async (req, res) => {
    try {
        const curva = await CurvaDeLuz.find();
        res.json(curva);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

/**
 * 
 *  @swagger
 * 
 * /curvasdeluz/{id}:
 *  get:
 *     tags: ['Curva de Luz']
 *     description: Devuelve una curva de luz segun el id introducido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la curva de luz
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Curva de Luz"
 *       '400':
 *         description: No se ha encontrado la curva de luz indicada
*/
router.get('/:_id', async (req, res) => {
    try {
        const curva = await CurvaDeLuz.findById(req.params._id);
        if(!curva){
            res.status(400).send('No se encuentra la estacion indicada');
            return;
        }
        res.json(curva);
    } catch (err) {
        res.json({ message: err });
    }
});

/**
 * 
 *  @swagger
 * 
 * /curvasdeluz/:
 *  post:
 *     tags: ['Curva de Luz']
 *     description: Introduce una nueva curva de luz
 *     parameters:
 *       - name: Curva de luz
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Curva de Luz'
 *     responses:
 *       '200':
 *         schema:
 *           $ref: '#/components/schemas/Curva de Luz'
 *         description: Curva de luz creada
 *       '400':
 *         description: No se ha podido añadir la curva de luz
 */
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
        if(!savedCurva){
            res.status(400).send('No se ha podido añadir la curva de luz');
            return;
        }
        res.json(savedCurva);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

//Utilizamos patch para que no sea necesario sobreesribir todo el objeto

/**
 * 
 *  @swagger
 * 
 * /curvasdeluz/{id}:
 *  patch:
 *     tags: ['Curva de Luz']
 *     description: Modifica una curva de luz  existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la curva de luz
 *         required: true
 *       - name: curva de luz
 *         in: body
 *         description: Campos de la curva de luz a modificar y/o añadir
 *         schema: 
 *           $ref: '#/components/schemas/Curva de Luz'
 *         required: true
 *     example:
 *         schema:
 *           $ref: '#/components/schemas/Curva de Luz' 
 *     responses:
 *       '200':
 *         description: Curva de luz creada
 *         schema:
 *           $ref: '#/components/schemas/Curva de Luz'
 *       '400':
 *         description: No se ha encontrado la curva de luz indicada
 */
router.patch('/:_id', async (req, res) => {
    try {
        if (req.body._id){
            delete req.body._id;
        }
        const result = await CurvaDeLuz.findByIdAndUpdate(req.params._id,req.body);
        if(!result){
            res.status(400).send('No se ha encontrado la curva de luz indicada');
            return;
        }
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});

//Delete espectrograma por id
//TODO: En caso de que no se encuentre el _id lanzar un error 400 (Mirar la API de Chamo)

/**
 * 
 *  @swagger
 * 
 * /curvasdeluz/{id}:
 *  delete:
 *     tags: ['Curva de Luz']
 *     description: Elimina una curva de luz
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador de la curva de luz
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Curva de Luz"
 *       '400':
 *         description: No se ha encontrado la curva de luz indicada
*/
router.delete('/:_id', async (req, res) => {
    try { 
        const curve = await CurvaDeLuz.findByIdAndDelete(req.params._id);
        if(!curve){
            res.status(400).send('No se ha encontrado la curva de luz indicada');
            return;
        }
        res.json(curve);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;