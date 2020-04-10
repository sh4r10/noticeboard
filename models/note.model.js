const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    heading: {type: String, required: true},
    message: {type: String, required: true},
    manager: {type:String, required: true}
},{
    timestamps: true
})

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;  