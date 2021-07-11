var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var cookieSession = require('cookie-session')
var methodOverride = require('method-override')
// const csrf = require("csurf");

var adminRouter = require('./routes/admin/index');
var productRouter = require('./routes/production/index');
const accountModel = require('./model/Account')
var app = express();



app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'))
app.use(cookieSession({
  name: 'userId',
  secret:'woosafd32532wfsf',
  maxAge: 24 * 60 * 60 * 1000 
}))

// view engine setup
// app.set('views', path.join(__dirname, 'views','production'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(function(req, res, next){
    app.set('views', path.join(__dirname, 'views','production'));
    app.set('layout', 'layouts/main');
    next()
})

app.use('/admin', function (req, res, next) {

  app.set('views', path.join(__dirname, 'views/admin'));
  app.set('layout', 'layouts/main');

  next()
})

app.use(express.static(path.join(__dirname, 'uploaded_account_img')));
app.use(express.static(path.join(__dirname, 'uploaded_category_img')));
app.use(express.static(path.join(__dirname, 'upload_product_img')));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(function(req, res, next){
    if(!(req.session && req.session.userId))
    {
      return next()
    }
    accountModel.findOne({_id:req.session.userId },(err,result) => {
      if(result)
      {
        result.password = undefined; 
        req.user = result
        res.locals.user = result
        next()
      }
      else{
        next()
      }
    })
  })
  

//config connect database
const connectdb = require('./mongodb_configuration/connectMongodb')
const mongoose = require('mongoose');
const db = mongoose.connection;
connectdb()
db.on('error',()=>{console.log('Ket noi that bai');});
db.once('open', function() {
  console.log('Ket noi thanh cong');
});





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/admin', adminRouter);
app.use('/', productRouter);

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
