const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

const applicationMiddleware = [
    morgan('dev'),
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser(process.env.COOKIE_SECRET),
]


module.exports = applicationMiddleware;