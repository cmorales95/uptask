const express = require('express');
const router = express.Router();

// Import express validator
const { body } = require('express-validator');

// Import controllers
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

module.exports = () => {
    // routes
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    //* Actualizar Proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );
    //! Eliminar Proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);
    
    // Tareas
    //* Agregar Tarea
    router.post('/proyectos/:url', tareasController.agregarTarea);
    
    //* Actualizar Tarea
     router.patch('/tareas/:id',tareasController.cambiarEstadoTarea);
     
     //! Eliminamos tarea
     router.delete('/tareas/:id',tareasController.eliminarTarea);

    return router;
};