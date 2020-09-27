const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");

const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 5000;


const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
// Initiate Mongo Server
InitiateMongoServer();

const app = express();

app.use(express.static(publicPath));

//Middleware
app.use(bodyParser.json());

// app.get('/api/*', (req, res) => {
//    res.json({ message: "API Working" });
// });

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/api/user", user);

app.get('/*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
   console.log('Server is up at port: '+port);
});
