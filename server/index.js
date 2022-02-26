const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

const User = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect tp mongoDB
mongoose
  .connect("mongodb://localhost/myapp")
  .then(() => {
    console.log("MongoDb ga ulanish xosil qilindi");
  })
  .catch((err) => {
    console.log("MongoDb ga ulaish paytida xato yuz berdi brat", err);
  });

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  User.findOne({ email }).then((savedUser) => {
    if (savedUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    bcrypt.hash(password, 10).then((hash) => {
      const user = new User({
        name,
        email,
        password: hash,
      });

      user
        .save()
        .then((user) => {
          res.json({
            message: "User created successfully",
            user,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

app.post("/login",(req,res)=>{
   const {email,password} = req.body;
   if(!email || !password){
     res.status(400).json({message:"Please fill all the fields"})
   }
   User.findOne({email})
   .then(user=>{
      if(!user){
         return res.status(400).json({error:"User does not exist"})
      }
      bcrypt.compare(password,user.password)
      .then(isMatch=>{
         if(!isMatch){
            return res.status(400).json({error:"Invalid credentials"});
         }
         res.json({
           message:"Login successful",
           user
         })
      })
      .catch(err=>{
          console.log(err);
      })
   })
})

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// adfhhfIKBDBSDBFfdasdf
