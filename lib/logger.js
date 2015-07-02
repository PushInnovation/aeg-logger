'use strict';

var winston = require('winston');
var winstonError = require('winston-error');
var config = require('config');
var configLogger = config.get('Logger');

winston.addColors({
	debug: 'green',
	info: 'green',
	warn: 'yellow',
	error: 'red'
});

var transports = [];

transports.push(new (winston.transports.Console)({
	colorize: true,
	level: configLogger.consoleLevel,
	handleExceptions: true
}));

if (configLogger.logToFile) {
	transports.push(new (winston.transports.File)({
		colorize: true,
		filename: configLogger.filename,
		maxsize: 5242880,
		maxFiles: 5,
		tailable: true,
		level: configLogger.fileLevel,
		handleExceptions: true,
		json: true
	}));
}

var logger = new winston.Logger({
	transports: transports
});

winstonError(logger);

module.exports = logger;;

