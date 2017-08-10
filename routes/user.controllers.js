const express = require('express');
const connection = require('../config');
const user = require('./userschema');
let response = {
    success:false,
    msg    :'',
    params :{}
}
exports.login = (req, res, next) => {
 console.log("users1");
 
 if(req.body.name===''||req.body.password===''||req.body.password===undefined||req.body.name===undefined){
    
     response.msg = "username or password must be defined";
      res.json(response);
 } else {
      user.find({ name: req.body.name }, function(err, users) {
       console.log("users3");
      
      
    if (err) {
      response.msg = err;
       res.json(err);
    } else {
      if (users.length > 0) {
        console.log("user", users);
        if (users[0].password === req.body.password) {
          response.success = true;
          response.msg = "successfully login";
          response.params = users[0];
        } else {
          response.msg = "password mismatch";
        }
        res.json(response);
      } else {
        response.msg = "No user exist";
        res.json(response);
      }
    }
  });

 }

};

