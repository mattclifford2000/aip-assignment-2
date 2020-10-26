const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavourSchema = new Schema({
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
  debitorID: {
    type: Schema.Types.ObjectId,
    unique: false,
    ref: "User",
  },
  debitorName: {
    type: String,
    unique: false,
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
  completed: {
    type: Boolean,
    unique: false,
    required: true,
  },
  imageURL: {
    type: String,
  },


  //rewards
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
