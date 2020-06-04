const jwt = require('jsonwebtoken');
// const express = require('express');


const verifyToken = (req,res, next)=>{
    //TOKEN FORMAT
    //Authorization: Bearer <access_token>
    try {
        //Get the auth header value
    const bearerHeader = req.headers['authorization'];

    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //Get Token from array
        const bearerToken = bearer[1];
        //Set the Token
        req.token = bearerToken;
        //call the next middleware
        next();
    }else{
        //Forbidden
        res.sendStatus(403);
    }
    
        
    } catch (err) {
        console.error(err.message);
        
    }

}

module.exports = verifyToken;