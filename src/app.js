const express=require("express");
const {connectDb}=require("./config/database");
const User = require("./Model/User");
const app=express()

app.post("/signup", async(req,res)=>{
    let obj={
        firstName:"Meera",
        lastName:"Batra",
        email:"meera@gmail.com",
        phone:123345,
        age:33,
        location:"sydney",
        gender:"female"
    }
    const user=new User(obj)
    try{
       await user.save()
       res.send("New user added successfully")
       
    }catch(err){
      res.status(401).send("Not able to add user")
    }
})

connectDb().then(()=>{
    console.log("database is connected to mongodb")
    app.listen(3000,()=>{
    console.log("Server is started on port 3000")
})
}).catch((err)=>{
    console.log("database is not connected",err)
});

