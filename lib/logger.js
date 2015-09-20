'use strict';

var _ = require('underscore');
var winston = require('winston');
require('winston-papertrail');
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

_.each(configLogger.transports, function (transport) {
	switch (transport.type) {
		case "console":
			transports.push(new (winston.transports.Console)({
				colorize: true,
				level: transport.level,
				handleExceptions: true
			}));
			break;
		case "file":
			transports.push(new (winston.transports.File)({
				colorize: true,
				filename: transport.filename,
				maxsize: 5242880,
				maxFiles: 5,
				tailable: true,
				level: transport.level,
				handleExceptions: true,
				json: true
			}));
			break;
		case "paperTrail":
			transports.push(new winston.transports.Papertrail({
				host: transport.host,
				port: transport.port,
				level: transport.level,
				program: transport.program,
				colorize: true,
				inlineMeta: true
			}));
			break;
	}
});

var logger = new winston.Logger({
	transports: transports
});

winstonError(logger);

module.exports = logger;
