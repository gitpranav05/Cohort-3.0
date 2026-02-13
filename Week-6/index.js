const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "iloveaastha"
const app = express();
app.use(express.json());
app.use(cors());


const users = [];

// function generateToken() {

//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//     let token = "";

//     for(let i=0; i<32; i++){
//         token += options[Math.floor(Math.random()*62)]
//     }
//     // console.log(token);
//     return token;
// }

function auth(req,res,next) {
    const token = req.headers.token;
    const dec = jwt.verify( token, JWT_SECRET )
    console.log(dec.un);

    if(dec.un){
        req.un=dec.un;  
        next()
    }
    else{
        res.status(404).send({
             msg:"Not logged in"
        })
    }
}

function logger(req,res,next) {
    console.log(`The request type is ${req.method}`);
    next();
}

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/signup",logger,(req,res)=>{
    const un = req.body.un;
    const ps = req.body.ps;

    users.push({
        un:un,
        ps:ps
    })

    res.json({
        message:"You are signed up!"
    })
    console.log(un);
})

app.post("/signin",logger,(req, res) => {
    const un = req.body.un;
    const ps = req.body.ps;

    const user = users.find(u=>u.un===un && u.ps===ps);

    if(user){
        const token = jwt.sign({
            un:un
        }, JWT_SECRET);
        // user.token = token;
        
        res.json({
            token
        })
    }
    else{
        res.status(403).send({
            msg:"Invalid un or ps"
        })
    }
});


app.get("/me", logger,auth, (req, res) => {
  const token = req.headers.token;
  // const decodedInformation = jwt.verify(token, JWT_SECRET)

  const un = req.un;

  let user = users.find((u) => u.un === un);

  if (user) {
    res.json({
      un: un,
      ps: user.ps,
    });
  } else {
    res.status(404).send({
      msg: "Not found",
    });
  }
});


app.listen(3000);

