import * as winston from 'winston';
import { Papertrail } from 'winston-papertrail';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { TransportInstance, TransportOptions } from 'winston';
import * as _ from 'lodash';

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
	crashProcessWithError (message: string, error?: Error);
}

export default class Logger implements ILogger {

	private _logger: winston.LoggerInstance;

	constructor (loggerConfig: ILoggerConfig) {

		const transports: winston.TransportInstance[] = [];

		loggerConfig.transports.forEach((transport) => {

			switch (transport.type) {
				case 'console':
					transports.push(new (winston.transports.Console)({
						colorize: transport.colorize !== undefined ? transport.colorize : true,
						level: transport.level,
						handleExceptions: true,
						timestamp: transport.timestamp
					}));
					break;
				case 'file':
					transports.push(new (winston.transports.File)({
						colorize: transport.colorize !== undefined ? transport.colorize : true,
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
				case 'cloudWatch':
					transports.push(new (WinstonCloudWatch as any)({
						level: transport.level,
						logGroupName: transport.logGroupName,
						logStreamName: transport.logStreamName,
						awsAccessKeyId: transport.awsAccessKeyId,
						awsSecretKey: transport.awsSecretKey,
						awsRegion: transport.awsRegion,
						retentionInDays: transport.retentionInDays,
						jsonMessage: true
					}));
					break;
			}

		});

		this._logger = new winston.Logger({
			transports,
			exitOnError: false
		});

	}

	get transports (): { [key: string]: TransportInstance } {

		return this._logger.transports;

	}

	public addTransport (transport: winston.TransportInstance, options: TransportOptions) {

		this._logger.add(transport, options);

	}

	public updateTransport (name: string, property: string, value: any) {

		const transport = _.find(this._logger.transports, (t) => t.name === name);

		if (transport) {

			if (transport[property]) {

				transport[property] = value;

			} else {

				throw new Error('Transport property not found');

			}

		} else {

			throw new Error('Transport not found');

		}

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

	public async flush () {

		await Promise.all([this._flushCloudWatch(), this._flushStreams()]);

	}

	public crashProcessWithError (message: string, error?: Error) {

		this._logger.log('error', message, error, (err) => {

			this.flush()
				.then(() => {

					process.exit(1);

				})
				.catch((ex) => {

					process.exit(1);

				});

		});

	}

	private async _flushCloudWatch () {

		await new Promise((resolve, reject) => {

			if (this._logger.transports.CloudWatch) {

				(this._logger.transports.CloudWatch as any).kthxbye((err) => {

					if (err) {

						reject(err);

					} else {

						resolve();

					}

				});

			}

		});

	}

	private async _flushStreams () {

		await new Promise((resolve, reject) => {

			/********************************************************************************************
			 The following code has been adapted from https://github.com/jdthorpe/winston-log-and-exit
			 Retrieved 2017-09-15.  Its use is permitted by the MIT license.
			 ********************************************************************************************/

			let numFlushes = 0;
			let numFlushed = 0;

			Object.keys(this._logger.transports).forEach((k) => {

				const transport = this._logger.transports[k] as any;

				if (transport._stream) {

					numFlushes += 1;
					transport._stream.once('finish', () => {

						numFlushed += 1;
						if (numFlushes === numFlushed) {

							resolve();

						}

					});

					transport._stream.end();

				}

			});

			if (numFlushes === 0) {

				resolve();

			}

		});

	}

}
