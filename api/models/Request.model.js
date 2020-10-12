const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  ownerID: {
    type: Schema.Types.ObjectId,
    unique: false,
    ref: "User",
  },
  requestcontent: {
    type: String,
    unique: false,
    required: true,
  },
  requeststatus: {
    type: Boolean,
    unique: false,
    required: true,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
