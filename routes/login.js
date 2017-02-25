const express = require('express');
let router = express.Router();
const passport = require('passport');
const db = require('./../models');
const { User } = db;
const bcrypt = require('bcrypt-nodejs');

const saltRounds = 10;

router.route('/')
  .get(( req, res ) => {
    res.render('./login');
  })
  .post(
    passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login',
  }));

router.route('/signup')
  .get(( req, res ) => {
    res.render('./signup');
  })
  .post((req, res) => {

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, null, function(err, hash) {
        User.create({
         username: req.body.username,
         password: hash
      })
      .then((user) => res.redirect(303, '/gallery/'));
      });
    });
});

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect(303, '/login');
});

module.exports = router;
