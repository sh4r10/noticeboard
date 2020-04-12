const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subSchema = new Schema({
    auth: String,
    p256dh: String
})

const subscription = new Schema({
    endpoint: String,
    keys: subSchema
})

const Subscription = mongoose.model("Subscription", subscription);
module.exports = Subscription;  