const loginRouter = require('express').Router({ caseSensitive: true });

const { loginGetController } = require('../controller/loginController');


loginRouter.get('/', loginGetController);


module.exports = loginRouter;