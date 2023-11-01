const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { expressjwt } = require('express-jwt');

const JwtKey = "304db2483b8814fc7e60f5b2fb252749";

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const directorsRouter = require('./routes/directors');
const actorsRouter = require('./routes/actors');
const genresRouter = require('./routes/genres');
const membersRouter = require('./routes/members');
const moviesRouter = require('./routes/movies');
const copiesRouter = require('./routes/copies');
const awaitListsRouter = require('./routes/awaitLists');
const mongoose = require('mongoose');

const app = express();

// Conectar a una base de datos de mongodb
// mongodb://<dbser>?:<dbPass>?@<url>:<port>/<dbName>
const url = "mongodb://localhost:27017/video-club";
mongoose.connect(url); //como parametro en donde esta la db

// ODMM
const db = mongoose.connection;

//  es un watcher, que cuando sea open haga la funcion flecha
db.on('open', ()=>{
  console.log('Conexión aceptada');
});

db.on('error', ()=>{
  console.log('No se pudo conectar a la BD');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressjwt({secret: JwtKey, algorithms: ['HS256']}).unless({path:["/login"]}));

//middlewares de enrutamiento
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors', directorsRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genresRouter);
app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/copies', copiesRouter);
app.use('/awaitLists', awaitListsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
