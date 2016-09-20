const mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  id: String,
  date: String,
  oponent_ID: String,
  winner_id: String,
  rating_gained: {type: Number, default: 0}
});

module.exports = mongoose.model('Game', GameSchema);
