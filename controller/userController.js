// user get 
const userGetController = (req, res, next) => {
    res.render('pages/users')
}

// user post 
const userPostController = (req, res, next) => {

}


module.exports = {
    userGetController,
    userPostController
}