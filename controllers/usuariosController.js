const Usuarios = require("../models/Usuarios");

const formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear Cuenta en UpTask",
  });
};

const formIniciarSesion = (req, res) => {
  const {error} = res.locals.mensajes;
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar Sesión en UpTask",
    error
  });
};

const crearCuenta = async(req, res) => {
  //* leer los datos
  const { email, password } = req.body;

  try {
    
    //* Crear el usuario
    await Usuarios.create({
      email,
      password,
    });
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash('error', error.errors.map(error => error.message));
    res.render('crearCuenta', {
      nombrePagina: 'Crear Cuenta en UpTask',
      mensajes: req.flash(),
      email,
    })
  }
};

const formReestablecerPassword = (req, res) => {
  res.render('reestablecer',{
    nombrePagina: 'Reestablecer tu contraseña'
  });
};

module.exports = {
  formCrearCuenta,
  formIniciarSesion,
  crearCuenta,
  formReestablecerPassword
};
