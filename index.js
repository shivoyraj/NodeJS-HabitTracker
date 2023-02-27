// importing and using express
const express = require('express');
const app = express();

const path = require('path');
const ejs = require('ejs');

// importing index_routes
const indexRoutes = require('./routes/index_routes');

// included mongoose db configuration
const mongoose = require('mongoose');
const db = require('./configs/mongoose')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', indexRoutes);

const portNo = process.env.PORT || 8001;

app.listen(portNo, function (err) {
    if (err) {
        console.log(`Error while running server: ${err}`);
        return;
    }
    console.log(`Server is running at port Number: ${portNo}`);
});