const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const crypto = require("crypto");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');

const autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ingresa Usuario y Contraseña",
});

const usuarioAutenticado = (req, res, next) => {
  //* Usuario esta autenticado
  if (req.isAuthenticated()) {
    return next();
  }

  //! Usuario no esta autenticado
  return res.redirect("/iniciar-sesion");
};

const cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion");
  });
};

const enviarToken = async (req, res) => {
  console.log("Enviar Token");
  // verificamos que el usuario exista
  const usuario = await Usuarios.findOne({ where: { email: req.body.email } });

  //! No existe el usuario
  if (!usuario) {
    req.flash("error", "No existe esa cuenta");
    res.redirect("/reestablecer");
  }

  //* Usuario existe, actualizamos
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiracion = Date.now() + 3600000; // 1 hora
  await usuario.save();

  // url de reset
  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
  console.log(resetUrl);
};

const validarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: { token: req.params.token },
  });

  //! No se encuentra usuario
  if (!usuario) {
    req.flash("error", "No Válido");
    res.redirect("/reestablecer");
  }

  //* Formulario para generar
  res.render("resetPassword", {
    nombrePagina: "Reestablecer Contraseña",
  });
};

const actualizarPassword = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiracion: {
        [Op.gte]: Date.now(),
      },
    },
  });

  //! Error, es usuario ya le expiró la contraseña
  if (!usuario) {
    req.flash("error", "No Válido");
    res.redirect("/redirect");
  }

  //* Restablecemos password del usuario 
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiracion = null;
  
  await usuario.save();
  req.flash('correcto','Tu password ha sido modificado');
  res.redirect('/iniciar-sesion');

};

module.exports = {
  autenticarUsuario,
  usuarioAutenticado,
  cerrarSesion,
  enviarToken,
  validarToken,
  actualizarPassword,
};
