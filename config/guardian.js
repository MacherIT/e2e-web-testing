var jwt = require("express-jwt");

module.exports = {
  midJWT: jwt({ secret: "MY_SECRET [TBM]", userProperty: "payload" }),

  secure: function(req, res, next) {
    if (!req.payload._id) {
      res.status(401).json({ message: "UnauthorizedError: private profile" });
    } else {
      next();
    }
  }
};
