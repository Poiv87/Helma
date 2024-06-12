const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const webRoutes = require('./routers/webRouter.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const Reservation = require('./model/reservations.js');
require('dotenv').config();
const cron = require('node-cron');
const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const sessionConfig = {
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: {
        secure: false,
        maxAge: 1209600000
    }
};

app.use(session(sessionConfig));


(async () => {
    try {
        const startOfCurrentDay = new Date();
        startOfCurrentDay.setHours(0, 0, 0, 0);

        const result = await Reservation.deleteMany({ createdTime: { $lt: startOfCurrentDay } }, { maxTimeMS: 5000 });

        console.log(`${result.deletedCount} previous day reservations deleted successfully.`);
    } catch (err) {
        console.error('Error deleting previous day reservations:', err);
    }
})();

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Could not connect to MongoDB Atlas', err));

app.get('/', (req, res) => {
    res.redirect('/helma');
});

app.use('/helma', webRoutes);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    let signIn;
    let userName;

    if (req.session && req.session.admin) {
        signIn = '/admin';
        userName = 'تنظیمات';
    } else if (req.session && req.session.username) {
        signIn = '/profile';
        userName = req.session.username;
    } else {
        signIn = '/sing_in';
        userName = 'ثبت نام';
    }

});

process.env.PORT
app.listen(process.env.PORT, () => {
    console.log("server running " + `http://192.168.1.6:1387/helma/`);
});