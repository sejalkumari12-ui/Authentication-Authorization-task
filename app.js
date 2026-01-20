const express = require("express");
const app = express();
const userModel = require('./models/user')

const cookieParser = require("cookie-parser");
const path = require("path");

// view engine
app.set("view engine", "ejs");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async(req, res) => {
 let {username,email,password,age} = req.body
 
 let createdUser = await userModel.create({
    username,
    email,
    password,
    age,
  })
  res.send(createdUser)
});

// server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
