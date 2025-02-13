const User = require('../model/user.js');
const Reservation = require('../model/reservations.js');
const bcrypt = require('bcryptjs');

const getUserData = (req) => {
    const signIn = req.session.admin ? '/admin' : req.session.username ? '/profile' : '/sign_in';
    const userName = req.session.admin ? 'تنظیمات' : req.session.username ? req.session.username : 'ثبت نام';
    return { signIn, userName };
};

const renderPage = (req, res, page, userName, title, style, script, additionalData = {}) => {
    const { signIn } = getUserData(req);
    res.render(page, {
        userName,
        title,
        style,
        script,
        profile: signIn,
        ...additionalData,
    });
};

const homePage = (req, res) => {
    const { userName } = getUserData(req);

    const use = User.findOne({ userName: req.session.username, lastName: req.session.lastname })
    if (!use) {
        delete req.session.username;
        delete req.session.lastname;
    }
    renderPage(req, res, 'home.ejs', userName, 'صفحه اصلی', 'home.css', 'home.js');
};

const valentain = (req, res) => {
    renderPage(req, res, 'valentain.ejs', 'Maedeh', 'نامه', 'valen.css', 'valen.js');
} 

const starting = (req, res) => {
    renderPage(req, res, 'starting.ejs', 'test', 'quyze', 'starting.css', 'starting.js');
}
const nexting = (req, res) => {
    renderPage(req, res, 'nexting.ejs', 'test');
}

const firsting = (req, res) => {
    renderPage(req, res, 'firsting.ejs', 'test');
}

const meoo = (req, res) => {
    renderPage(req, res, 'meoo.ejs', 'test');
}
const formom  = (req, res) => {
    renderPage(req, res, 'formom.ejs', 'test');
}
const aboutPage = (req, res) => {
    const { userName } = getUserData(req);
    renderPage(req, res, 'about', userName, 'ارتباط', 'about.css', 'about.js');
};

const singPage = (req, res) => {
    const { userName } = getUserData(req);
    const additionalData = {
        errText: ''
    };
    renderPage(req, res, 'singin_login', userName, 'ثبت نام', 'singin_login.css', 'singin_login.js', additionalData);
};

const profilePage = async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/helma/sign_in');
    }

    try {
        const user = await User.findOne({ userName: req.session.username, lastName: req.session.lastname });
        const reservations = await Reservation.find({ reservedBy: req.session.username, lastName: req.session.lastname });

        let a = 0;
        let reserv0, reser1, reser2, reser3;

        reservations.forEach((reservation) => {
            switch (reservation.services) {
                case 'آرایش':
                    reser1 = reservation;
                    break;
                case 'ناخن':
                    reser2 = reservation;
                    break;
                case 'رنگ و مدل مو':
                    reser3 = reservation;
                    break;
                default:
                    reserv0 = reservation;
            }
        });

        if (reser1 && reser2 && reser3) {
            a = 1;
        } else if (reser2 && reser3) {
            a = 2;
        } else if (reser1 && reser2) {
            a = 3;
        } else if (reser1 && reser3) {
            a = 4;
        } else if (reser1) {
            a = 5;
        } else if (reser2) {
            a = 6;
        } else if (reser3) {
            a = 7;
        }

        const additionalData = {
            lastName: user.lastName,
            reser: user.reserved,
            a,
            reserv: { reserv0, reser1, reser2, reser3 },
            c: 0,
        };

        renderPage(req, res, 'profile', user.userName, 'پروفایل', 'profile.css', 'profile.js', additionalData);
    } catch (error) {
        console.error(`Profile error: ${error.message}`);
        delete req.session.username;
        delete req.session.lastname;
        res.status(500).send('Server Error');
    }
};

const deleted = (req, res) => {
    const id = req.params.id;
    Reservation.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/helma/profile' });
        })
        .catch(err => {
            console.error(`Delete error: ${err.message}`);
            res.status(500).send('Server Error');
        });
};


const signinPagePost = async (req, res) => {
    const { userName, lastName, password } = req.body;
    if (!/^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+$/.test(userName)) {
        return res.json('گفتم باید از حروف استفاده کنی !')
    }
    if (!/^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+$/.test(lastName)) {
        return res.json('گفتم باید از حروف استفاده کنی !')
    }
    if (password.length < 6) {
        return res.json('بهت گفتم رمز باید بیشتر از 6 کاراکتر باشد')
    }

    try {
        // Hash password securely
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({ userName, lastName, password: hash });

        // Save user to database
        await newUser.save();
        // Set session variables (if using sessions)
        req.session.username = userName;
        req.session.lastname = lastName;

        res.status(201).redirect('/helma/'); // Assuming '/helma/' is the success redirect URL
    } catch (err) {
        console.error(`Error saving user: ${err.message}`);
        res.status(500).send({ message: 'Error creating user' });
    }

};

