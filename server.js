const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Subscribers = require("./models/subscription.model");
const webpush = require("web-push");

const payload = JSON.stringify({title: "heallo meat head"});
Subscribers.find({} , (err, subs) => {
    subs.forEach(sub => {
        webpush.sendNotification(sub, payload);
    })
})

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("https://munob.netlify.com"));

app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const conn = mongoose.connection;
conn.once("open", ()=>{
    console.log("Database Connection Established!")
})

const notesRoute = require("./routes/notes");
// const managersRoute = require("./routes/managers");
const loginRoute = require("./routes/login");
const subscribeRoute = require("./routes/subscribe");

app.use('/notes', notesRoute);
// app.use('/managers', managersRoute);
app.use("/login", loginRoute.router);
app.use("/subscribe", subscribeRoute)

app.listen(port, () => console.log(`Server is running on Port ${port}`));