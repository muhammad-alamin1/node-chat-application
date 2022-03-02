const createError = require('http-error');
const path = require('path');
const { unlink } = require('fs');
const { check, validationResult } = require('express-validator');
const People = require('../model/People');


const userValidator = [
    check('name')
    .isLength({ min: 1 })
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other than alphabet.!')
    .trim(),
    check('email')
    .isEmail().withMessage('Invalid email address.!')
    .trim().custom(async(value) => {
        try {
            const user = await People.findOne({ email: value });
            if (user) {
                throw createError('E-mail already is used.!');
            }
        } catch (error) {
            throw createError(error.message);
        }
    }),
    check('mobile')
    .isMobilePhone('bn-BD', {
        strictMode: true,
    })
    .withMessage('Mobile number must be a valid bangladeshi mobile number.!')
    .custom(async(value) => {
        try {
            const user = await People.findOne({ mobile: value });
            if (user) {
                throw createError('Mobile already is used.!');
            }
        } catch (error) {
            throw createError(error.message);
        }
    }),
    check('password')
    .isStrongPassword()
    .withMessage('Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol.!'),

];

// validation error handler middleware
const addUserValidationErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();

    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        // remove upload file
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${filename}`),
                (err) => {
                    if (err) console.log(err);
                }
            );
        }
        res.status(500).json({
            errors: mappedError
        })
    }
}

module.exports = {
    userValidator,
    addUserValidationErrorHandler
}