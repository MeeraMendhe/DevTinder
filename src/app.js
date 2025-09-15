const express=require("express");

const app=express()



app.get("/user",(req,res,next)=>{
    console.log("1st handler")
    // res.send("1st response");
    next()
},(req,res)=>{
    console.log("2nd handler")
    res.send("2nd response");

})
app.get("/test",[(req,res,next)=>{
    console.log("1st handler")
    // res.send("1st response");
    next()
},(req,res,next)=>{
    console.log("2nd handler")
    // res.send("2nd response");
    next()
},(req,res,next)=>{
    console.log("3rd handler")
    // res.send("3rd response");
    next()
}],(req,res,next)=>{
    console.log("4th handler")
    res.send("4th response");
    next()
})
// app.use((req,res)=>{
//     res.send("Listen to 3000 on server")
// })
app.listen(3000,()=>{
    console.log("Server is started on port 3000")
});

