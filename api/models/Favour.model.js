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
  favourname: {
    type: String,
    unique: false,
    required: true,
  },
  favourcontent: {
    type: String,
    unique: false,
    required: true,
  },
  favourcompleted: {
    type: Boolean,
    unique: false,
    required: true,
  },
});

module.exports = mongoose.model("Favour", FavourSchema);
