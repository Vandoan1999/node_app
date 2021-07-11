const accountModel = require('../../model/Account')
const bcrypt = require('bcryptjs');
class registerController {
  async register(req, res, next) {
   await accountModel.findOne({ type: "admin" }, (err, account) => {
      if (!account) {
        res.render("register", { adminType: true });
      } else res.render("register", { adminType: false});
    });
  }

  //POST admin/register
  async registered(req, res, next) {
    try{

        var salt =  await bcrypt.genSalt(8);
        var hash =  await bcrypt.hash(req.body.password, salt);
        let Account = new accountModel();
        Account.email = req.body.email;
        Account.password = hash;
        Account.type = req.body.type === "" ? "customer" : req.body.type;
        Account.image = req.file&&req.file.filename ? req.file.filename: "default_image.png"
        await Account.save(); 
        await res.redirect("/admin");
    } catch (e) {
      res.render("error");
    }
    
   
  }
  
}
module.exports = new registerController()