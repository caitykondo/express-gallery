const express = require('express');
let router = express.Router();
const db = require('./../models');
const { Photo } = db;

router.route('/')
  .get((req, res)=>{
    console.log('SEARCHHHH ');
  });
module.exports = router;
