const passport = require("passport");

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
        res.redirect('/iniciar-sesion');
    });
};

module.exports = {
  autenticarUsuario,
  usuarioAutenticado,
  cerrarSesion,
};
