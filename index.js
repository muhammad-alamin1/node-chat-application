require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// import middleware & routes
const applicationMiddleware = require('./middleware/appMiddleware');
const { defaultError, notFound } = require('./middleware/common/errorHandler');
const inboxRouter = require('./routes/inboxRoute');
const loginRouter = require('./routes/loginRoute');
const userRouter = require('./routes/userRoute');

// app 
const app = express();

// set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

// use middleware
app.use(applicationMiddleware);

// route setup
app.use('/users', userRouter);
app.use('/inbox', inboxRouter);
app.use('/', loginRouter);

//  404 not found
app.use(notFound);

// default error handler
app.use(defaultError);

// mongodb uri
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.twhvb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// database connect with mongoose
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("DB Connection successfully");
    // listen port 
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`server running on port http://localhost:${port}`);
    })
});