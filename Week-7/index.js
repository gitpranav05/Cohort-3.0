const express = require('express');
const cors = require('cors');
const {Usermodel, Todomodel} = require("./db")
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
require("dotenv").config();

const {JWT_SECRET, MONGO_URL, auth} = require("./auth") 

const app = express();
app.use(cors())
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
          msg: "You are signed up",
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

app.post("/todo",auth, async (req, res) => {

    try {
        const title = req.body.title;
        const userId = req.userId;
        const done = req.body.done;

        await Todomodel.create({
          title: title,
          userId: userId,
          done: done,
        });
        res.json({
          msg: "Done!",
        });
        
    } catch (error) {
        res.status(500).json({
          msg: "Something went wrong",
        });
    }
});

app.get("/todos", auth, async (req,res)=>{

  try {
    const todos = await Todomodel.find({
    userId:req.userId
  })

  res.json({
    todos:todos
  })
    
  } catch (error) {
    res.status(500).json({
          msg: "Something went wrong",
        });
  }
})

app.delete("/delete/:id",auth, async (req,res)=>{
  try {
    const deleted = await Todomodel.findOneAndDelete({
      _id:req.params.id,
      userId:req.userId
    })

    if(!deleted){
      return res.status(404).json({
        msg:"Not allowed"
      })
    }

    res.json({
      msg:deleted,
      asd:"asdasd"
    })
    
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
})

app.delete("/deleteall",auth, async(req,res)=>{

  try {
    
    const deleted = await Todomodel.deleteMany({
      userId: req.userId,
    });

    if(deleted){
      res.json({
        msg:"Deleted all",
        deletedCount:deleted.deletedCount
      })
    }
    
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
  

})

app.put("/edit/:id", auth, async (req, res) => {
  const id = req.params.id;  
  const task = req.body.task;
  const resp = await Todomodel.findOneAndUpdate(
    { _id: id, userId: req.userId.toString() },
    { title: task },
    
  );

  if (!resp) {
    return res.status(404).json({
      msg: "Todo not found",
    });
  }

  res.json({
    msg: "Done",
    todo: resp,
  });
});