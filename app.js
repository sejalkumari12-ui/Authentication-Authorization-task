const express = require("express");
const app = express();
const userModel = require('./models/user')
const bcrpt = require("bcrypt")

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


app.post("/create", (req, res) => {
 let {username,email,password,age} = req.body

 bcrpt.genSalt (10,(err,salt) =>{
    bcrpt.hash(password , salt , async (err,hash) =>{
         let createdUser = await userModel.create({
            username,
            email,
            password : hash,
             age,
          })
               res.send(createdUser)

        })
      })

 

});

// server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
