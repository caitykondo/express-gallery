const express = require('express');
let router = express.Router();

router.route('/')
  .get(isAuthenticated, ( req, res ) => {
    res.send('secrets');
  });

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    next();
  }else{
    console.log('not authenticated');
    res.redirect('/login');
  }
}

module.exports = router;