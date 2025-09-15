const express=require("express");

const app=express()
const {adminAuth, userAuth}=require("./Middleware/auth")

app.use("/admin",adminAuth)

app.get("/admin/getData",(req,res,next)=>{
    res.send("User Data")
})

app.post("/admin/postData",(req,res,next)=>{
    res.send("post Data")
})

app.get("/user/getData",userAuth,(req,res)=>{
    res.send("Get user Data")
})

app.post("/user/login",(req,res)=>{
    res.send("User login successfully!!!")
})
// app.use((req,res)=>{
//     res.send("Listen to 3000 on server")
// })
app.listen(3000,()=>{
    console.log("Server is started on port 3000")
});

