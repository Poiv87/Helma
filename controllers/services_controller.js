// controller.js
const Reservation = require('../model/reservations.js');
const User = require('../model/user.js');

const date = new Date();
const dayNames = ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
 
const getDayName = (daysToAdd) => {
  const newDate = new Date();
  newDate.setDate(date.getDate() + daysToAdd);
  return dayNames[newDate.getDay()];
};

const dayName = getDayName(0); // Today
const dayName1 = getDayName(1); // Tomorrow
const dayName2 = getDayName(2); // Day after tomorrow

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

const araieshPage = async (req, res) => {
    const { userName } = getUserData(req);
    const query = {
        $or: [
            { date: dayName, time: { $in: ["11:00", "12:30", "2:00", "3:30"] } },
            { date: dayName1, time: { $in: ["11:00", "12:30", "2:00", "3:30"] } },
            { date: dayName2, time: { $in: ["11:00", "12:30", "2:00", "3:30"] } }
        ]
    };

    try {
        const reservations = await Reservation.find(query);
        const availability = {
            a1: 0, b1: 0, c1: 0, d1: 0,
            e1: 0, f1: 0, g1: 0, h1: 0,
            i1: 0, j1: 0, k1: 0, l1: 0
        };

        if (req.body.servic === reservations.services) {
            reservations.forEach((reservation) => {
                const { date, time, services } = reservation;
                switch (services) {
                    case "آرایش":
                        switch (time) {
                            case "11:00":
                                availability[date === dayName ? 'a1' : (date === dayName1 ? 'e1' : 'i1')] = 1;
                                break;
                            case "12:30":
                                availability[date === dayName ? 'b1' : (date === dayName1 ? 'f1' : 'j1')] = 1;
                                break;
                            case "2:00":
                                availability[date === dayName ? 'c1' : (date === dayName1 ? 'g1' : 'k1')] = 1;
                                break;
                            case "3:30":
                                availability[date === dayName ? 'd1' : (date === dayName1 ? 'h1' : 'l1')] = 1;
                                break;
                        }
                        break;

                    default:
                        break;
                }

            });


        }
        const additionalData = {
            dayName,
            dayName1,
            dayName2,
            ...availability,
        };
        return renderPage(req, res, 'page1', userName, 'آرایش', 'page1.css', 'page1.js', additionalData); 
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const nakhonPage = async (req, res) => {
    const { userName } = getUserData(req);
    const query = {
        $or: [
            { date: dayName, time: { $in: ["11:00", "12:30", "2:00", "3:30"] } },
            { date: dayName1, time: { $in: ["11:00", "12:30", "2:00", "3:30"] } },
            { date: dayName2, time: { $in: ["11:00", "12:30", "2:00", "3:30"] } }
        ]
    };

    try {
        const reservations = await Reservation.find(query);
        const availability = {
            a2: 0, b2: 0, c2: 0, d2: 0,
            e2: 0, f2: 0, g2: 0, h2: 0,
            i2: 0, j2: 0, k2: 0, l2: 0
        };

        if (req.body.servic === reservations.services) {
            reservations.forEach((reservation) => {
                const { date, time, services } = reservation;
                switch (services) {
                    case "ناخن":
                        switch (time) {
                            case "11:00":
                                availability[date === dayName ? 'a2' : (date === dayName1 ? 'e2' : 'i2')] = 1;
                                break;
                            case "12:30":
                                availability[date === dayName ? 'b2' : (date === dayName1 ? 'f2' : 'j2')] = 1;
                                break;
                            case "2:00":
                                availability[date === dayName ? 'c2' : (date === dayName1 ? 'g2' : 'k2')] = 1;
                                break;
                            case "3:30":
                                availability[date === dayName ? 'd2' : (date === dayName1 ? 'h2' : 'l2')] = 1;
                                break;
                        }
                        break;

                    default:
                        break;
                }

            });

        }
        const additionalData = {
            dayName,
            dayName1,
            dayName2,
            ...availability,
        };
        return renderPage(req, res, 'page2', userName, 'ناخن', 'page1.css', 'page1.js', additionalData);
    } catch (err) {
        console.log(err);
        throw err;
    }

}

const moPage = async (req, res) => {
    const { userName } = getUserData(req);
    const query = {
        $or: [
            { date: dayName, time: { $in: ["11:00", "12:30", "2:00", "3:30"] } },
            { date: dayName1, time: { $in: ["11:00", "12:30", "2:00", "3:30"] } },
            { date: dayName2, time: { $in: ["11:00", "12:30", "2:00", "3:30"] } }
        ]
    };

    try {
        const reservations = await Reservation.find(query);
        const availability = {
            a3: 0, b3: 0, c3: 0, d3: 0,
            e3: 0, f3: 0, g3: 0, h3: 0,
            i3: 0, j3: 0, k3: 0, l3: 0
        };
        if (req.body.servic === reservations.services) {
            reservations.forEach((reservation) => {
                const { date, time, services } = reservation;
                switch (services) {
                    case "رنگ و مدل مو":
                        switch (time) {
                            case "11:00":
                                availability[date === dayName ? 'a3' : (date === dayName1 ? 'e3' : 'i3')] = 1;
                                break;
                            case "12:30":
                                availability[date === dayName ? 'b3' : (date === dayName1 ? 'f3' : 'j3')] = 1;
                                break;
                            case "2:00":
                                availability[date === dayName ? 'c3' : (date === dayName1 ? 'g3' : 'k3')] = 1;
                                break;
                            case "3:30":
                                availability[date === dayName ? 'd3' : (date === dayName1 ? 'h3' : 'l3')] = 1;
                                break;
                        }
                        break;

                    default:
                        break;
                }

            });

        }
        const additionalData = {
            dayName,
            dayName1,
            dayName2,
            ...availability,
        };
        return renderPage(req, res, 'page3', userName, 'رنگ و مدل مو', 'page1.css', 'page1.js', additionalData);
    } catch (err) {
        console.log(err);
        throw err;
    }

}

const reservePost = (req, res) => {
    const { times1, times2, times3 } = req.body;
    const userId = req.session.username;

    if (!userId) {
        return res.json({ url: '/helma/sign_in' });
    }

    Reservation.findOne({ reservedBy: userId, services: req.body.servic })
        .then(existingReservation => {
            if (existingReservation) {
                return res.json({ url: '/helma/try_again' });
            }

            let reservation;
            const selectedTimes = [times1, times2, times3].find(Boolean);

            if (selectedTimes) {
                const reservationDate = selectedTimes === times1 ? dayName : (selectedTimes === times2 ? dayName1 : dayName2);
                reservation = new Reservation({
                    date: reservationDate,
                    time: selectedTimes,
                    reservedBy: userId,
                    lastName: req.session.lastname,
                    code: Math.floor(Math.random() * 9000) + 1000,
                    services: req.body.servic,
                });

                reservation.save()
                    .then(async () => {
                        res.json({ url: '/helma/ubfoeseor66EBetbrtb66tbtb6r' });
                        await User.findOneAndUpdate(
                            { userName: userId },
                            { $inc: { reserved: 1 } },
                            { new: true }
                        );


                    })

                    .catch(err => {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    });
            } else {
                res.status(400).send('زمان معتبری انتخاب نشده است.');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
}

const reserved = (req, res) => {
    const { userName } = getUserData(req);
    renderPage(req, res, 'reserved', userName , 'تایید رزرو', 'reserved.css', 'reserved.js');
}

const error = (req, res) => {
    const { userName } = getUserData(req);
    renderPage(req, res, 'err', userName, 'خطای رزرو', 'err.css', 'err.js');
}

module.exports = {
    araieshPage,
    nakhonPage,
    moPage,
    reserved,
    reservePost,
    error
}
