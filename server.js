require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb+srv://vova:dj559526@cluster0.dde64.mongodb.net/songs', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', e => console.error(e));
db.once('open', () => console.log('Connect to DB)'));

app.use(express.json());
app.use(cors());

const songsRouter = require('./routes/songs');

app.use('/songs', songsRouter);

app.listen(3000, () => console.log('Sever started . . .'));