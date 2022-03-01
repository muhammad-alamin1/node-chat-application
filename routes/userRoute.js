const userRouter = require('express').Router({ caseSensitive: true });

const { userPostController, userGetController } = require('../controller/userController');
const htmlResponse = require('../middleware/common/htmlResponse');


userRouter.get('/', htmlResponse('Users'), userGetController);
userRouter.post('/', userPostController);


module.exports = userRouter;