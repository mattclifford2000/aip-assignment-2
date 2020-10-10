const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    requestID: {
        type: Number,
        unique: true
    },
    ownerID: {
        type: String
    },
    requestContent: {
        type: Object
    },
    requestStatus: {
        type: Boolean,
        unique: false,
        required: true,
    },
});

module.exports = mongoose.model("Request", RequestSchema);