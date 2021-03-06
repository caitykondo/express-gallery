const express = require('express');
let router = express.Router();
const db = require('./../models');
const { Photo } = db;

router.route('/')
  .get((req, res) => {
    Photo.findAll()
      .then((photos) => {
        res.render('./gallery/', {photos, user: req.body.user});
    });
  });

router.route('/new')
  .post((req, res) => {
    Photo.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
      .then((photo) => res.redirect(303, `/gallery/${photo.id}`))
  })
  .get((req, res) => {
    res.render('./gallery/new', {user: req.body.user});
  });

router.route('/:id/edit')
  .get((req, res) => {
    Photo.findOne({
      where: {
        id : req.params.id
      }
    })
    .then((photo) => {
      photo.dataValues.user = req.body.user;
      res.render('./gallery/edit', photo.dataValues);
    });
  });

router.route('/:id')
  .get((req, res) => {
    Photo.findAll({
        where: {
          id : [req.params.id++, req.params.id++, req.params.id++]
        }
      })
      .then((photos) => {
        res.render('./gallery/photo', {photos, user: req.body.user});
      });
  })
  .put((req, res) => {
    Photo.findOne({
        where: {
          id : req.params.id
        }
      })
      .then((photos) => {
        photos.update({
          author: req.body.author,
          link: req.body.link,
          description: req.body.description
        });
        photos.dataValues.updated = true;
        res.render('./gallery/photo', {photos, user: req.body.user});
      });
  })
  .delete((req, res) => {
    Photo.findOne({
      where: {
        id : req.params.id
      }
    })
    .then((photo) => {
      photo.destroy({ force: true });
      res.redirect(303, '/gallery'); //add success message
    });
  });

module.exports = router;