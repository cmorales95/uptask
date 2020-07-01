const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

const agregarTarea = async (req, res, next) => {
  // Buscamos el proyecto actual
  const url = req.params.url;
  const proyecto = await Proyectos.findOne({
    where: { url },
  });

  // leemos el valor de la tarea
  const { tarea } = req.body;
  const estado = false;
  const proyectoId = proyecto.id;

  //* Crear la tarea
  const resultado = await Tareas.create({ tarea, estado, proyectoId });

  if (!resultado) return next();

  // redireccionamos
  res.redirect(`/proyectos/${url}`);
};

const cambiarEstadoTarea = async (req, res, next) => {
  const { id } = req.params;
  const tarea = await Tareas.findOne({
    where: { id },
  });

  // cambiar estado
  tarea.estado = !tarea.estado;

  const resultado = tarea.save();

  // Validamos respuesta al cambiar el estado
  if (!resultado) return next();

  res.status(200).send("Actualizado");
};

const eliminarTarea = async (req, res, next) => {
  
  const { id } = req.params;

  //! eliminamos la tarea
  const resultado = await Tareas.destroy({
    where: { id },
  });

  // Valimaos es resultado
  if(!resultado) return next();

  res.status(200).send("La tarea se ha eliminado");
};

module.exports = {
  agregarTarea,
  cambiarEstadoTarea,
  eliminarTarea,
};
