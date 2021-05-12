const router = require("express").Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
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
                const data = {
                    id: manager._id,
                    fullName: manager.fullName,
                    email: manager.email,
                    role: manager.role
                }
                const accessToken = jwt.sign(data, process.env.JWT_TOKEN, {expiresIn: "120s"})
                res.json({accessToken: accessToken})
            }
        }
    });
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_TOKEN, ((err, data) =>{
        if(err) return res.sendStatus(403);
        req.data = data;
        next();
    }));
}

module.exports = {
    router: router,
    authenticateToken: authenticateToken
};