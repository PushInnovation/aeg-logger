import Logger, { ILogger, ILoggerConfig } from './logger';
import * as winston from 'winston';
import * as config from 'config';

const loggerConfig = config.get<ILoggerConfig>('aeg-logger');

winston.addColors({
	debug: 'green',
	info: 'green',
	warn: 'yellow',
	error: 'red'
});

export default new Logger(loggerConfig);
export { Logger, ILogger, ILoggerConfig };
