const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

const secret_key = "I am secret";
app.get('/', (req, res) => {
    res.json({
        message : "a sample api"
    })
})

app.post('/login', (req, res) => {
    const user ={
        id: 1,
        username: "manu"
    };
    jwt.sign({user}, secret_key, { expiresIn: '300s'}, (err, token) => {
        res.json({
            token
        })
    })
});

app.listen(3300, (req, res) => {
    console.log("node running");
});

