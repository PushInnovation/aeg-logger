const logger = require('./lib/logger').default;

logger.debug('debug test');
logger.info('info test');
logger.warn('warn test');
logger.error('error test');
logger.errorWithMessage('error message test', new Error('this is a test error'));
logger.errorWithMessage('error message test', {test: 'test1'}, new Error('this is a test error'));

process.exit();
