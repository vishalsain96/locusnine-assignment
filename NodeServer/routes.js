import express from 'express';
import { dataService } from './service.js';

var users = require("./service");

// const bodyParser = require('body-parser')
const router = express.Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/getUsers', function (error, res) {
    dataService.getUsers(function (error, result) {
        return res.send(result);
    });
});

router.post('/insertUser',  function (req, res, next) {
    dataService.insertUser(req.body, function (error, result) {
        return res.send(result);
    });
});

router.put('/updateUser', function (req, res, next) {
    dataService.updateUser(req.body ,function (error, result) {
        return res.send(result);
    });
});

router.delete('/deleteUser/:sno', function (req, res, next) {
    dataService.deleteUser(req.params.sno,function (error, result) {
        return res.send(result);
    });
});

export default router;