const productModel = require('../../model/product')
const categoryModel = require('../../model/category')
class productHomeController{
   async index(req,res){
       let listProduct = await productModel.find({})
       let listCategory = await categoryModel.find({}) 
       res.render('index',{
           listProduct,
           listCategory
       })
   }
}

module.exports = new productHomeController();