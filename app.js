var express=require('express');
var path=require('path');
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session') ;
//var ev = require('express-validation');
//init app

var app=express();


//path

app.use(express.static(path.join(__dirname,'public')));

//connect
  mongoose.connect('mongodb://root:12345a@ds123971.mlab.com:23971/heroku_l4htp1vv',function(err){

if(err){
    console.log("error");
}
else{
    console.log("connected to database");
}

});

// var db=mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open',function () {
//     console.log('connected');
// });

//body-parser

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))


//view
app.set('views',path.join(__dirname,'view'));
app.set('view engine','ejs');

//app-messages

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
//set global errors
app.locals.errors=null;
//get router
var pages=require('./routes/pages');
var adminpage=require('./routes/admin_page');

app.use('/admin',adminpage);
app.use('/home',pages);

//port

app.listen(3000,function ( ) {
    console.log('server started');
})