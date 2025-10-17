const express=require("express");
const { userAuth } = require("../Middleware/auth");

const userRouter=express.Router();

//get all user data for feed api
userRouter.get("/feed",userAuth, async (req, res) => {
  try {
    let user = await User.find({});
    res.send(user);
  } catch (e) {
    res.send("Something went wrong  ---" + e.message);
  }
});

module.exports=userRouter;