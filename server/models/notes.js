var mongoose = require("mongoose");
var User = require("./user.js");

var Schema = mongoose.Schema;

var noteSchema = new Schema ( {
    title: {type: String, required: true},
    content: {type: String, required: true},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    date : {type: Date, required: true},
    done: {type: Boolean, required : true}
});

var Note = mongoose.model('Note', noteSchema);
module.exports = Note;
