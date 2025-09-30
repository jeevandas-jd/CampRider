var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

var app = express();

// Enable CORS (full config)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

require("dotenv").config();
const authRoutes = require("../server/src/routes/authRoutes");
require("../server/src/utils/googlePassport"); // initialize Google Strategy
require("../server/src/models/loadModels");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("/api/hello", (req, res) => {
  res.json({ "message": "hello world" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Admin routes
const adminRoutes = require("../server/src/routes/adminRoutes");
app.use("/api/admin", adminRoutes);

// Pilot routes
const pilotRoutes = require("../server/src/routes/pilotRoutes");
app.use("/api/pilot", pilotRoutes);

// Consumer routes
const consumerRoutes = require("../server/src/routes/consumerRoutes");
app.use("/api/consumer", consumerRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
