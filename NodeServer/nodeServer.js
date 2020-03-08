import router from "./routes.js";
import connectionObject from './dbConnection.js';

//Load HTTP module
const http = require("http");
const hostname = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

connectionObject.createTable();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use('/', router)

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, () => {
    console.log(`Server running`);
});