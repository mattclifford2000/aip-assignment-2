const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavourSchema = new Schema({
  debitorID: {
    type: Schema.Types.ObjectId,
    unique: false,
    ref: "User",
  },
  creditorID: {
    type: Schema.Types.ObjectId,
    unique: false,
    ref: "User",
  },
  creditorName: {
    type: String,
    unique: false,
  },
  debitorName: {
    type: String,
    unique: false,
  },
  name: {
    type: String,
    unique: false,
    required: true,
  },
  content: {
    type: String,
    unique: false,
    required: true,
  },
  completed: {
    type: Boolean,
    unique: false,
    required: true,
  },
  imageURL: {
    type: String,
  },
  chocolates: {
    type: Number,
    unique: false,
    required: false,
  },
  mints: {
    type: Number,
    unique: false,
    required: false,
  },
  pizzas: {
    type: Number,
    unique: false,
    required: false,
  },
  coffees: {
    type: Number,
    unique: false,
    required: false,
  },
  candies: {
    type: Number,
    unique: false,
    required: false,
  },

});

module.exports = mongoose.model("Favour", FavourSchema);
