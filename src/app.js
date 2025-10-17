const express = require("express");
const { connectDb } = require("./config/database");
const cookiesParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookiesParser());

const authRouter=require("./routers/authRouter");
const profileRouter=require("./routers/profile");
const requestRouter=require("./routers/request");
const userRouter=require("./routers/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDb()
  .then(() => {
    console.log("database is connected to mongodb");
    app.listen(3000, () => {
      console.log("Server is started on port 3000");
    });
  })
  .catch((err) => {
    console.log("database is not connected" + err.message);
  });
