const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({
    extended: false
});
const jsonParser = bodyParser.json();

const path = require('path');

const cors = require('cors');
app.use(urlEncodedParser);
app.use(jsonParser);
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*, content-type');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});
app.use(express.static(path.join(__dirname, "../public")));

const jilbab = require('../model/jilbab');
const user = require('../model/user');

app.get('/api/jilbab', (req, res, next) => {
    jilbab.getJilbab((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.get('/api/jilbab/:id', (req, res, next) => {
    const id = req.params.id;
    jilbab.getJilbabId(id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(result[0]);
    });
});

app.post('/api/jilbab/', (req, res, next) => {
    const {
        product_name,
        code,
        colour,
        quantity,
        address,
        user_id
    } = req.body;
    jilbab.addJilbab(product_name, code, colour, quantity, address, user_id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.put('/api/jilbab/:id', (req, res, next) => {
    const { id } = req.params;
    const {
        product_name,
        colour,
        quantity,
        address,
        user_id
    } = req.body;
    jilbab.updateJilbab(id, product_name, colour, quantity, address, user_id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.delete('/api/jilbab/:id', (req, res, next) => {
    const { id } = req.params;
    jilbab.deleteJilbab(id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.get('/api/user', (req, res, next) => {
    user.getUser((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.post('/api/user/create-account', (req, res, next) => {
    const {
        nama,
        email,
        password
    } = req.body;
    user.addUser(nama, email, password, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});

app.post('/api/user/login', (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    user.loginUser(email, password, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.status(200).send(result[0]);
    });
});

module.exports = app;
