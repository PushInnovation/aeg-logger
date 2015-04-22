'use strict';

var winston = require('winston');
var config = require('config');
var configLogger = config.get('Logger');

winston.addColors({
	info: 'green',
	error: 'red',
	warn: 'yellow'
});

var Logger = function (configLogger) {

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

	this.logger = new (winston.Logger)({
		transports: transports
	});
};

Logger.prototype.error = function (message, metadata) {
	if (metadata) {
		this.logger.error(message, metadata);
	} else {
		this.logger.error(message);
	}
};

Logger.prototype.warn = function (message, metadata) {
	if (metadata) {
		this.logger.warn(message, metadata);
	} else {
		this.logger.warn(message);
	}
};

Logger.prototype.info = function (message, metadata) {
	if (metadata) {
		this.logger.info(message, metadata);
	} else {
		this.logger.info(message);
	}
};

Logger.prototype.debug = function (message, metadata) {
	if (metadata) {
		this.logger.debug(message, metadata);
	} else {
		this.logger.debug(message);
	}
};

module.exports = new Logger(configLogger);