const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { Adminmodel, Coursemodel } = require("../db");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function adminSignup(req, res) {
  try {
    const required = z.object({
      email: z.string().min(5).max(30).email(),
      name: z.string().min(3).max(50),
      password: z
        .string()
        .min(5)
        .max(30)
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
    });

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const parsing = required.safeParse(req.body);

    if (!parsing.success) {
      return res.status(500).json({
        msg: "Invalid Credentials",
        error: parsing.error.issues[0].message,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Adminmodel.create({
      email: email,
      name: name,
      password: hashedPassword,
    });

    res.json({
      msg: "Signed Up as Admin",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
}

async function adminSignin(req, res) {
  try {
    const required = z.object({
      email: z.string().min(5).max(50).email(),
      password: z
        .string()
        .min(5)
        .max(50)
        .regex(/[a-z]/, "Must contain lowercase")
        .regex(/[A-Z]/, "Must contain uppercase")
        .regex(/[0-9]/, "Must contain number")
        .regex(/[^A-Za-z0-9]/, "Must contain special character"),
    });

    const parsing = required.safeParse(req.body);

    if (!parsing.success) {
      return res.status(401).json({
        msg: "Invalid credentials",
        error: parsing.error.issues[0].message,
      });
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await Adminmodel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        msg: "Incorrect credentials",
      });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (passMatch) {
      const userId = user._id;
      const token = jwt.sign(
        {
          id: userId,
          role: "admin"
        },
        JWT_SECRET,
      );
      return res.json({
        msg: "Signed in as admin",
        token: token,
      });
    } else {
      return res.status(401).json({
        msg: "Incorrect password",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      msg: "asd went wrong",
      error: error,
    });
  }
}

async function postCourses(req, res) {
  try {
    const required = z.object({
      title: z.string().min(3).max(50),
      price: z.coerce.number(),
      imageLink: z.string().url(),
    });

    const parsing = required.safeParse(req.body);
    if (!parsing.success) {
      return res.status(401).json({
        msg: "Enter valid data",
      });
    }
    const title = req.body.title;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const course = await Coursemodel.create({
      title: title,
      price: price,
      imageLink: imageLink,
    });

    return res.json({
      msg: "Course posted successfully",
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error,
    });
  }
}

async function viewCourse(req, res) {
  try {
    const courses = await Coursemodel.find();

    res.json({
      courses: courses,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error,
    });
  }
}

module.exports = {
  adminSignup,
  adminSignin,
  postCourses,
  viewCourse,
};
