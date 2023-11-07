const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function home(req, res, next) {
  res.render('index', { title: 'Express' });
}

function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const JwtKey = "304db2483b8814fc7e60f5b2fb252749";

  User.findOne({ "_email": email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user._password, (err, result) => {
          if (err) {
            res.status(403).json({
              message: "Error en la autenticación",
              obj: err
            });
          } else if (result) {
            // Generar un token con los permisos del usuario incluidos
            const token = jwt.sign({ email: user._email, permissions: user._permissions }, JwtKey, { expiresIn: '1h' });

            // Imprimir la información del usuario en la consola para verificar su disponibilidad
            console.log('Usuario después de autenticación:', user);
            
            // Asignar la información del usuario a req.user después de la autenticación
            req.user = user; // Aquí asigna el usuario a req.user

            res.status(200).json({
              message: "Inicio de sesión exitoso",
              token: token
            });
          } else {
            res.status(403).json({
              message: "Usuario y/o contraseña incorrectos",
              obj: null
            });
          }
        });
      } else {
        res.status(403).json({
          message: "Usuario y/o contraseña incorrectos",
          obj: null
        });
      }
    })
    .catch(ex => {
      res.status(500).json({
        message: "Error al buscar usuario en la base de datos",
        obj: ex
      });
    });
}


module.exports = { home, login };