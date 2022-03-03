const htmlResponse = (title) => {
    return (req, res, next) => {
        res.locals.html = true;
        res.locals.title = `${title}`;
        res.locals.loggedInUser = {};
        res.locals.errors = {};
        res.locals.data = {};
        next();
    }
}


module.exports = htmlResponse;