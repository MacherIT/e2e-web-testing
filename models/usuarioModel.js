var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

usuarioSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
    .toString("hex");
};

usuarioSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
    .toString("hex");
  return this.hash === hash;
};

usuarioSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      nombre: this.nombre,
      exp: parseInt(expiry.getTime() / 1000)
    },
    "MY_SECRET [TBM]"
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model("usuario", usuarioSchema);
