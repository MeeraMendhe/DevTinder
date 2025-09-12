const express=require("express");

const app=express()

app.use((req,res)=>{
    res.send("Listen to 3000 on server")
})
app.listen(3000,()=>{
    console.log("Server is started on port 3000")
});

