const express = require('express');
const {Usermodel, Todomodel} = require("./db")
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
require("dotenv").config();

const {JWT_SECRET, MONGO_URL, auth} = require("./auth") 

const app = express();

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("DB Connected");

    app.listen(3000,()=>{
        console.log("Server running on 3000");
    })
})
.catch(err=>{
    console.log("Error:"+err);
})

app.use(express.json());

app.post("/signup", async (req,res)=>{
    
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        await Usermodel.create({
          name: name,
          password: password,
          email: email,
        });
        res.json({
          msg: "You are signed in",
        });
        
    } catch (error) {
        res.status(500).json({
          msg: "Something went wrong",
        });
    }

    
})

app.post("/signin", async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await Usermodel.findOne({
          email: email,
          password: password,
        });

        console.log(user);

        if (user) {
          const token = jwt.sign(
            {
              id: user._id.toString(),
            },
            JWT_SECRET,
          );

          res.json({
            token: token,
          });
        } else {
          res.status(500).json({
            msg: "Something went wrong",
          });
        }

        
    } catch (error) {
        res.status(500).json({
          msg: "Something went wrong",
        });
    }

    

});

app.post("/todo",auth, (req, res) => {

    res.json({
        id:req.userId
    });

});

app.get("/todos", auth, (req,res)=>{

})
