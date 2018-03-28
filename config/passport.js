var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
var usuario = mongoose.model("usuario");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(username, password, done) {
      usuario.findOne(
        {
          email: username
        },
        function(err, usuario) {
          if (err) {
            return done(err);
          }
          // Return if usuario not found in database
          if (!usuario) {
            return done(null, false, { message: "usuario not found" });
          }
          // Return if password is wrong
          if (!usuario.validPassword(password)) {
            return done(null, false, { message: "Password is wrong" });
          }
          // If credentials are correct, return the usuario object
          return done(null, usuario);
        }
      );
    }
  )
);
