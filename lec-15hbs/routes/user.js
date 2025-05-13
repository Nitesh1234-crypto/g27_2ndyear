const express = require("express");
const router = express.Router();
const User= require("../model/user")
router.get("/register",(req,res)=>{
    res.render("register")
})
router.post("/register",async (req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password);
    let newUser=new User({name:name,email:email,password:password});
    await newUser.save();
    // console.log("hello");
    // res.send("user added successfully")
    res.redirect("/")

})

router.get("/",async(req,res)=>{
    let allusers=await User.find()
    res.render("users",{
        users:allusers
    })
})
router.get("/:id",async(req,res)=>{
    let {id} = req.params;
    let user=await User.findById(id);
    res.render("profile",{
       user:user 
    })
})
router.delete("/:id",async(req,res)=>{
    let {id}= req.params;
    await User.deleteOne({_id:id});
    res.send("user deleted")

})
router.put("/:id",async(req,res)=>{
    let {id} = req.params;
    let updateUser=await User.findById(id);
    let {name,email,password} = req.body;
    updateUser.name=name;
    updateUser.email=email;
    updateUser.password=password;
    await updateUser.save();
    res.send("user updated")
})


module.exports=router;
