import { Schema, model } from "mongoose";
import Validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const { hash, compare } = bcryptjs;
const { isEmail } = Validator;
const { sign } = jwt;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email address"],
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please enter your password"],
    minLength: [8, "Password must be at least 8 characters long."],
  },
});


// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hash(this.password, 10);
  next();
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

// Generate token
userSchema.methods.getJWTToken = function () {
  return sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export default model("User", userSchema);
