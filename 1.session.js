var express=require('express');
var session=require('express-session')
var app=express();
//为什么所有的中间件都是函数，需要调用，是为传参
app.use(session({
    resave:true,//每次客户端访问服务器的时候不管有没有修改session都要重新保存session
    saveUninitialized:true,//保存未操作过的session
    secret:'zfpx'//服务器往客户端发送的时候，会对cookie进行加密，以后每次客户端访问服务器的时候，服务器会校验加密，如果校验通过，那么使用数据，如果校验不通过，则认为是诶篡改过的数据；

}))
//当使用session中间件之后会在请求对象 req增加一个session的对象属性
/*
* 第一次访问服务器的时候，服务器要做两件事情
* 1.生成一个标识id号（每个id是唯一的，尽可能不能才出来）
* 2.发给客户端cookie
* 客户端第二次访问服务器的时候
* 1.服务器先拿到id号，然后再服务器内存里找到对应的数据*/
/*app.get('/write',function(req,res){
    req.session.username='zfpx';
    res.send('ok')

})

app.get('/read',function(req,res){
    res.send(req.session.username)

})*/
//统计每个客户端访问服务器的次数
/*app.get('/visit',function(req,res){

    var visit=req.session.visit;
    visit=visit?visit+1:1;
    req.session.visit=visit;
    res.send(`${visit}`)

})*/
app.get('/visit',function(req,res){
    var visit=req.session.visit;
    visit=visit?visit+1:1;
    req.session.visit=visit;
    res.end('第'+visit+'访问')
})


app.listen(8080);