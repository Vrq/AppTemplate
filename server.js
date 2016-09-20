const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Game = require('./models/GameModel');
const Player = require('./models/PlayerModel');
const app = express();

//settings for res.render:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//connect with DB:
mongoose.connect('mongodb://admin:gw123@ds023468.mlab.com:23468/pool_app_db');
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB');
});

//GET request for the main page:
app.get('/', function(req, res) {
  Player.find({}, function(err, result) {
    if(err) {
      return console.log("Error with getting the list of players: " + err);
    }
    res.render('index', {players: result});
  })

})

//starting the server:
app.listen(3000, function() {
  console.log("Listening on port 3000");
});
