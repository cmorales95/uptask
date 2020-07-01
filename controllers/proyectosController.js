const Proyectos = require('../models/Proyectos');
const slug = require('slug');
const Tareas = require('../models/Tareas');

// Controllers
const proyectosHome = async(req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
};

const formularioProyecto = async(req, res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
};

const nuevoProyecto = async(req, res) => {
    const proyectos = await Proyectos.findAll();
    // console.log(req.body);
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al Proyecto' })
    }

    // hay errores
    if (errores.length) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        });
    } else {
        // Sin errores, insertar en la bd
        await Proyectos.create({ nombre });
        res.redirect("/");
    }
};

const proyectoPorUrl = async(req, res, next) => {
    const [proyectos, proyecto] = await Promise.all([
        Proyectos.findAll(), // Buscamos el proyecto solicitade
        Proyectos.findOne({ // Cargamos sidebar de proyectos
            where: {
                url: req.params.url
            }
        })
    ]);

    const tareas = await Tareas.findAll({
        where: {
            proyectoId : proyecto.id
        },
        include: [
            { 
                model: Proyectos
            }
        ]
    });

    if (!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyectos,
        proyecto,
        tareas
    });
};

const formularioEditar = async(req, res) => {
    const [proyectos, proyecto] = await Promise.all([
        Proyectos.findAll(), // Buscamos el proyecto solicitade
        Proyectos.findOne({ // Cargamos sidebar de proyectos
            where: {
                id: req.params.id
            }
        })
    ]);


    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto,
    });
};
const actualizarProyecto = async(req, res) => {
    const proyectos = await Proyectos.findAll();
    // console.log(req.body);
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al Proyecto' })
    }

    // hay errores
    if (errores.length) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        });
    } else {
        // Sin errores, actualizar en la bd
        await Proyectos.update({ nombre }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/");
    }
};

const eliminarProyecto = async(req, res, next) => {
    //* usar query o params
    const { urlProyecto } = req.query;

    //! Eliminamos el registro
    const resultado = await Proyectos.destroy({
        where: {
            url: urlProyecto
        }
    });
    //! Sin respuesta
    if (!resultado) return next();
    // 
    //* Enviamos respuesta correcta
    res.status(200).send('Proyecto Eliminado Correctamente');
};

module.exports = {
    proyectosHome,
    formularioProyecto,
    nuevoProyecto,
    proyectoPorUrl,
    formularioEditar,
    actualizarProyecto,
    eliminarProyecto
}