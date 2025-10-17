const express=require("express");
const User = require("../Model/User");
const { userAuth } = require("../Middleware/auth");
const { allowedEditFields } = require("../utils/validation");

const profileRouter=express.Router();


//profile page for user to get info
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.send("Something went wrong---" + e.message)
  }
});

//update user Data
profileRouter.patch("/profile/update",userAuth, async (req, res) => {
  const _id = req.user._id;
  try {
    const data=req.body
    if (!allowedEditFields(data)) {
      throw new Error("Update is not allowed");
    }
    await User.findByIdAndUpdate(_id, data, [
      (runValidators = true),
      (returnDocument = "before"),
    ]);
    res.send("User is updated");
  } catch (e) {
    res.send("Something went wrong  ---" + e.message);
  }
});

module.exports=profileRouter