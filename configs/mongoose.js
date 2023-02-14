const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/habit_tracker_db');

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'error on connecting db'));

db.once('open', function(){
    console.log('Connected to DB');
})