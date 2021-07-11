function loginRequired(req, res, next) {
    if(!req.user){
        return res.redirect('admin/login')
    }
    next()
}
module.exports = loginRequired