import Logger from './logger';
import { ILogger, ILoggerConfig } from './logger';
import * as winston from 'winston';
import * as config from 'config';

const loggerConfig: ILoggerConfig = config.get('aeg-logger');

winston.addColors({
	debug: 'green',
	info: 'green',
	warn: 'yellow',
	error: 'red'
});

const logger = new Logger(loggerConfig);

export default logger;
export { Logger, ILogger, ILoggerConfig };
