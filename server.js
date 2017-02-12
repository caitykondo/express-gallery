const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
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

// MODELS
const db = require('./models');

// ROUTES
const gallery = require('./routes/gallery');
app.use('/gallery', gallery);

app.listen(PORT, () => {
  console.log('listening on', PORT);
  db.sequelize.sync();
});