const express = require('express');
const router = express.Router();
const Song = require('../models/song')

// Getting all
router.get('/', async (req, res) => {
	try {
		const songs = await Song.find();
		res.json(songs);
	} catch (e) {
		res.status(404).json({ message: e.message });
	}
})
// Getting one
router.get('/:id', getSong, (req, res) => {
	res.send(res.song);
})
// Creating one
router.post('/', async (req, res) => {
	const song = new Song({
		name: req.body.name,
		bpm: req.body.bpm,
		key: req.body.key,
		elements: req.body.elements,
	});
	try {
		const newSong = await song.save();
		res.status(201).json(newSong);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
})
// Updating one
router.patch('/:id', getSong, async (req, res) => {

	res.song.name = req.body.name;
	res.song.bpm = req.body.bpm;
	res.song.key = req.body.key;
	res.song.elements = req.body.elements;

	try {
		const updatedSong = await res.song.save();
		res.json(updatedSong)
	} catch (e) {
		res.status(400).json({ message: e.message })
	}
})
// Deleting one
router.delete('/:id', getSong, async (req, res) => {
	try {
		await res.song.remove();
		res.json({ message: 'Song was deleted' });
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
})

async function getSong(req, res, next) {
	let song;
	try {
		song = await Song.findById(req.params.id);
		if (song == null) {
			res.status(404).json({ message: 'Cannot find song' });
		}
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}

	res.song = song;
	next();
}

module.exports = router;