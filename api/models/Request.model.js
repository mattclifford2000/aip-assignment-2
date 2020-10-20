const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RequestSchema = new Schema({

  ownerID: {
    type: Schema.Types.ObjectId,
    unique: false,
    ref: "User",
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
  rewards: {
    type: Array,
    unique: false,
    required: false,
    //ref: "Reward",
  }
});

module.exports = mongoose.model("Request", RequestSchema);

