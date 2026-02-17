const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, unique: true, required: true },
  name: String,
  password: String,
  boughtCourses: [{
    type:Schema.Types.ObjectId,
    ref:"courses"
    }]
});

const Admin = new Schema({
  email: { type: String, unique: true, required: true },
  name: String,
  password: String,
});

const Courses = new Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  imageLink: { type: String, required: true },
});

const Usermodel = mongoose.model("users", User);
const Adminmodel = mongoose.model("admin", Admin);
const Coursemodel = mongoose.model("courses", Courses);

module.exports = {
  Usermodel: Usermodel,
  Coursemodel: Coursemodel,
  Adminmodel: Adminmodel
};
