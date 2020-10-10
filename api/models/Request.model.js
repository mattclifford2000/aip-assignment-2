
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    ownerID: {
        type: Schema.Types.ObjectId,
        unique: false,
        ref: "User",
    },
    requestcontent: {
        Cupcakes: [Number],
        Muffins: [Number],
        Mints: [Number],
        Coffees: [Number],
        Chocolates: [Number],
    },
    requeststatus: {
        type: Boolean,
        unique: false,
        required: true,
    },
    requestTitle: {
        type: String,
        unique: false,
        required: true,
    },
});

module.exports = mongoose.model("Request", RequestSchema);