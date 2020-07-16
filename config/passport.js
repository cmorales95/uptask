const passport = require('passport');
const LocalStrategy = require('passport-local');

// Referencia al modelo que vamos a autenticar
const Usuarios = require('../models/Usuarios');

// local strategy - login con credenciales
passport.use(
    new LocalStrategy (
        //* espera un usuario y un password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            //* validamos existencia
            try {
                const usuario = await Usuarios.findOne({
                    where: { email: email}
                });
                
                //! Validamos password incorrecto
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Contraseña no es correcta'
                    });    
                }

                //* Todo Ok
                return done(null, usuario);
            } catch (error) {
                //! Usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                });
            }
        }
    )
);

//* Serializamos el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//* Deserializamos el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario)
});
 
module.exports = passport;