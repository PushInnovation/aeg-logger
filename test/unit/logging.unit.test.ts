import logger from '../../src/index';
import * as winston from 'winston';
import * as crypto from 'crypto';

before(async () => {

	const startTime = new Date().toISOString();

	logger.updateTransport('CloudWatch', 'logStreamName', () => {

		const date = new Date().toISOString().split('T')[0];
		return 'test-' + date + '-' +
			crypto.createHash('md5')
				.update(startTime)
				.digest('hex');

	});

});

after(async () => {

	await logger.flush();

});

describe('aeg-logger', () => {

	describe('#addTransport()', () => {

		it('should print a debug with args', () => {

			logger.addTransport(winston.transports.Console, {level: 'debug', colorize: 'false', timestamp: true});

		});

	});

	describe('#debug()', () => {

		it('should print a debug with args', () => {

			logger.debug('This is a test with args', {first: 1, second: 2});

		});

		it('should print a debug without args', () => {

			logger.debug('This is a test without args');

		});

	});

	describe('#info()', () => {

		it('should print an info with args', () => {

			logger.info('This is a test with args', {first: 1, second: 2});

		});

		it('should print an info without args', () => {

			logger.info('This is a test without args');

		});

	});

	describe('#warn()', () => {

		it('should print a warning with args', () => {

			logger.warn('This is a test with args', {first: 1, second: 2});

		});

		it('should print a warning without args', () => {

			logger.warn('This is a test without args');

		});

		it('should print a warning with an error', () => {

			logger.warn('This is a test with args', new Error('this is a test'));

		});

		it('should print a warning with args and an error', () => {

			logger.warn('This is a test with args', {first: 1, second: 2}, new Error('this is a test'));

		});

	});

	describe('#error()', () => {

		it('should print an error with args', () => {

			logger.error('This is a test with args', {first: 1, second: 2});

		});

		it('should print an error without args', () => {

			logger.error('This is a test without args');

		});

		it('should print an error message with an error and stack', () => {

			logger.error('This is a test with args', new Error('this is a test'));

		});

		it('should print an error message with an error, an object, and a stack', () => {

			logger.error('This is a test with args', {first: 1, second: 2}, new Error('this is a test'));

		});

	});

});
