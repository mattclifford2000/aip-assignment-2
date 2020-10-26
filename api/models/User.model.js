const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true,
    min: 6,
    max: 36,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    unique: false,
    required: true,
    min: 8,
    max: 1024,
  },
  dateofbirth: {
    type: Date,
    default: Date.now(),
    unique: false,
    required: true,
  },
  role: {
    type: String,
    unique: false,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  score: {
    type: Number,
    unique: false,
    default: 0,
    required: true,
    min: 0,
    max: 99999,
  },
  debits: {
    type: Number,
    unique: false,
    default: 0,
    required: true,
    min: 0,
    max: 99999,
  },
  credits: {
    type: Number,
    unique: false,
    default: 0,
    required: true,
    min: 0,
    max: 99999,
  },
  requests: {
    type: Array,
    default: [],
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
