const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended : false }));
// MODELS
const db = require('./models');

// ROUTES
const gallery = require('./routes/gallery');
app.use('/gallery', gallery);

app.listen(PORT, () => {
  console.log('listening on', PORT);
});