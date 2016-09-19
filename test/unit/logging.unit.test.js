import logger from '../../src/logger';

describe('aeg-logger', () => {

	describe('#debug()', () => {

		it('should print an debug with args', (done) => {

			logger.debug('This is a test with args', {first: 1, second: 2});
			done();

		});

	});

	describe('#debug()', () => {

		it('should print an debug without args', (done) => {

			logger.debug('This is a test without args');
			done();

		});

	});

	describe('#info()', () => {

		it('should print an info with args', (done) => {

			logger.info('This is a test with args', {first: 1, second: 2});
			done();

		});

	});

	describe('#info2()', () => {

		it('should print an info without args', (done) => {

			logger.info('This is a test without args');
			done();

		});

	});

	describe('#warn()', () => {

		it('should print an warning with args', (done) => {

			logger.warn('This is a test with args', {first: 1, second: 2});
			done();

		});

	});

	describe('#warn2()', () => {

		it('should print an warning without args', (done) => {

			logger.warn('This is a test without args');
			done();

		});

	});

	describe('#error()', () => {

		it('should print an error with args', (done) => {

			logger.error('This is a test with args', {first: 1, second: 2});
			done();

		});

		it('should print an error without args', (done) => {

			logger.error('This is a test without args');
			done();

		});

		it('should print error with stack trace', (done) => {

			logger.error(new Error('This is a test with a real error'), {first: 1, second: 2});
			done();

		});

	});

	describe('#errorWithMessage()', () => {

		it('should print an error message with an error and stack', (done) => {

			logger.errorWithMessage('This is a test with args', new Error('this is a test'));
			done();

		});

		it('should print an error message with an error, an object, and a stack', (done) => {

			logger.errorWithMessage('This is a test with args', {first: 1, second: 2}, new Error('this is a test'));
			done();

		});

	});

});
