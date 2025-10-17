const express = require("express");
const User = require("../Model/User");
const { signInValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  signInValidation(req.body);
  let obj = req.body;
  let password = obj.password;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User({ ...obj, password: hashPassword });
  try {
    await user.save();
    res.send("New user added successfully");
  } catch (err) {
    res.send("Not able to add user" + err.message);
  }
});

//login the user

authRouter.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Please sign In first, no email registred");
    }
    const isPasswordValid = await user.bcryptPassword(password);
    console.log("---------", user);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000), // cookie will be removed after 1 hours
      });
      res.send("User Login successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (e) {
    res.send("Something went wrong ---" + e.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("User logout successfully");
  } catch (e) {
    res.send("Something went wrong ---" + e.message);
  }
});

module.exports = authRouter;
