import * as winston from 'winston';
import * as winstonError from 'winston-error';
import { Papertrail } from 'winston-papertrail';

export interface ILoggerConfig {
	transports: any[];
}

export interface ILogger {
	debug (message: string, data?: any, error?: Error);
	info (message: string, data?: any, error?: Error);
	warn (message: string, data?: any, error?: Error);
	error (message: string, data?: any, error?: Error);
}

export default class Logger implements ILogger {

	private _logger: winston.LoggerInstance;

	constructor (loggerConfig: ILoggerConfig) {

		const transports: winston.TransportInstance[] = [];

		loggerConfig.transports.forEach((transport) => {

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

		this._logger = new winston.Logger({
			transports,
			exitOnError: false
		});

		winstonError(this._logger);

	}

	public debug (message: string, data?: any, error?: Error) {

		this._logger.debug(message, data, error);

	}

	public info (message: string, data?: any, error?: Error) {

		this._logger.info(message, data, error);

	}

	public warn (message: string, data?: any, error?: Error) {

		this._logger.warn(message, data, error);

	}

	public error (message: string, data?: any, error?: Error) {

		this._logger.error(message, data, error);

	}

}
