const loginRouter = require('express').Router({ caseSensitive: true });

const { loginGetController, loginPostController } = require('../controller/loginController');
const htmlResponse = require('../middleware/common/htmlResponse');


loginRouter.get('/', htmlResponse('Login'), loginGetController);
loginRouter.post('/', loginPostController);


module.exports = loginRouter;