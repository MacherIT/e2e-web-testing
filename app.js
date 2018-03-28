const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const serveStatic = require("serve-static");
const crypto = require("crypto");


require("./models/db");


const fileUpload = require("express-fileupload");

const guardian = require("./config/guardian");
const passport = require("passport");

const usuarios = require("./routes/usuarioRoutes");
require("./config/passport");



const app = express();
app.use(compression());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//create a cors middleware
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(fileUpload());

/*
 * IMAGES
 */


app.post("/upload", guardian.midJWT, guardian.secure, function(req, res) {
  if (!req.files) return res.status(400).send("No files were uploaded.");

  const output = [];

  if (!Array.isArray(req.files.imagenes))
    req.files.imagenes = [req.files.imagenes];

  for (let i = 0; i < req.files.imagenes.length; i++) {
    let imagen = req.files.imagenes[i];

    let ubicacion = process.env.NODE_ENV === "production" ? "/home/<usuario>/public_html/" : ""; //[TBM] Añadir ruta

    let imgName =
      "public/images/uploads/" +
      crypto.randomBytes(5).toString("hex") +
      imagen.name
        .toLowerCase()
        .replace(/\s/g, "-")
        .replace(/á/g, "a")
        .replace(/é/g, "e")
        .replace(/í/g, "i")
        .replace(/ó/g, "o")
        .replace(/ú/g, "u")
        .replace(/ñ/g, "n")
        .replace(/[^a-zA-Z0-9\.-_]/g, "");

    imagen.mv(ubicacion + imgName, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        output.push({
          message: "File uploaded!",
          uri: "/" + imgName
        });

        if (i == req.files.imagenes.length - 1) res.json(output);
      }
    );
  }
});

process.env.NODE_ENV !== "production" && app.use(
  "/public/images/uploads",
  serveStatic(path.join(__dirname, "/public/images/uploads/"))
);

app.use(passport.initialize());


//////


app.use("/api/usuarios", usuarios);


////////MAILING

const mailing = require("./modules/mailing");
app.use("/api/mailing", mailing);

////////

// SIRVE LIBRERIAS BASICAS

process.env.NODE_ENV !== "production" && app.use(
  "/node_modules/",
  serveStatic(path.join(__dirname, "node_modules/"))
);

process.env.NODE_ENV !== "production" &&
  app.use(require("connect-livereload")({ port: 35729 }));

///////

// SIRVE SITIO PRINCIPAL

process.env.NODE_ENV !== "production" && app.use("/", serveStatic(path.join(__dirname, "static/site")));

process.env.NODE_ENV !== "production" && app.use("/admin", serveStatic(path.join(__dirname, "static/admin")));


//////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
