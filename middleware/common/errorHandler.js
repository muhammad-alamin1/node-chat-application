const createError = require('http-errors');

const notFound = (req, res, next) => {
    next(createError(404, `Bad Url! Your requested content was not found.!`));
}

const defaultError = (err, req, res, next) => {
    console.log(err);
    res.locals.error = process.env.NODE_ENV === 'development' ? err : { message: err.message };

    res.status(err.status || 500);

    if (res.locals.html) {
        res.render('error/error', {
            title: `Error Page`
        })
    } else {
        res.json(res.locals.error);
    }
}


module.exports = {
    notFound,
    defaultError
}