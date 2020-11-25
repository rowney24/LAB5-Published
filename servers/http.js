var express = require('express'),
  actuatorsRoutes = require('./../routes/actuators'),
  sensorRoutes = require('./../routes/sensors'),
  resources = require('./../resources/model'),
  
cors = require('cors');
var app = express();

app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorRoutes);

app.get('/pi', function (req, res) {
  res.send('Welcome to the WoT-Pi Project!')
});

// For representation design
module.exports = app;

/*
var express = require('express'),
  actuatorsRoutes = require('./../routes/actuators'),
  sensorRoutes = require('./../routes/sensors'),
  thingsRoutes = require('./../routes/things'),
  resources = require('./../resources/model'),
  converter = require('./../middleware/converter'),
  cors = require('cors'),
  bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorRoutes);
app.use('/things', thingsRoutes);

app.get('/pi', function (req, res) {
  res.send('This is the WoT-Pi!')
});

// For representation design
app.use(converter());
module.exports = app;
*/