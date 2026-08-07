import express from "express";
import { auth } from "./auth";

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {
  //signup
  //end
});

app.post("/signin", (req, res) => {
  //
});

app.post("/create-room",auth, (req, res) => {
  //
});

app.listen(3001);


 