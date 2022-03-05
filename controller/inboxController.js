const Conversation = require("../model/conversation");
const People = require("../model/People")

const inboxGetController = async(req, res, next) => {
    const users = await People.find();
    console.log(users)

    res.render('pages/inbox', {
        users
    })
}

// start conversation
const startConversation = async(req, res, next) => {
    try {
        const newConversation = new Conversation({
            creator: {
                id: req.user.userid,
                name: req.user.username,
                avatar: req.user.avatar || null,
            },
            participant: {
                name: req.body.participant,
                id: req.body.id,
                avatar: req.body.avatar || null,
            },
        });

        await newConversation.save();
        res.status(200).json({
            message: "Conversation added successfully!",
        });

    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
}

module.exports = {
    inboxGetController,
    startConversation
}