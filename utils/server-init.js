module.exports = {
  init: () => {
    const express = require("express");
    const path = require("path");
    let server;

    before(done => {
      const app = express();
      app.use("/", express.static(path.resolve(__dirname, "../static/site")));
      server = app.listen(8080, done);
    });
    after(() => {
      server.close();
    });
  }
};
