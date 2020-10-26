const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RequestSchema = new Schema({

  ownerID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  ownerName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },

  //rewards
  chocolates: {
    type: Number,
    required: false
  },
  mints: {
    type: Number,
    required: false
  },
  pizzas: {
    type: Number,
    required: false
  },
  coffees: {
    type: Number,
    required: false
  },
  candies: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model("Request", RequestSchema);

