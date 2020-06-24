const express = require('express');
const router = express.Router();

// Import express validator
const { body } = require('express-validator');

// Import controllers
const proyectosController = require('../controllers/proyectosController');

module.exports = () => {
    // routes
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );
    return router;
};