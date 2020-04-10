const router = require("express").Router();
const crypto = require("crypto");
require("dotenv").config();
const secret = process.env.SECRET ;
let Manager = require("../models/manager.model");

router.route('/').get((req, res) => {
    Manager.find()
        .then (users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password= crypto.createHmac("sha256", secret)
        .update(req.body.password)
        .digest("hex");
    const role = req.body.role;
    const newManager = new Manager({
        fullName,
        email,
        password,
        role,
    })
    newManager.save()
        .then(()=>res.json("New Manager Added"))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


module.exports = router;