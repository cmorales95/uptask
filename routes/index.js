const express = require("express");
const router = express.Router();

// Import express validator
const { body } = require("express-validator");

// Import controllers
const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuarionController = require("../controllers/usuariosController");
const authContholler = require("../controllers/authController");

module.exports = () => {
  // routes
  router.get(
    "/",
    authContholler.usuarioAutenticado, //* Valido si esta autenticado
    proyectosController.proyectosHome
  );
  router.get(
    "/nuevo-proyecto",
    authContholler.usuarioAutenticado, //* Valido si esta autenticado
    proyectosController.formularioProyecto
  );
  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );
  router.get(
    "/proyectos/:url",
    authContholler.usuarioAutenticado, //* Valido si esta autenticado
    proyectosController.proyectoPorUrl
  );
  //* Actualizar Proyecto
  router.get(
    "/proyecto/editar/:id",
    authContholler.usuarioAutenticado, //* Valido si esta autenticado
    proyectosController.formularioEditar
  );
  router.post(
    "/nuevo-proyecto/:id",
    authContholler.usuarioAutenticado, //* Valido si esta autenticado
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );
  //! Eliminar Proyecto
  router.delete(
    "/proyectos/:url",
    authContholler.usuarioAutenticado, //* Valido si esta autenticado
    proyectosController.eliminarProyecto
  );

  // Tareas
  //* Agregar Tarea
  router.post(
    "/proyectos/:url",
    authContholler.usuarioAutenticado, //* Valido si esta autenticado
    tareasController.agregarTarea
  );

  //* Actualizar Tarea
  router.patch(
    "/tareas/:id",
    authContholler.usuarioAutenticado, //* Valido si esta autenticado
    tareasController.cambiarEstadoTarea
  );

  //! Eliminamos tarea
  router.delete(
    "/tareas/:id",
    authContholler.usuarioAutenticado, //* Valido si esta autenticado
    tareasController.eliminarTarea
  );

  // Usuarios
  //* Crear Cuenta
  router.get("/crear-cuenta", usuarionController.formCrearCuenta);
  router.post("/crear-cuenta", usuarionController.crearCuenta);

  //* Iniciar Sesion
  router.get("/iniciar-sesion", usuarionController.formIniciarSesion);
  router.post("/iniciar-sesion", authContholler.autenticarUsuario);

  //* Cerrar Sesion
  router.get('/cerrar-sesion', authContholler.cerrarSesion);

  return router;
};
