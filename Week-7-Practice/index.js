const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {auth} = require("./auth");
const { userSignup, userSignin, userCourses, buyCourse, purchasedCourses } = require("./routes/userRoutes.js");
const { adminSignup, adminSignin, viewCourse, postCourses } = require("./routes/adminRoutes.js");
const { adminAuth } = require("./adminAuth.js");

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server hosted on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error:" + err);
  });

app.post("/user/signup", userSignup);

app.post("/user/signin", userSignin)

app.get("/user/courses",auth, userCourses)

app.post("/user/courses/:id",auth, buyCourse);

app.get("/user/purchasedCourses", auth, purchasedCourses);

app.post("/admin/signup", adminSignup);

app.post("/admin/signin", adminSignin);

app.get("/admin/courses", adminAuth, viewCourse);

app.post("/admin/courses", adminAuth, postCourses);

