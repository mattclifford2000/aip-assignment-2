const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userEmail: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  UserName: {
    type: String,
    unique: false,
    required: true,
    min: 6,
    max: 36,
  },
  userPassword: {
    type: String,
    unique: false,
    required: true,
    min: 8,
    max: 1024,
  },
  userRole: {
    type: String,
    unique: false,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  userScore: {
    type: Number,
    unique: false,
    default: 0,
    required: true,
    min: 0,
    max: 99999,
  },
  userDOB: {
    type: Date,
    default: Date.now(),
    unique: false,
    required: true,
  },
  userDebits: {
    type: Array,
    default: [],
    required: true,
    unique: false,
  },
  userCredits: {
    type: Array,
    default: [],
    required: true,
    unique: false,
  },
  userFavours: {
    type: Array,
    default: [],
    required: true,
    unique: false,
  }
});

module.exports = mongoose.model('User', UserSchema);
