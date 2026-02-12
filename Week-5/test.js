const express = require('express');
const cors = require('cors');
const app = express();

app.use(
  cors(
//     {
//     domains: ["http://192.168.1.3:3000/"],
//   }
),
);

app.use(express.json())

app.post("/sum", (req,res)=>{
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        answer:a+b
    })
})

app.listen(3001)