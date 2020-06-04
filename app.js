const express = require('express');
const jwt = require('jsonwebtoken');
const verifytoken = require('./verifytoken');
const secretKey = require('./secret');
const port = process.env.PORT || 6000;
const app = express();


app.use(express.json());




app.post('/', async (req,res) =>{
    try {
        const email = req.body.email,
        password = req.body.password;

        // signToken(email, password, res);

        jwt.sign({ email, password }, secretKey, (err, token) => {
            if (err) {
                console.log(`Oops! something went wrong trying to sign the payload, ${err}`);
            }
            // console.log(token);
            res.json({ token });
            return token;
        });
        
    } catch (err) {
        console.error(err.message);
    }
});


app.post('/login',verifytoken, async(req,res)=>{
    try {
        jwt.verify(req.token, secretKey,(err, decoded)=>{
            if(err){
                console.log(`Oops! There's an error verifying the token, ${err}`);
                res.sendStatus(403);
            }
            res.json({
                "decoded":decoded,  
                "permission": "Granted..."});
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/secured',(req,res)=>{
    res.send('Welcome to the secured page...');
});


app.listen(port, (err)=>{
    if(err){
        console.log("There was an error starting the server.", error);
    }
    console.log(`Server running on port: ${port}...`);
});

