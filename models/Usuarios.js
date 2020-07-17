const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt');

const Usuarios = db.define(
  'usuarios',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      unique: {
          msg: 'usuario ya registrado'
      },
      validate: {
        isEmail: {
          msg: 'Agrega un correo válido'
        },
        notEmpty: {
          msg: 'Contraseña no puede estar vacía',
        },
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Contraseña no puede estar vacía',
        },
      },
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
  },
  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);

// Métodos personalizados
Usuarios.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password); //* esto this.password es el de la db
}


Usuarios.hasMany(Proyectos);



module.exports = Usuarios;
