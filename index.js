const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

const secret_key = "I am secret";

app.get('/', (req, res) => {
    res.json({
        message : "a sample api"
    })
})

app.post('/login', (req, res) => {
    console.log(req.body);
    const user = req.body;
    jwt.sign({user}, secret_key, { expiresIn: '300s'}, (err, token) => {
        res.json({
            token
        })
    })
});


app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, secret_key, (err, authData) => {
        if(err)
            res.send({result: "invalid token"})
        else {
            res.json({
                message: "profile accessed",
                authData
            })
        }
    })
});
 
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log("token received = ", bearerHeader)
    if( typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token
        next();
    }
    else {
        res.send({
            result: 'Token is invalid'
        })
    }
}

app.listen(3300, (req, res) => {
    console.log("node running");
});

