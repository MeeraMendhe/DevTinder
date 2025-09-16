const mongoose=require("mongoose");
const {Schema,model}=mongoose;

const userSchema=new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    age:{
        type:Number
    },
    location:{
        type:String
    },
    gender:{
        type:String
    }
})

const User=model("User",userSchema)

module.exports=User