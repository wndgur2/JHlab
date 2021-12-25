const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reptopiaRouter = require('./routes/reptopia');
var aiRouter = require('./routes/ai');
var algorithmRouter = require('./routes/algorithm');
var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//connect to mongodb
const dbURL = "mongodb+srv://tempUser:temp123@cluster0.f5csc.mongodb.net/userData?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(port, (res)=>console.log("server connected.")))
  .catch(err => console.log(err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/algorithm', algorithmRouter);
app.use('/ai', aiRouter);
app.use('/reptopia', reptopiaRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);


app.post('/signup', (req, res) => {
  const newUser = new User(req.body); 

  User.find(req.body)
  .then(result => {
    if(result.length!=0)
      res.render('signup', {messege:"Already exist id."});
    else{
      newUser.save()
        .then(result => {
            res.redirect('/signin');
        })
        .catch(err => {
            console.log(err);
        });
    }
  })
});

app.post('/signin', (req, res) => {
  User.find(req.body)
  .then(result => {
      console.log('logged:', result);
      if(result.length!=0){
          user = result[0];
          res.render('index');
      }
      else{
          res.render('signin', {messege: "Id, password error."});
      }
  })
  .catch(err => {
      console.log(err);
      res.redirect('/signin');
  });
});



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
