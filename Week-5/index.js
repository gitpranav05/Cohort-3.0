// async function posr() {
//   const resp = await fetch("https://jsonplaceholder.typicode.com/todos/2");
//   const data = await resp.json();
//   console.log(data);
// }

// posr();

const express = require("express")

const app = express();
app.use(express.json());

app.get("/multiply", (req,res)=>{
    const a = req.query.a;    
    const b = req.query.b; 
    res.json(a*b);   
})

app.get("/sum", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  res.json(a + b);
});

app.get("/divide", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  res.json(a / b);
});

app.get("/subtract", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  res.json(a - b);
});

app.listen(3001);
