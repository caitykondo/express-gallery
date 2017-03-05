const express = require('express');
let router = express.Router();
const db = require('./../models');
const { Photo } = db;
const checkIfLastPhoto = require('./../helpers/checkIfLastPhoto');
const redis = require('redis');
client = redis.createClient();

client.on('connect', () =>{
  console.log('\nconnected to redis');
});
// store available photos in redis

router.route('/')
  .get((req, res) => {
    Photo.findAll()
      .then((photos) => {
        // photos.forEach((photo)=>{
        //   client.hmset(photo.id, photo.author, photo.description, photo.createdAt, photo.updatedAt);
        //   console.log(photo.id);
        // });
        res.render('./gallery/', {photos, user: req.body.user});
    });
  });

router.route('/new')
  .post((req, res) => {
    if(req.body.link  && req.body.description){
      Photo.create({
        author: req.body.user,
        description: req.body.description,
        link: req.body.link
      })
        .then((photo) => res.redirect(303, `/gallery/${photo.id}`));
    }else{
      res.render('./gallery/new', {error: true});
    }
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
    // let id = checkIfLastPhoto(req.params.id);
    // console.log("CHECK HERE", id, checkIfLastPhoto(), req.params.id);
    if(checkIfLastPhoto() !== req.params.id){
      Photo.findAll({
          where: {
            $and: {
              id: {
                $gte: req.params.id
              },
              link: {
                $ne: null
              }
            }
          },
        limit: 4
      })
      .then((photos) => {
        res.render('./gallery/photo', {photos, user: req.body.user});
      });
    }else{
      Photo.findAll({
          where: {
            $and: {
              id: [req.params.id, 11, 12, 13, 14, 15],
              link: {
                $ne: null
              }
            }
          },
        limit: 4
      })
      .then((photos) => {
        res.render('./gallery/photo', {photos, user: req.body.user});
      });
    }
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