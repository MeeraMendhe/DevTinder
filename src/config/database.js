const mongoose=require("mongoose");
const URL="mongodb+srv://namasteNode:namasteNode@nodelearning.g9ok3n3.mongodb.net/devTinder"
const connectDb= async()=>{
   await mongoose.connect(URL)
}

module.exports={connectDb}