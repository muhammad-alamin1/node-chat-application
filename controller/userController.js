const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");
const People = require("../model/People");

// user get 
const userGetController = async(req, res, next) => {
    try {
        const users = await People.find();
        res.render('pages/users', {
            users: users,
        });
    } catch (error) {
        next(error);
    }
}

// user post 
const userPostController = async(req, res, next) => {
    let newUser;
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new People({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPass
        });
    } else {
        newUser = new People({
            ...req.body,
            password: hashedPass
        })
    }

    try {
        const result = await newUser.save();
        res.status(200).json({
            message: `User added successfully.!`
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: `Unknown error occured!`
                }
            }
        })
    }
}


// delete user
const userDeleteController = async(req, res, next) => {
    try {
        const user = await People.findByIdAndDelete({
            _id: req.params.id
        });

        // remove avatar
        if (user.avatar) {
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
                (err) => {
                    if (err) console.log(err);
                }
            );
        }

        res.status(200).json({
            message: `User delete successfully.!`
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: `User could not delete.!`
                }
            }
        })
    }
}

module.exports = {
    userGetController,
    userPostController,
    userDeleteController
}