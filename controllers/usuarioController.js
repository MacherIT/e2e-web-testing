var passport = require("passport");
var usuarioModel = require("../models/usuarioModel.js");
var mongoose = require("mongoose");

/**
 * usuarioController.js
 *
 * @description :: Server-side logic for managing usuarios.
 */
module.exports = {
  /**
     * usuarioController.list()
     */
  list: function(req, res) {
    usuarioModel.find({}, null, { sort: { _id: -1 } }, function(err, usuarios) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting usuario.",
          error: err
        });
      }
      return res.json(usuarios);
    });
  },

  /**
     * usuarioController.show()
     */
  show: function(req, res) {
    var id = req.params.id ? req.params.id : req.payload._id;
    usuarioModel.findOne({ _id: mongoose.mongo.ObjectId(id) }, function(
      err,
      usuario
    ) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting usuario.",
          error: err
        });
      }
      if (!usuario) {
        return res.status(404).json({
          message: "No such usuario"
        });
      }
      return res.json(usuario);
    });
  },

  login: function(req, res) {
    passport.authenticate("local", function(err, usuario, info) {
      var token;

      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }

      // If a usuario is found
      if (usuario) {
        token = usuario.generateJwt();
        res.status(200);
        res.json({ token: token });
      } else {
        // If usuario is not found
        res.status(401).json(info);
      }
    })(req, res);
  },

  /**
     * usuarioController.create()
     */
  create: function(req, res) {
    var usuario = new usuarioModel({
      email: req.body.email,
      nombre: req.body.nombre,
      hash: req.body.hash,
      salt: req.body.salt
    });

    usuario.setPassword(req.body.password);

    usuario.save(function(err, usuario) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating usuario",
          error: err
        });
      }
      var token;
      token = usuario.generateJwt();
      return res.status(201).json({ token: token });
    });
  },

  /**
     * usuarioController.update()
     */
  update: function(req, res) {
    var id = req.payload._id;
    usuarioModel.findOne({ _id: mongoose.mongo.ObjectId(id) }, function(
      err,
      usuario
    ) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting usuario",
          error: err
        });
      }
      if (!usuario) {
        return res.status(404).json({
          message: "No such usuario"
        });
      }

      usuario.email = req.body.email ? req.body.email : usuario.email;
      usuario.nombre = req.body.nombre ? req.body.nombre : usuario.nombre;
      usuario.hash = req.body.hash ? req.body.hash : usuario.hash;
      usuario.salt = req.body.salt ? req.body.salt : usuario.salt;
      usuario.save(function(err, usuario) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating usuario.",
            error: err
          });
        }
        return res.json(usuario);

        return res.json(usuario);
      });
    });
  },
  /**

     * usuarioController.remove()
  remove: function(req, res) {
     */
  remove: function(req, res) {
    var id = req.payload._id;
    usuarioModel.findByIdAndRemove(mongoose.mongo.ObjectId(id), function(
      err,
      usuario
    ) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the usuario.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
