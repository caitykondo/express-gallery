const express = require('express');
let router = express.Router();
// const isAuthenticated = require('./helpers/isAuthenticated');

router.route('/')
  .get(( req, res ) => {
    res.send('secrets');
  });

module.exports = router;