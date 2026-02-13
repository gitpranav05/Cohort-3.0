const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const JWT_SECRET="pranav2003";

const app = express();
app.use(cors())

app.use(express.json());

let users = [];
let todosarr = [];

function auth(req,res,next){
    const token = req.headers.token;
    const dec = jwt.verify(token,JWT_SECRET);

    if(dec.un){
        req.un=dec.un;
        next();
    }
    // console.log("header done");
}

app.post("/signup", (req,res)=>{
    const un = req.body.un;
    const ps = req.body.ps;

    if(un && ps){

        users.push({
            un:un,
            ps:ps
        })
        
        res.send({
            msg:"Signed up"
        })
        // console.log(users);
    }
    else{
        res.status(404).send({
            msg:"Invalid Credentials"
        })
    }
        
})

app.post("/signin", (req,res)=>{
    const un = req.body.un;
    const ps = req.body.ps;

    const user = users.find(u=>u.un===un && u.ps===ps)
  
    if(user){
        const token = jwt.sign({
            un: un,
          },
          JWT_SECRET,
        );

        user.token=token
    
        res.json({
            msg:token
        })
    }
})

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
});

app.get("/me", auth, (req,res)=>{
    const todos = todosarr.filter(t=>t.un===req.un)
    res.json({
      msg: req.un,
      todos : todos
    });
})

app.post("/todos", auth, (req,res)=>{
    const task = req.body.task;
    const un = req.un;

      const newTodo = {
      id: Date.now(),
      task: task,
      un: un,
    };

    todosarr.push(newTodo)

    res.json({
        msg:"Todo Added",
        todo: newTodo
    })
})

app.delete("/todos/:id", auth, (req,res)=>{
    const ind = Number(req.params.id);

    todosarr = todosarr.filter(t=> !(t.id===ind && t.un===req.un));

    res.json({
        msg:"Todo deleted"
    })

})

app.listen(3000);