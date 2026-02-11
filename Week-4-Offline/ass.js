const express = require("express");
const fs = require("fs")

const app = express();

app.use(express.json());


app.get("/files", (req,res)=>{
    fs.readdir("./files", (err, files) => {
      if (err) {
        res.status(500).json({error:err});
      } else {
        res.status(200).json(
          files,
        );
      }
    });
})

app.get("/files/:name", (req, res) => {
  const name = req.params.name;
  fs.readFile(`./files/${name}`, "utf-8", (err,data)=>{
    if (err) {
      res.status(500).json(err );
    } else {
      res.status(200).json(data);
    }
  })
});

app.listen(3000);