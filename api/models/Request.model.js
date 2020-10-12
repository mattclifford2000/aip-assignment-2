
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    ownerID: {
        type: String,
        unique: false,
        required: false
    },

    cupcakes: {
        type: Number,
        unique: false,
        required: false,
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


    coffees: {
        type: Number,
        unique: false,
        required: false,
    },

    icecreams: {
        type: Number,
        unique: false,
        required: false,
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


/*     ownerID: {
        type: Schema.Types.ObjectId,
        unique: false,
        ref: "User",
    },

    */