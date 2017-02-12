const express = require('express');
let router = express.Router();

router.route('/')
  .get((req, res)=> {
    res.send('working');
  });

module.exports = router;