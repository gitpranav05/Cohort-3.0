const express = require('express');

const app = express();

let reqCnt=0;

app.use(mid)

function mid(req,res,next){
    reqCnt++;
    console.log(reqCnt);
    next();
}

function sum(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans:a+b,
    })
}

app.get("/sum",  sum);
app.listen(3000)