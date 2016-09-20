const mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  team: String,
  games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
  wins: {type: Number, default: 0},
  loses: {type: Number, default: 0},
  rating: {type: Number, default: 0}
});

module.exports = mongoose.model('Player', PlayerSchema);
