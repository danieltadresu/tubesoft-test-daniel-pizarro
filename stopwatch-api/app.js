var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var stopwatchRouter = require("./routes/stopwatch");

const sequelize = require("./util/database");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use("/stopwatch", stopwatchRouter);

sequelize
  .sync({
    force: false,
  })
  .catch((err) => {
    // await sequelize.sync({ force: true });
    console.log("[ error ]");
    console.log(err);
  });

module.exports = app;
