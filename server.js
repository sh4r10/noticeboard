const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const conn = mongoose.connection;
conn.once("open", ()=>{
    console.log("Database Connection Established!")
})

const notesRoute = require("./routes/notes");
const managersRoute = require("./routes/managers");
const loginRoute = require("./routes/login");

app.use('/notes', notesRoute);
app.use('/managers', managersRoute);
app.use("/login", loginRoute);

app.listen(port, () => console.log(`Server is running on Port ${port}`));