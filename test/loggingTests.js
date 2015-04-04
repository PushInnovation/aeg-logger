'use strict';

var logger = require('../lib/logger');

describe('aeg-logger', function () {
	describe('#info()', function () {
		it('should return without error', function (done) {
			logger.info('This is a test with args', {first: 1, second: 2});
			done();
		});
	});

	describe('#info2()', function () {
		it('should return without error', function (done) {
			logger.info('This is a test without args');
			done();
		});
	});

	describe('#error()', function () {
		it('should return without error', function (done) {
			logger.error('This is a test with args', {first: 1, second: 2});
			done();
		});
	});

	describe('#error2()', function () {
		it('should return without error', function (done) {
			logger.error('This is a test without args');
			done();
		});
	});
});