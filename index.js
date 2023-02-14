const express = require('express');
const path = require('path');
const ejs = require('ejs');
const db = require('./configs/mongoose')
const habitsRouter = require('./routes/index_routes');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', habitsRouter);

const portNo = process.env.PORT || 8001;

app.listen(portNo, function (err) {
    if (err) {
        console.log(`Error while running server: ${err}`);
        return;
    }
    console.log(`Server is running at port Number: ${portNo}`);
});