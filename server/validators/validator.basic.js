const { header, validationResult } = require('express-validator');

exports.validationHeaderRules = [
    header('Authorization', 'Authorization is required').exists(),
    header('Authorization', 'Authorization is required').notEmpty()
];

exports.checkRules = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};