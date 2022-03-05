const inboxRouter = require('express').Router({ caseSensitive: true });

const { inboxGetController, startConversation } = require('../controller/inboxController');
const { authGuard } = require('../middleware/common/authGuard');
const htmlResponse = require('../middleware/common/htmlResponse');


inboxRouter.get('/', htmlResponse('Inbox'), authGuard, inboxGetController);
// inboxRouter.post('/conversation', authGuard, startConversation);


module.exports = inboxRouter;