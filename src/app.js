const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./Model/User");
const bcrypt=require("bcrypt")
const cookiesParser=require("cookie-parser")
const jwt = require('jsonwebtoken');

const app = express();



app.use(express.json());
app.use(cookiesParser())

app.post("/signup", async (req, res) => {
  let obj = req.body;
  let password=obj.password;
  const hashPassword=await bcrypt.hash(password,10);
  console.log(hashPassword)
  const user = new User({...obj,password:hashPassword});
  try {
    await user.save();
    res.send("New user added successfully");
  } catch (err) {
    res.send("Not able to add user" + err.message);
  }
});

// get one user data using email
  app.get("/user", async (req, res) => {
  let email = req.body;
  try {
    let user = await User.find(email);
    res.send(user);
  } catch (e) {
    res.send("Something went wrong  ---" + e.message);
  }
});


//get all user data for feed api
app.get("/feed", async (req, res) => {
  try {
    let user = await User.find({});
    res.send(user);
  } catch (e) {
    res.send("Something went wrong  ---" + e.message);
  }
});

//update user Data
app.patch("/user/:id", async (req, res) => {
    const _id=req.params.id
  try {
    let allowedKeys=["location","phone"]
    const data=req.body;
    const isAllowed=Object.keys(data).every((k)=>allowedKeys.includes(k))
    
    if(!isAllowed){
        throw new Error("Update is not allowed")
    }
    let val = await User.findByIdAndUpdate(_id, data, [
      runValidators = true,
      returnDocument = "before",
    ]);
    console.log(val);
    res.send("User is updated");
  } catch (e) {
    res.send("Something went wrong  ---" + e.message);
  }
});

//delete user
app.delete("/user/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    await User.findByIdAndDelete(_id);
    res.send("User is deleted successfully");
  } catch (e) {
    res.send("Something went wrong  ---", e);
  }
});

//login the user

app.post("/login", async (req, res)=>{
    try{
        const email=req.body.email
        const password=req.body.password
        let user = await User.findOne({email:email});
        if(!user)
        {
            throw new Error("Please sign In first, no email registred")
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        console.log("---------",user)
        if(isPasswordValid)
        {
            const token=await jwt.sign({ _id: user._id }, "DEVTinder@2710%MM");
            res.cookie("token", token)
            res.send("User Login successfully")
        }
        else
        {
            throw new Error("Invalid Credentials")
        }
    }
    catch(e){
        res.send("Something went wrong ---"+e.message)
    }
})

//profile page for user to get info
app.get("/profile", async(req, res)=>{
    try{
        let cookies=req.cookies
        const decoded = await jwt.verify(cookies.token, 'DEVTinder@2710%MM');
        const userInfo= await User.findById(decoded._id)
        res.send(userInfo)
    }
    catch(e){
         res.send("Something went wrong ---"+e.message)
    }
})
connectDb()
  .then(() => {
    console.log("database is connected to mongodb");
    app.listen(3000, () => {
      console.log("Server is started on port 3000");
    });
  })
  .catch((err) => {
    console.log("database is not connected"+ err.message);
  });
