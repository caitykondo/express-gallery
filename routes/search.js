const express = require('express');
let router = express.Router();
const db = require('./../models');
const { Photo } = db;

router.route('/')
  .get((req, res)=>{
    res.redirect(303, 'gallery');
  })
  .post((req, res)=>{
    res.redirect(303, `search/${req.body.keyword}`);
});

router.route('/:keyword')
  .get((req, res) => {
    Photo.findAll({
      where: {
        $or: [
          {
            description: {
              $like: `%${req.params.keyword}%`
            }
          },
        {
          author: {
            $like: `%${req.params.keyword}%`
          }
        }
      ]
    }
    }).then((photos)=> {
      res.render('./search', { photos });
  });
});

module.exports = router;
