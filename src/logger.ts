import * as winston from 'winston';
import * as winstonError from 'winston-error';
import { Papertrail } from 'winston-papertrail';
import { TransportInstance } from 'winston';

export interface ILoggerConfig {
	transports: any[];
}

export interface ILogger {
	debug (message: string, data?: any);
	info (message: string, data?: any);
	warn (message: string, error?: Error);
	warn (message: string, data: any, error?: Error);
	error (message: string, error?: Error);
	error (message: string, data: any, error?: Error);
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

	get transports (): { [key: string]: TransportInstance } {

		return this._logger.transports;

	}

	public debug (message: string, data?: any) {

		this._logger.debug.apply(this._logger, Array.prototype.slice.call(arguments));

	}

	public info (message: string, data?: any) {

		this._logger.info.apply(this._logger, Array.prototype.slice.call(arguments));

	}

	public warn (message: string, data?: any, error?: Error) {

		this._logger.warn.apply(this._logger, Array.prototype.slice.call(arguments));

	}

	public error (message: string, data?: any, error?: Error) {

		this._logger.error.apply(this._logger, Array.prototype.slice.call(arguments));

	}

}
