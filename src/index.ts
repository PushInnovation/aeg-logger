import Logger from './logger';
import { ILoggerConfig } from './logger';
import * as winston from 'winston';
import * as winstonError from 'winston-error';
import * as config from 'config';

const loggerConfig: ILoggerConfig = config.get('aeg-logger');

winston.addColors({
	debug: 'green',
	info: 'green',
	warn: 'yellow',
	error: 'red'
});

const logger = new Logger(loggerConfig);

winstonError(logger);

export { Logger, ILoggerConfig };
export default logger;
