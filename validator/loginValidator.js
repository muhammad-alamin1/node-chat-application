const { check, validationResult } = require('express-validator');

const loginValidator = [
    check('username')
    .isLength({ min: 1 })
    .withMessage('Email or mobile is required.!'),
    check('password')
    .isLength({ min: 1 })
    .withMessage('Password is required.!')
];

// login validation handler 
const loginValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();

    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.render('pages/index', {
            data: {
                username: req.body.username
            },
            errors: mappedError,
        })
    }
}

module.exports = {
    loginValidator,
    loginValidationHandler
}