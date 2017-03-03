const express = require('express');
let router = express.Router();
const passport = require('passport');
const db = require('./../models');
const { User } = db;
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
const checkIfExists = require('./../helpers/checkIfExists');

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
  .post(checkIfExists, (req, res) => {
    if(req.exists !== true){
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, null, null, (err, hash) => {
          User.create({
           username: req.body.username,
           password: hash
        })
        .then((user) => res.redirect(303, '/gallery/'));
        });
      });
    }else{
      res.render('./signup', { message: 'Username already exists' });
    }
});

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect(303, '/login');
});

module.exports = router;
