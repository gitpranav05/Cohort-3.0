const express = require("express");
const app = express();


const users = [
    {
        name:"John",
        kidneys:[
            {
                healthy:false
            }
        ]
    }
];
app.use(express.json())

app.get("/", (req,res)=>{
    const Kidneys = users[0].kidneys
    const totalKidneys = Kidneys.length;
    let healthyKidneys=0;
    for(let i=0; i<totalKidneys; i++){
        if(Kidneys[i].healthy){
            healthyKidneys++;
        }
    }
    let unHealthyKidneys = totalKidneys-healthyKidneys;
    res.json({
        totalKidneys,
        healthyKidneys,
        unHealthyKidneys
    })
})

app.post("/",(req,res)=>{
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    })
    res.json({
        msg:"Done"
    })
})

app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
});


app.delete("/", (req,res)=>{
    if(found()){

    }
    else{
        res.status(411).json({
            msg:"No bad kidneys"
        })
    }
})

function found(){
    let f=false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if(!  users[0].kidneys[i].healthy){
        f=true;
        break;
      }
    }
    return f;
}
app.listen(3000);