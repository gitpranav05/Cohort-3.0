const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z} = require("zod");
const { Coursemodel, Usermodel } = require("../db");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function userSignup(req, res) {
  try {
    const required = z.object({
      email: z.string().min(5).max(30).email(),
      name: z.string().min(3).max(50),
      password: z.string()
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

    if(!parsing.success){
        return res.status(500).json({
          msg: "Invalid Credentials",
          error: parsing.error.issues[0].message,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await Usermodel.create({
      email: email,
      name: name,
      password: hashedPassword,
    });

    res.json({
      msg: "Signed Up",

    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
      
    });
  }
}

async function userSignin(req, res) {
  try {
    
    const required = z.object({
        email:z.string().min(5).max(50).email(),
        password:z.string().min(5).max(50)
        .regex(/[a-z]/,"Must contain lowercase")
        .regex(/[A-Z]/,"Must contain uppercase")
        .regex(/[0-9]/,"Must contain number")
        .regex(/[^A-Za-z0-9]/,"Must contain special character")
    })

    const parsing = required.safeParse(req.body);

    if(!parsing.success){
        return res.status(401).json({
          msg: "Invalid credentials",
          error: parsing.error.issues[0].message
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    
    const user = await Usermodel.findOne({
        email: email
    });

    if (!user) {
      return res.status(404).json({
        msg: "Incorrect credentials",
      });
    }
    
    const passMatch = await bcrypt.compare(password, user.password)

    if(passMatch){
        const userId = user._id.toString();

        const token = jwt.sign(
          {
            id: userId,
          },
          JWT_SECRET,
        );

        return res.json({
          msg: "Signed in",
          token: token,
        });
    }

    else{
        return res.status(401).json({
            msg:"Incorrect password"
        })
    }

    
    
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
}

async function userCourses(req, res) {
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

async function buyCourse(req, res) {
  try {
    const userId = req.id;
    const courseId = req.params.id;
    
    const user = await Usermodel.findById(userId);
    console.log(user);


    if(user.boughtCourses.includes(courseId)){
      return res.json({
        msg:"Course already purchased"
      })
    }

    await Usermodel.findByIdAndUpdate(
      userId,
      {$push: {
        boughtCourses:courseId
      }}
    )

    res.json({
      msg:"Course purchased successfully"
    })    
    
  } catch (error) {
    return res.json({
      msg:"Something went wrong"
    })
  }
}

async function purchasedCourses(req,res) {
  try {
    const user = await  Usermodel.findById(req.id).populate("boughtCourses");
    if(!user){
      return res.status(404).json({
        msg:"User not found"
      })
    }

    if(user.boughtCourses.length === 0){
      return res.json({
        msg:"No courses purchased yet"
      })
    }
    else{
      return res.json({
        bought:user.boughtCourses
      })
    }
  } catch (error) {
      res.status(500).json({
        msg:"Something went wrong"
      })
  }
}

module.exports = {
  userSignup,
  userSignin,
  userCourses,
  buyCourse,
  purchasedCourses,
};
