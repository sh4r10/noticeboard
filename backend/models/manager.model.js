const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, trim:true, unique:true},
    password: {type: String, required: true, trim:true},
    role: {type:String, required: true, default: "Standard"}
})

const Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;  