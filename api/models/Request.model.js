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
  chocolates: Number,
  muffins: Number
});

module.exports = mongoose.model("Request", RequestSchema);

