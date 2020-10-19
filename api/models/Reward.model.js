const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RewardSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  content: {
    type: String,
    unique: false,
    required: true,
  }
});

module.exports = mongoose.model("Reward", RewardSchema);

