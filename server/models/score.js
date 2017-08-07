const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
	score: Number,
	name: String
});

module.exports = mongoose.model('Score', ScoreSchema);