var Note = require('../models/notes');
var express = require('express');
var router = express.Router();

// to create note
router.post('/', function (req,res, next) {
    var response = {};
    var noteContent = req.body;
    var newNote = new Note(noteContent);
    newNote.save(function (err,user) {
        if(err)  {
            response.error = err;
        }
        else{
            response.status = "Note created";
        }
        res.send(response);
    });
});

module.exports = router;
