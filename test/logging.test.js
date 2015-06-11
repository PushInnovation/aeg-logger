'use strict';

var logger = require('../lib/logger');

describe('aeg-logger', function () {

	describe('#debug()', function () {
		it('should print an debug with args', function (done) {
			logger.debug('This is a test with args', {first: 1, second: 2});
			done();
		});
	});

	describe('#debug()', function () {
		it('should print an debug without args', function (done) {
			logger.debug('This is a test without args');
			done();
		});
	});

	describe('#info()', function () {
		it('should print an info with args', function (done) {
			logger.info('This is a test with args', {first: 1, second: 2});
			done();
		});
	});

	describe('#info2()', function () {
		it('should print an info without args', function (done) {
			logger.info('This is a test without args');
			done();
		});
	});

	describe('#warn()', function () {
		it('should print an warning with args', function (done) {
			logger.warn('This is a test with args', {first: 1, second: 2});
			done();
		});
	});

	describe('#warn2()', function () {
		it('should print an warning without args', function (done) {
			logger.warn('This is a test without args');
			done();
		});
	});

	describe('#error()', function () {
		it('should print an error with args', function (done) {
			logger.error('This is a test with args', {first: 1, second: 2});
			done();
		});
	});

	describe('#error2()', function () {
		it('should print an error without args', function (done) {
			logger.error('This is a test without args');
			done();
		});
	});

	describe('#error3()', function () {
		it('should print error with stack trace', function (done) {
			logger.error(new Error('This is a test with a real error'), {first: 1, second: 2});
			done();
		});
	});
});