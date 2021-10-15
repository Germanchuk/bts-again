const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	bpm: {
		type: Number,
	},
	key: {
		type: String,
	},
	elements: [{
		start: {
			type: Number,
		},
		end: {
			type: Number,
		},
		strings: [{
			type: {
				type: String, // chords or lyrics
			},
			string: {
				type: String,
			},
		}]
	}]
})

module.exports = mongoose.model('Song', songSchema);