const Users = require('../model/Users')

function loggedUserData(req, res, next) {
    res.locals.logged = false;

    const emailInCookie = req.cookies.userEmail;
    const userFromCookie = Users.findUser(emailInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie
    }

    if (req.session.userLogged) {

        res.locals.logged = true;

    }

    next();
}

module.exports = loggedUserData