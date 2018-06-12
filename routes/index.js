var express = require('express');
var router = express.Router();
var path = process.cwd();
var User = require(path + '/models/users');
var Routine = require(path + '/models/routine');
var randomstring = require("randomstring");

function homeController(req, res, next) {
  res.render('index');
}

/* GET home page. */
router.get('/', homeController);

router.post('/api/create-user', function (req, res, next) {
  var userId = randomstring.generate({
    length: 8,
  })
  var user = new User({
    username: req.body.username,
    userId: userId
  });
  user.save(function (err, data) {
    if (err) throw err;
    res.render("confirm", {
      message: 'user saved',
      username: data.username,
      userId: data.userId
    });
  });
  
});

router.post('/api/save-routine', function (req, res, next) {
  User.find({userId: req.body.userId}, function(err, data){
    if (err) { 
      throw err; 
    } else {
       var routine = new Routine({
         userId: req.body.userId,
         name: req.body.name,
         duration: req.body.duration,
         time: req.body.time
       })
       routine.save(function (err, data) {
         if (err) throw err;
         res.render("confirm", {
           message: 'routine saved',
           userId: data.userId
         });
       });
    }

  })
});

router.post('/api/fetch-user', function (req, res, next) {
   Routine.find({
     userId: req.body.userId
   }, function (err, data) {
     console.log(data)
     if (err) {
       throw err;
     } else {
         res.json({
           data: data
         });
       }
     })
});

module.exports = router;
