const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const People = require("../model/People");

// login get
const loginGetController = (req, res, next) => {
    res.render('pages/index');
}

// login post 
const loginPostController = async(req, res, next) => {
    try {
        const user = await People.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }]
        })

        if (user && user._id) {
            const isValidPass = await bcrypt.compare(req.body.password, user.password);

            if (isValidPass) {
                // generate user object
                const userObj = {
                    username: user.name,
                    email: user.email,
                    role: 'user'
                };

                // generate token 
                const token = jwt.sign(userObj, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION // 1 day
                });

                // set cookie 
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRATION,
                    httpOnly: true,
                    signed: true,
                });

                // user data set locals
                res.locals.loggedInUser = userObj;

                res.render('pages/inbox');
            } else {
                throw createError('Login failed.! Try again.!');
            }
        } else {
            throw createError('Login failed.! Try again.!');
        }
    } catch (error) {
        res.render('pages/index', {
            data: {
                username: req.body.username
            },
            errors: {
                common: {
                    msg: error.message
                }
            }
        })
    }
}

// logout 
const logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME, { path: '/' });
    res.send('Logged Out');
}

module.exports = {
    loginGetController,
    loginPostController,
    logout
}