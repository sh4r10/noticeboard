const router = require("express").Router();
let Notes = require("../models/note.model");

router.route('/').get((req, res) => {
    Notes.find()
        .then (notes => res.json(notes))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req,res) => {
    const heading = req.body.heading;
    const message = req.body.message;
    const manager = req.body.manager;
    newNote = new Notes({
        heading,
        message,
        manager
    })
    newNote.save()
        .then(() => res.json("Note Added Successfully!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/:id').get((req, res)=>{
    Notes.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/:id').delete((req, res)=>{
    Notes.findByIdAndDelete(req.params.id)
        .then(exercise => res.json("Note Deleted!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route("/update/:id").post((req, res)=>{
    Notes.findById(req.params.id)
        .then(note => {
            note.heading = req.body.heading;
            note.message = req.body.message;
            note.manager = req.body.manager;
            note.save()
                .then(()=>res.json("Note Updated Successfully"))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})

module.exports = router;