const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email ID is not valid");
        }
      },
    },
    phone: {
      type: Number,
    },
    age: {
      type: Number,
      min: 18,
    },
    location: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photo: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid");
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter the Strong Password");
        }
      },
      required:true
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT=async function(){
 const user=this;
 const token=await jwt.sign({ _id: user._id }, "DEVTinder@2710%MM",{ expiresIn: "1h" });//token will expires in 1hr
 return token
}

userSchema.methods.bcryptPassword=async function(password){
  const user=this;
  const isPasswordValid=await bcrypt.compare(password, user.password);
  return isPasswordValid
}

const User = model("User", userSchema);

module.exports = User;
