var express=require('express');

var cookieParser=require('cookie-parser');
var session=require('express-session');
var path=require('path');

var bodyParser=require("body-parser")
var app=express();
app.use(cookieParser());
app.set('view engine','html');//模板引擎
app.set('views',path.resolve('views'));//模板存放根目录
app.engine('html',require('ejs').__express);//渲染模板
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'aa'
}))
app.get('/signin',function(req,res){

    res.render('signin');

})
app.post('/signin',function(req,res){
    var user=req.body;
    if(user.username=='admin'){
        req.session.name='admin';
        res.redirect('/user')
    }else{
        res.redirect('back')
    }


})
app.get('/user',function(req,res){
    var name=req.session.name;
    if(name){
        res.render('welcome',{name:name});
    }else{
        res.redirect('/signin')
    }

})
app.listen(8080)