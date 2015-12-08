var logger = require('../');
var log = logger('logger');

log.error('%s %s %s', 1, '2', 3.);
log.warning('%s %s %s', 1, '2', 3.);
log.notice('%s %s %s', 1, '2', 3.);
log.info('%s %s %s', 1, '2', 3.);
log.debug('%s %s %s', 1, '2', 3.);
log.log('qwer', '%s %s %s', 1, '2', 3.);
