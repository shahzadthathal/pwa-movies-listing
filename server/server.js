const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 5000;

const morgan = require('morgan');


const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(express.static(publicPath));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Node.js middleware for logging HTTP requests.
//app.use(morgan('dev'));


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
