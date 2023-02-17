function isLogged(req, res, next) {

    if (req.session.userLogged) {
        return res.redirect('/admin/servicos/profile')
    }
    next();
}

module.exports = isLogged;