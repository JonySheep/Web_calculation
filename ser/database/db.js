"use strict";

var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27016/mongoosesample';

mongoose.connect(DB_URL);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});


