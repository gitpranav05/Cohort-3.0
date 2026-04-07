import mongoose, { model, Schema } from "mongoose";

const Userschema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const UserModel = model("users", Userschema);

const Tagschema = new Schema({
  title: { type: String, required: true },
});

export const TagModel = model("tags", Tagschema);

const Contentschema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "tags" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const ContentModel = model("content", Contentschema);

const Linkschema = new Schema({
  hash: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const LinkModel = model("links", Linkschema);
