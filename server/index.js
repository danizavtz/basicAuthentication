const router = require('express').Router();
const validation = require('./validators/validator.basic.js')
const service = require('./services/index.service.js');

router.get('/', service.default);
router.get('/secure', validation.validationHeaderRules, validation.checkRules, service.basicAuthVerification, service.granted);
router.get('*', service.notFoundDefaultRoute);

module.exports = router;