const login = async (req, res) => {
    const { userName2, lastName2, password2 } = req.body;

    try {
        if (userName2 === process.env.NAME && password2 === process.env.PASSWORD2) {
            res.session.love = userName2;
            res.session.girl = true;
            await res.redirect('/helma/later');
        }
    } catch {
        try {
            const user = await User.findOne({ userName: userName2, lastName: lastName2 }).lean();
            if (userName2 === process.env.ADMIN && password2 === process.env.PASSWORD) {
                req.session.admin = userName2;
                req.session.admin = true;
                res.redirect('/helma/admin');
            } else {
                if (!user) {
                    const { userName } = getUserData(req);
                    const additionalData = {
                        errText: 'حساب کاربری وجود ندارد'
                    };
                    return renderPage(req, res, 'singin_login', userName, 'ثبت نام', 'singin_login.css', 'singin_login.js', additionalData);
                } else {
                    const isMatch = await bcrypt.compare(password2, user.password);

                    if (isMatch) {
                        req.session.username = userName2;
                        req.session.lastname = lastName2;
                        res.redirect('/helma/'); // Assuming '/helma/' is the success redirect URL
                    }
                    else {
                        const { userName } = getUserData(req);
                        const additionalData = {
                            errText: 'رمز اشتباه است'
                        };
                        renderPage(req, res, 'singin_login', userName, 'ثبت نام', 'singin_login.css', 'singin_login.js', additionalData);
                    }
                };
            }

        } catch (error) {
            console.error(`Login error: ${error.message}`);
            res.status(500).send('Server Error');
        }
    }
};

const admin = async (req, res) => {
    if (req.session.admin) {
        try {
            const uuss = await Reservation.find({}).lean();
            const additionalData = {
                users: uuss,
            };
            renderPage(req, res, 'admin', 'تنظیمات', 'ادمین', 'admin.css', 'admin.js', additionalData);
        } catch (error) {
            console.error(`Admin error: ${error.message}`);
            res.status(500).send('Server Error');
        }
    } else {
        res.redirect('/helma/sign_in');
    }
};

const profilePagePost = async (req, res) => {
    const { firstName, lastName } = req.body;

    if (!firstName && !lastName) {
        return res.status(400).json({ message: 'First name and last name are required' });
    }

    try {
        const user = await User.findOne({ userName: req.session.username, lastName: req.session.lastname }).lean();
        const reservation = await Reservation.findOne({ reservedBy: req.session.username, lastName: req.session.lastname }).lean();
        if (!user) {
            return res.status(404).json({ message: `User with username ${req.session.username} not found` });
        }

        await User.findOneAndUpdate(
            { _id: user._id },
            { $set: { userName: firstName, lastName: lastName } },
            { new: false }
        );
        if (reservation) {
            await Reservation.updateMany(
                { reservedBy: reservation.reservedBy },
                { $set: { reservedBy: firstName, lastName: lastName } },
                { new: false }
            );
        }

        req.session.username = firstName;
        req.session.lastname = lastName;

        res.status(200).redirect('/helma/profile');
    } catch (error) {
        console.error(`Update error for user ${req.session.username}: ${error.message}`);
        res.status(500).json({ message: 'Error updating the user' });
    }
};

const change = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.session.username, lastName: req.session.lastname }).lean();
        const { password3 } = req.body;
        const isMatch2 = await bcrypt.compare(password3, user.password);

        if (isMatch2) {
            const additionalData = {
                lastName: user.lastName,
                reser: user.reserved,
                reserv: '',
                a: 0,
                c: 1,
            };
            renderPage(req, res, 'profile', user.userName, 'پروفایل', 'profile.css', 'profile.js', additionalData);
        } else {
            const additionalData = {
                lastName: user.lastName,
                reser: user.reserved,
                reserv: '',
                a: 0,
                c: 0,
            };
            renderPage(req, res, 'profile', user.userName, 'پروفایل', 'profile.css', 'profile.js', additionalData);
        }
    } catch (error) {
        console.error(`Change password error: ${error.message}`);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    homePage,
    aboutPage,
    profilePage,
    singPage,
    signinPagePost,
    login,
    admin,
    profilePagePost,
    change,
    deleted,
    valentain,
    starting,
    nexting,
    firsting, 
    meoo,
    formom,
};