const express=require("express");

const app=express()



// app.get("/user",(req,res)=>{
//     res.send("Data get successfully");
// })
app.post("/user",(req,res)=>{
    res.send("Post request")
})
app.get("/user",(req,res)=>{
    let query=req.query
    query=JSON.stringify(query)
    res.send(`Querys of this url are ---- ${query}`)
})

app.get("/users/:userID/:name",(req,res)=>{
    let params=req.params
    params=JSON.stringify(params)
    res.send(`Params of this url are ----${params}`)
})
app.use((req,res)=>{
    res.send("Listen to 3000 on server")
})
app.listen(3000,()=>{
    console.log("Server is started on port 3000")
});

