const express = require('express');
const CONFIG = require('./config/config.json');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');


const session  = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const PORT = process.env.PORT || 3000;
const app = express();

const hbs = handlebars.create({
  extname: 'hbs',
  defaultLayout: 'app',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended : false }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: CONFIG.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

const authenticate = (username, password) => {
  // get user data from the DB
  const { USERNAME } = CONFIG;
  const { PASSWORD } = CONFIG;

  // check if the user is authenticated or not
 if (username === USERNAME && password === PASSWORD) {
    console.log(true);
  }
  return ( username === USERNAME && password === PASSWORD );
};

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log('username, password: ', username, password);
    // check if the user is authenticated or not
    if( authenticate(username, password) ) {

      // User data from the DB
      const user = {
        name: 'Joe',
        role: 'admin',
        favColor: 'green',
        isAdmin: true,
      };

      return done(null, user); // no error, and data = user
    }
    return done(null, false); // error and authenticted = false
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

// ROUTES
const gallery = require('./routes/gallery');
const login = require('./routes/login');
const secret = require('./routes/secret');


app.use('/gallery', gallery);
app.use('/login', login);
app.use('/secret', secret);


app.listen(PORT, () => {
  console.log('listening on', PORT);
  db.sequelize.sync();
});