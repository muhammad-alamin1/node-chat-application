const userRouter = require('express').Router({ caseSensitive: true });

const { userPostController, userGetController, userDeleteController } = require('../controller/userController');
const { authGuard } = require('../middleware/common/authGuard');
const htmlResponse = require('../middleware/common/htmlResponse');
const uploadMiddleware = require('../middleware/users/uploadMiddleware');
const { userValidator, addUserValidationErrorHandler } = require('../validator/userValidator');


userRouter.get('/', htmlResponse('Users'), authGuard, userGetController);
userRouter.post('/',
    authGuard,
    uploadMiddleware,
    userValidator,
    addUserValidationErrorHandler,
    userPostController
);
userRouter.delete('/:id', userDeleteController);


module.exports = userRouter;