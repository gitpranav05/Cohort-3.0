import express from "express";
import { auth } from "./auth";

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
  //jwt signing 
  //db entry
  //pass salting
});

app.post("/signin", (req, res) => {
  //
});

app.post("/create-room",auth, (req, res) => {
  //
});

app.listen(3001);


 