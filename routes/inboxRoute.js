const inboxRouter = require('express').Router({ caseSensitive: true });

const { inboxGetController } = require('../controller/inboxController');
const htmlResponse = require('../middleware/common/htmlResponse');


inboxRouter.get('/', htmlResponse('Inbox'), inboxGetController);


module.exports = inboxRouter;