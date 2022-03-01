const htmlResponse = (title) => {
    return (req, res, next) => {
        res.locals.html = true;
        res.locals.title = `${title}`;
        next();
    }
}


module.exports = htmlResponse;