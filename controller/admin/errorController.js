class errorController {
    //get admin/error
    error(req,res){
        res.render('error')
    }
 
}

module.exports = new errorController()

