const accountModel = require("../../model/Account");
const categoryModel = require("../../model/category");
const brandModel = require("../../model/brand");
const productModel = require("../../model/product");
const bcrypt = require('bcryptjs');
var fs = require('fs');
class adminHomeController {
  //get admin/index
  async index(req, res, next) {
  
    try {
      let listAccounts = await accountModel.find({});
      let listCategorys = await categoryModel.find({})
     
      let listBrands = await brandModel.find({});
      let listProducts = await productModel.find({})
      .populate({path: 'brand',select: 'name'})
      .populate({path: 'category',select: 'name'})
      .exec();
 
      
       res.render('index',{
          listAccounts,
          listCategorys,
          listBrands,
          listProducts
      })
    }
    catch (error) {
      res.json(error)
    }
  }


  //Post admin/delete/account
  async delete_account(req, res){
    try{
        let accountDeleted = await accountModel.findByIdAndDelete({_id: req.body.id})
        let listAccounts = await accountModel.find({});
        if(accountDeleted.image != 'default_image.png')
        {
          fs.unlink(`uploaded_account_img/${accountDeleted.image}`,function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
        }
        res.render('table/tableAdmin',{ layout: false ,listAccounts})

    }
    catch{
      res.json({status:'err'})
    }
  }

   //Post admin/resetpassword/account
   async reset_password_account(req,res) {
    try{
      var salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync('1', salt);
      await accountModel.findByIdAndUpdate({_id:req.body.id},{password: hash})
      let listAccounts = await accountModel.find({});
      res.render('table/tableAdmin',{ layout: false ,listAccounts})
      
    }
    catch{
      res.json({status: 'error'})
    }
  }
  
   
  
}





module.exports = new adminHomeController();
