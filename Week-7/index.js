const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { Usermodel, Todomodel } = require("./db");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const { JWT_SECRET, MONGO_URL, auth } = require("./auth");

const app = express();
app.use(cors());
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected");

    app.listen(3000, () => {
      console.log("Server running on 3000");
    });
  })
  .catch((err) => {
    console.log("Error:" + err);
  });

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const required = z.object({
      email: z.string().min(5).max(100).email(),
      password: z
        .string()
        .min(3)
        .max(100)
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
      name: z.string().min(3).max(30),
    });

    const parsing = required.safeParse(req.body);

    if (!parsing.success) {
      return res.json({
        msg: "Invalid Credentials",
        error:  parsing.error.issues[0].message
,
      });
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPass = await bcrypt.hash(password, 5);

    await Usermodel.create({
      name: name,
      password: hashedPass,
      email: email,
    });

    res.json({
      msg: "You are signed up",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Email already signed up",
    });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const required = z.object({
      email: z.string().min(5).max(50).email(),
      password: z
        .string()
        .min(3)
        .max(30)
        .regex(/[a-z]/, "Must contain lowercase letters")
        .regex(/[A-Z]/, "Must contain uppercase letters")
        .regex(/[0-9]/, "Must contain numbers")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
    });

    const parsing = required.safeParse(req.body);

    if(!parsing.success){
      return res.json({
        msg:"Invalid Credentials",
        error:parsing.error.issues[0].message
      })
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await Usermodel.findOne({
      email: email,
    });

    const passMatch = await bcrypt.compare(password, user.password);

    if (passMatch) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
        },
        JWT_SECRET,
      );

      res.json({
        token: token,
      });
    } else {
      return res.status(500).json({
        msg: "Incorrect credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  try {
    const check = z.object({
      title: z.string().min(2)
    })

    const parsing = check.safeParse(req.body);

    if(!parsing.success){
      return res.json({
        msg: "Invalid Credentials",
        error: parsing.error.issues[0].message
      });
    }

    const title = req.body.title;
    const userId = req.userId;
    const done = req.body.done;

    await Todomodel.create({
      title: title,
      userId: userId,
      done: done,
    });
    res.json({
      msg: "Done!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
});

app.get("/todos", auth, async (req, res) => {
  try {
    const todos = await Todomodel.find({
      userId: req.userId,
    });

    res.json({
      todos: todos,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
});

app.delete("/delete/:id", auth, async (req, res) => {
  try {
    const deleted = await Todomodel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({
        msg: "Not allowed",
      });
    }

    res.json({
      msg: deleted,
      asd: "asdasd",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
});

app.delete("/deleteall", auth, async (req, res) => {
  try {
    const deleted = await Todomodel.deleteMany({
      userId: req.userId,
    });

    if (deleted) {
      res.json({
        msg: "Deleted all",
        deletedCount: deleted.deletedCount,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

app.put("/edit/:id", auth, async (req, res) => {
  const id = req.params.id;
  const task = req.body.task;
  const resp = await Todomodel.findOneAndUpdate(
    { _id: id, userId: req.userId.toString() },
    { title: task },
  );

  if (!resp) {
    return res.status(404).json({
      msg: "Todo not found",
    });
  }

  res.json({
    msg: "Done",
    todo: resp,
  });
});
