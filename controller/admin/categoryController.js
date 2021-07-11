const productModel = require('../../model/product')
const categoryModel = require("../../model/category");
var fs = require('fs');
class categoryController {

  //get create/category
  create_category(req, res, next) {
    res.render("create_category");
  }

  //post /create/category
  async created_category(req, res, next) {
    let categoryName = req.body.name
    let image_category = req.file&&req.file.filename?req.file.filename: 'default_category_image.png'
    let category = new categoryModel();
    category.name = categoryName.toLowerCase();
    category.image = image_category
    await category.save((err, result) => {
      if (err) res.json(err);
      else {
        res.redirect("/admin/category/create");
      }
    });
  }

  async deleted_category(req,res) {
    try{
      let  category_deleted_pomise = categoryModel.findByIdAndDelete({_id: req.body.id})
      let listCategorys_pomise = categoryModel.find({})
      let category_deleted =  await category_deleted_pomise
      let listCategorys = await listCategorys_pomise
      await productModel.find({}).where({category: category_deleted._id}).updateMany({category: null})  //cập nhật lại liên kết giữa category và product

      if(category_deleted.image != 'default_category_image.png')
      {
        fs.unlink(`uploaded_category_img/${category_deleted.image}`,function (err) {
          if (err) throw err;
          console.log('File deleted!');
        });
      }
      res.render('table/tableCategory',{listCategorys, layout: false})
    }catch{
      res.redirect('/admin/error')
    }
  }

  async update_category(req,res) {
    try{
      let category = await categoryModel.findById(req.params.id)
     
      res.render('update_category',{category})
    }catch(err){
      res.send(err)
    }
  }

  async updated_category(req,res){
    try{
      let image_category;
      let image_category_old = req.body.image_old;
      if(req.file&&req.file.filename){

        image_category = req.file.filename

        if(image_category_old != 'default_category_image.png')
        {
          fs.unlink(`uploaded_category_img/${image_category_old}`,function (err) {
            if (err) throw err;
            console.log('File deleted!');
          });
        }
      }
      else{
        image_category = image_category_old
      }
      await categoryModel.findByIdAndUpdate(req.body._id,{name: req.body.name, image: image_category})    

      
      res.redirect('/admin')
    }catch{
      res.redirect('/admin/error')
    }
  }
}

module.exports = new categoryController()

