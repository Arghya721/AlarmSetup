const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
var time;
var flag = 0;
app.set('view engine', 'ejs');
app.use('/static',express.static('static'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

setInterval(function(){ 
    var today = new Date();
    var settime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(settime);
    if(settime>time){
        //console.log("Time error");
    }
    else if(settime<time){
        //console.log("Time ok");
    }
    else if(settime == time){
        //console.log("Time ok");
        flag = 1;
    }
},500);


app.get("/getalarm",(req,res)=>{
    
    if(flag == 1){
        console.log("Alarm");
        res.send("1");
    }
    else{
        console.log("No Alarm");
        res.send("0");
    }
});

app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/",(req,res)=>{
    time = req.body.time;
    flag = 0;
    console.log(time);
    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("Server Started");
});