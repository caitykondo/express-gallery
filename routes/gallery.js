const express = require('express');
let router = express.Router();

const db = require('./../models');
const { Photo } = db;

const isAuthenticated = require('./../helpers/isAuthenticated');


router.route('/')
  .get((req, res) => {
    Photo.findAll()
      .then((photos) => res.render('./gallery/', {photos}));
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
  .get(isAuthenticated, (req, res) => {
    res.render('./gallery/new');
  });

router.route('/:id/edit')
  .get( (req, res) => {
    Photo.findOne({
      where: {
        id : req.params.id
      }
    })
    .then((photo) => res.render('./gallery/edit', photo.dataValues))
  });

router.route('/:id')
  .get((req, res) => {
    Photo.findAll({
        where: {
          id : [req.params.id++, req.params.id++, req.params.id++]
        }
      })
      .then((photos) => {
        res.render('./gallery/photo', {photos});
      });
  })
  .put(isAuthenticated, (req, res) => {
    Photo.findOne({
        where: {
          id : req.params.id
        }
      })
      .then((photo) => {
        photo.update({
          author: req.body.author,
          link: req.body.link,
          description: req.body.description
        });
        photo.dataValues.updated = true;
        res.render('./gallery/photo', photo.dataValues);
      });
  })
  .delete( isAuthenticated, (req, res) => {
    console.log('hit');
    Photo.findOne({
      where: {
        id : req.params.id
      }
    })
    .then((photo) => {
      console.log('hello');
      return photo.destroy({ force: true });
    })
    .then(()=>{
      console.log('done');
      res.redirect(303, '/gallery'); //add success message
    });
  });

module.exports = router;