"use strict";

var Settings = require('./setting');
var db = require('mongodb').Db;
var server = require('mongodb').Server;
var database = new db(Settings.DB, new server(Settings.HOST, Settings.PORT, {auto_reconnect:true, native_parser: true}),{safe: false});

module.exports = database;