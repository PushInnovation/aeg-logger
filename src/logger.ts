import * as _ from 'lodash';
import * as winston from 'winston';
import { Papertrail } from 'winston-papertrail';
import * as winstonError from 'winston-error';
import * as config from 'config';

export namespace aeg {

	export interface LoggerConfig {
		transports: any[];
	}

	export class Logger extends winston.Logger {

		constructor (config: LoggerConfig) {

			const transports: winston.TransportInstance[] = [];

			_.each(config.transports, (transport) => {

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

			super({
				transports: transports,
				exitOnError: false
			});
			
		}

	}

}

const loggerConfig: aeg.LoggerConfig = config.get('aeg-logger');

winston.addColors({
	debug: 'green',
	info: 'green',
	warn: 'yellow',
	error: 'red'
});

const logger = new aeg.Logger(loggerConfig);

winstonError(logger);

export default logger;
