const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const webRoutes = require('./routers/webRouter.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const Reservation = require('./model/reservations.js');
const { title } = require('process');
const { Script } = require('vm');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

// تنظیم فایل‌های استاتیک
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');  // تصحیح شده از 'views engine'
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sessionConfig = {
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
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

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1); // خروج در صورت خطا در اتصال به دیتابیس
});

app.get('/', (req, res) => {
    res.redirect('/helma');
});

app.use('/helma', webRoutes);

app.use((err, req, res, next) => {
    res.status(500).send(err.stack);
});

app.use((req, res, next) => {
    const username = '';
    const profile = '';
    res.status(404).render('404', { 
        username,
        title: 'پیدا نشد',
        style: '404.css',
        script: '',
        profile
    });
})  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
