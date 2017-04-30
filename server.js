// server.js
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

//Database setup
// var social = require('./models/social');
var Comments = [
  {
    "id": 0,
    "page":0,
    "comment": "หล่อจัง",
    "name": "5735512029",
    "day": "30/04/2017"
  },
  {
    "id": 1,
    "page":0,
    "comment": "หล่อ อิอิ",
    "name": "57355120670",
    "day": "29/04/2017"
  },
  {
    "id": 2,
    "page":1,
    "comment": "หล่อจัง",
    "name": "5735512060",
    "day": "30/04/2017"
  },
  {
    "id": 3,
    "page":1,
    "comment": "หล่อ อิอิ",
    "name": "5735512067",
    "day": "29/04/2017"
  }

];
var socialIndex = 4;
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

// more routes for our API will happen here
// on routes that end in /social

// get all the social (accessed at GET http://localhost:8080/api/social)
router.route('/socials')
  .get(function(req, res) {
    // res.json(social.findAll());
    res.json(Comments);
  });

// create a bear (accessed at POST http://localhost:8080/api/social)
router.route('/socials')
  .post(function(req, res) {
    var social = {};
    social.id = socialIndex++;
    social.comment = req.body.comment;
    social.name = req.body.name;
    social.day = req.body.day;
    social.page = req.body.page;
    //social.save(bear);
    Comments.push(social);
    res.json({
      message: 'Project created!'
    });
  });

// on routes that end in /social/:social_id
router.route('/socials/:social_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/social/:social_id)
  .get(function(req, res) {
    res.json(Comments[req.params.social_id]);
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/social/:social_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Comments[req.params.social_id].comment = req.body.comment; // update the social info
    Comments[req.params.social_id].name = req.body.name; // update the social info
    Comments[req.params.social_id].day = req.body.day; // update the social info
    Comments[req.params.social_id].page = req.body.page; // update the social info
    res.json({
      message: 'Project updated!'
    });
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/social/:social_id)
  .delete(function(req, res) {
    delete Comments[req.params.social_id]
    res.json({
      message: 'Project deleted!'
    });
  })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//static directory
app.use(express.static('public'))

// use the router and 401 anything falling through
app.use("*", function(req, res) {
  res.status(404).send('404 Not found');
});

// START THE SERVER
// =============================================================================
app.listen(80, function() {
  console.log("Server is running")
});

