const router = require("express").Router();
const crypto = require("crypto");
require("dotenv").config();
const secret = process.env.SECRET ;
let Manager = require("../models/manager.model");

router.route("/").post((req, res) => {
    Manager.findOne({"email": req.body.email}, (err, manager)=>{
        if(manager == null){
            res.json("No User");
        }
        else{
            const enteredPwd = crypto.createHmac("sha256", secret)
                .update(req.body.password)
                .digest("hex");
            if(enteredPwd !== manager.password){
                res.json("Wrong Password")
            } else{
                res.json("Success")
            }
        }
    });
})

module.exports = router;