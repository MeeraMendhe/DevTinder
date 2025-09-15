const adminAuth=(req,res,next)=>{
    let token="12345";
    let authToken="12345";
    if(token!==authToken)
    {
        res.status(401).send("Admin is not autharized");
    }else
    {
        next()
    }
}

const userAuth=(req,res,next)=>{
    let token="xyz";
    let authToken="xyz";
    if(token!==authToken)
    {
        res.status(401).send("Admin is not autharized");
    }else
    {
        next()
    }
}

module.exports={adminAuth,userAuth}