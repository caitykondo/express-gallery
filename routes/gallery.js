const express = require('express');
let router = express.Router();

const db = require('./../models');
const { Photo } = db;

router.route('/')
  .get((req, res) => {
    Photo.findAll()
      .then((photos) => res.render('./gallery/', {photos}));
  });

router.route('/new')
  .get((req, res) => {
    res.render('./gallery/new');
  })
  .post((req, res) => {
    Photo.create({author: req.body.author, link: req.body.link, description: req.body.description })
      .then((photo) => res.redirect(`/gallery/${photo.id}`));
  });

router.route('/:id')
  .get((req, res) => {
    Photo.findOne({where: {id : req.params.id}})
      .then((photo) => res.render('./gallery/photo', photo.dataValues));
  });

module.exports = router;