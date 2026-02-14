const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

const JWT_SECRET = "Creed"

app.use(express.json());
app.use(cors());

let users = [];
let todos = [];

function auth(req,res,next) {
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.status(404).json({
                msg:"Token missing"
            })
        }
        
        const dec = jwt.verify(token, JWT_SECRET);
        req.un = dec.un;
        next();
        
    } catch (error) {
        return res.status(401).json({
          msg: "Token expired",
        });
    }

    
}

app.get("/", (req,res)=>{
    // console.log("Working");
    res.sendFile(__dirname+"/index.html");
})

app.post("/signup",(req,res)=>{
    try {
        const un = req.body.un;
        const ps = req.body.ps;

        if (un && ps) {
          users.push({
            un: un,
            ps: ps,
          });
          res.json({
            msg: "Signed Up",
          });
        } else {
          res.status(404).json({
            msg: "Invalid Credentials",
          });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Something went wrong"
        })
    }

    
})

app.post("/signin", (req, res) => {
  try {
    const un = req.body.un;
    const ps = req.body.ps;

    const user = users.find(u=>(u.un===un && u.ps===ps));


    if (user) {
        const token = jwt.sign({
            un:un
        },JWT_SECRET)

      res.json({
        token: token,
      });
    } else {
      res.status(404).json({
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
});

app.get("/me", auth, (req,res)=>{
    try {
        const un = req.un;
        const userTodo = todos.filter(t=>t.un===un);

        res.json({
            un:un,
            todos:userTodo
        })

    } catch (error) {
        res.statusCode(500).json({
            msg:"Something went wrong"
        })
    }
})

app.post("/todo",auth,(req,res)=>{
    try {
        const task = req.body.task;
        const un = req.un
        
        todos.push({
            id:Date.now(),
            task:task,
            un:un   
        })

        res.json({
            todos
        })

        

    } catch (error) {
        res.status(500).json({
            msg:"Something went wrong"
        })
    }
})

app.delete("/delete/:id", auth, (req,res)=>{
    try {
        todos = todos.filter(
          (t) => !(t.id === Number(req.params.id) && t.un === req.un),
        );

        res.json({
          todos,
        });
        
    } catch (error) {
        res.status(500).json({
          msg:"Something went wrong"
        });
    }
})

app.delete("/alldel",auth,(req,res)=>{
    try {
        todos = todos.filter((t) => !(req.un === t.un));
        res.json({
            todos
        })
    } catch (error) {
        res.status(500).json({
            msg:"Something went wrong"
        })
    }
})


app.listen(3000);