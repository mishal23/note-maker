var Note = require('../models/notes');
var express = require('express');
var userMiddleWare = require("../middlewares/userMiddleware");
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

// to get all the notes
// in frontend we will check for the particular user and display only that notes
router.get('/:id', function (req,res,next) {
    var id = req.params.id;
    Note.find({createdBy: id},function(err,notes){
        if(err)
            res.send(err);
        else
        {
            res.send(notes);
        }
    })
});

// to edit a particular note
router.put('/:id', function (req,res,next) {
    objectId=req.params.id;
    changes=req.body;
    response={};
    Note.findByIdAndUpdate(objectId,changes,{new: true},function(err){
        if(err)
            response.error=err;
        else
            response.status="Object modified";
        res.send(response);
    });
});

// to delete a particular note
router.delete('/:id', function (req,res,next) {
       Note.remove({
            _id: req.params.id
        }, function(err, Note) {
            if (err)
                res.send(err);
            else
                res.json({ message: 'Successfully deleted' });
        });

});

module.exports = router;
