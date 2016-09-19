import _ from 'lodash';
import winston from 'winston';
import { Papertrail } from 'winston-papertrail';
import winstonError from 'winston-error';
import config from 'config';

const configLogger = config.get('aeg-logger');

winston.addColors({
	debug: 'green',
	info: 'green',
	warn: 'yellow',
	error: 'red'
});

const transports = [];

_.each(configLogger.transports, (transport) => {

	switch (transport.type) {
		case 'console':
			transports.push(new (winston.transports.Console)({
				colorize: true,
				level: transport.level,
				handleExceptions: true
			}));
			break;
		case 'file':
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
		case 'paperTrail':
			transports.push(new Papertrail({
				host: transport.host,
				port: transport.port,
				level: transport.level,
				program: transport.program,
				colorize: false,
				inlineMeta: true
			}));
			break;
	}

});

const logger = new winston.Logger({
	transports: transports,
	exitOnError: false
});

winstonError(logger);

logger.errorWithMessage = function (message, options, err) {

	const args = Array.prototype.slice.call(arguments);
	message = args.shift();
	err = args.pop();
	options = args.length > 0 ? args.shift() : null;

	this.error(message, options);

	if (err) {

		this.error(err);

	}

};

module.exports = logger;
