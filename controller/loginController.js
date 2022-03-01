const loginGetController = (req, res, next) => {
    res.render('pages/login', {
        title: 'Login',
    })
}


module.exports = {
    loginGetController,
}