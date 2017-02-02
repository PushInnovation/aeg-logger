import logger from '../../src/logger';

describe('aeg-logger', async () => {

	describe('#debug()', async () => {

		it('should print an debug with args', async () => {

			logger.debug('This is a test with args', {first: 1, second: 2});

		});

	});

	describe('#debug()', async () => {

		it('should print an debug without args', async () => {

			logger.debug('This is a test without args');

		});

	});

	describe('#info()', async () => {

		it('should print an info with args', async () => {

			logger.info('This is a test with args', {first: 1, second: 2});

		});

	});

	describe('#info2()', async () => {

		it('should print an info without args', async () => {

			logger.info('This is a test without args');

		});

	});

	describe('#warn()', async () => {

		it('should print an warning with args', async () => {

			logger.warn('This is a test with args', {first: 1, second: 2});

		});

	});

	describe('#warn2()', async () => {

		it('should print an warning without args', async () => {

			logger.warn('This is a test without args');

		});

	});

	describe('#error()', async () => {

		it('should print an error with args', async () => {

			logger.error('This is a test with args', {first: 1, second: 2});

		});

		it('should print an error without args', async () => {

			logger.error('This is a test without args');

		});

		it('should print error with stack trace', async () => {

			logger.error(new Error('This is a test with a real error'), {first: 1, second: 2});

		});

	});

	describe('#errorWithMessage()', async () => {

		it('should print an error message with an error and stack', async () => {

			logger.errorWithMessage('This is a test with args', new Error('this is a test'));

		});

		it('should print an error message with an error, an object, and a stack', async () => {

			logger.errorWithMessage('This is a test with args', {first: 1, second: 2}, new Error('this is a test'));

		});

	});

});
