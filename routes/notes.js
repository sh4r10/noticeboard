const router = require("express").Router();
const login = require("./login")
const Notes = require("../models/note.model");
const Subscribers = require("../models/subscription.model");
const webpush = require("web-push");

router.get('/', (req, res) => {
    Notes.find()
        .then (notes => res.json(notes))
        .catch(err => res.sendStatus(400));
});

router.post('/add', login.authenticateToken, (req,res) => {
    const heading = req.body.heading;
    const message = req.body.message;
    const manager = req.data.fullName;

    const payload = JSON.stringify({title: "heallo meat head"});

    Subscribers.find({} , (err, subs) => {
        subs.forEach(sub => {
            webpush.sendNotification(sub, payload);
        })
    })

    newNote = new Notes({
        heading,
        message,
        manager
    })

    newNote.save()
        .then(() => res.json(newNote))
        .catch(err => res.sendStatus(400));
})

router.get('/:id', (req, res)=>{
    Notes.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.sendStatus(400));
})

router.delete('/:id', login.authenticateToken, (req, res)=>{
    Notes.findByIdAndDelete(req.params.id)
        .then(note => res.json("Note Deleted!"))
        .catch(err => res.sendStatus(400));
})

router.post("/update/:id", login.authenticateToken, (req, res)=>{
    Notes.findById(req.params.id)
        .then(note => {
            note.heading = req.body.heading;
            note.message = req.body.message;
            note.manager = req.data.fullName;
            note.save()
                .then(()=>res.json("Note Updated Successfully"))
                .catch(err => res.sendStatus(400));
        })
        .catch(err => res.sendStatus(400));
})

module.exports = router;