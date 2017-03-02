const express = require('express');
let router = express.Router();
const db = require('./../models');
const { Photo } = db;

router.route('/')
  .post((req, res)=>{
    Photo.findAll({
      where: {
        description: {
          $like: `%${req.body.keyword}%`
        }
      }
    })
      .then((photos)=> {
        res.render('./search', {photos});
    });
  });
module.exports = router;
