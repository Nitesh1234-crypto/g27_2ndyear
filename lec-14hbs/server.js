const express = require("express");
const app= express();
const mongoose = require('mongoose');
const User = require("./model/user");
const Blog = require("./model/blog");
const userRoute= require("./routes/user") //function
var hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.use(express.json());
app.set('view engine', 'hbs');
app.get("/",(req,res)=>{
  res.render("home");
})
app.get("/userpage",(req,res)=>{
  res.render("userpage",{
    name:"Nitesh",
    followers:["Ritik","pratiyush","Shubham"]
  })
})
app.get("/blogpage",(req,res)=>{
  res.render("blogpage",{
    blogs:[{id:1,title:"my first blog",content:"dsfdsfdfdsffdfdsfsdfdsfs",banner:"https://media.istockphoto.com/id/535168027/photo/india-goa-palolem-beach.jpg?s=612x612&w=0&k=20&c=iGV1Ue0Efj87dQirWnUpZVG1dNobUjfVvMGdKHTJ7Qg="},
      {id:2,title:"my second blog",content:"dsfdsfdfdsffdfdsfsdfdsfs",banner:"https://media.istockphoto.com/id/535168027/photo/india-goa-palolem-beach.jpg?s=612x612&w=0&k=20&c=iGV1Ue0Efj87dQirWnUpZVG1dNobUjfVvMGdKHTJ7Qg="}]
  }
)})
app.use("/users",userRoute);
app.use("/blogs",require("./routes/blog"))



mongoose.connect('mongodb://127.0.0.1:27017/g27mdb')
  .then(() => console.log('Connected!'))
  .catch((err)=>console.log(err));
app.listen(4433,(req,res)=>{
    console.log("server started")
})