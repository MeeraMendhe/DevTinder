const express=require("express");
const {connectDb}=require("./config/database");
const User = require("./Model/User");
const app=express()

app.use(express.json())

app.post("/signup", async(req,res)=>{
    let obj=req.body
    const user=new User(obj)
    try{
       await user.save()
       res.send("New user added successfully")
       
    }catch(err){
      res.status(401).send("Not able to add user")
    }
})

// get one user data using email
app.get("/user",async(req,res)=>{
    let email=req.body
    try{
       let user=await User.find(email)
       res.send(user)
    }catch(e){
        res.send("Something went wrong",e)
    }
})

//get all user data for feed api
app.get("/feed",async(req,res)=>{
    try{
       let user=await User.find({})
       res.send(user)
    }catch(e){
        res.send("Something went wrong",e)
    }
})


//update user Data
app.patch("/user",async(req,res)=>{
    try{
      let _id="68d205c0e8d28c7c73184d7c";
      let val=await User.findByIdAndUpdate(_id,req.body)
      console.log(val)
      res.send("User is updated")
    }catch(e){
         res.send("Something went wrong",e)
    }
})


//delete user 
app.delete("/user", async(req,res)=>{
    try{
        let _id="68d208ed88e873e9aea416b9"
        await User.findByIdAndDelete(_id);
        res.send("User is deleted successfully")
    }
    catch(e){
 res.send("Something went wrong",e)
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

