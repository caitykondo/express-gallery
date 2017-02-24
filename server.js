"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const session  = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RedisStore = require('connect-redis')(session);
const PORT = process.env.PORT || 3000;
const app = express();
const hbs = handlebars.create({
  extname: 'hbs',
  defaultLayout: 'app',
});

// helpers
// const isAuthenticated = require('./helpers/isAuthenticated');

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// redis for cacheing
const redis = require('redis');
let client = redis.createClient();
const cache = require('express-redis-cache')({client: client, expire: 60});

app.use(express.static('./'));

app.use(bodyParser.urlencoded({ extended : true }));

// app.use(methodOverride('_method'));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// authentication w/ passport
app.use(session({
  store: new RedisStore(),
  secret: "keyboard_cat"
}));

app.use(passport.initialize());
app.use(passport.session());
//
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username, password})
      .then((user) => {
      console.log(true);
      return done( null, user );
      })
      .catch((err) => {
        return done(null, err);
      });
  }
));

// storing into database
passport.serializeUser(function(user, done) {
  return done(null, user);
});

// retrieving from database
passport.deserializeUser(function(user, done) {
  return done(null, user);
});

// MODELS
const db = require('./models');
const {User} = db;

// ROUTES
const gallery = require('./routes/gallery');
const login = require('./routes/login');
// const secret = require('./routes/secret');


app.use('/gallery', cache.route(), gallery);
app.use('/login', login);
// app.use('/secret', isAuthenticated, secret);


app.listen(PORT, () => {
  console.log('listening on', PORT);
  db.sequelize.sync();
});