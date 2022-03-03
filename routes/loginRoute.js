const loginRouter = require('express').Router({ caseSensitive: true });

const { loginGetController, loginPostController } = require('../controller/loginController');
const htmlResponse = require('../middleware/common/htmlResponse');
const { loginValidator, loginValidationHandler } = require('../validator/loginValidator');

const title = 'Login'

loginRouter.get('/', htmlResponse(title), loginGetController);

// login
loginRouter.post('/',
    htmlResponse(title),
    loginValidator,
    loginValidationHandler,
    loginPostController
);


module.exports = loginRouter;