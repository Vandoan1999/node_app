const productModel = require("../../model/product");
const categoryModel = require("../../model/category");
const brandModel = require("../../model/brand");

// const {performance} = require('perf_hooks');
var fs = require("fs");

class productController {
  //get /create/product
  async create_product(req, res) {
    try {
      let listCategory = await categoryModel.find({});
      let listBrand = await brandModel.find({});
      await res.render("create_product", { listCategory, listBrand });
    } catch (err) {
      res.redirect("/admin/error");
    }
  }

  //post /create/product
  async created_product(req, res) {
    try {
      let Product_name = req.body.name.toLowerCase();
      let Product_description = req.body.description.toLowerCase();
      let Product_discount = req.body.discount;
      let Product_price = req.body.price;
      // Product_price =  Product_price - Math.round(Product_price * (Product_discount / 100) * 100) / 100;
      let Product_id_category = req.body.category;
      let Product_id_brand = req.body.brand;
      let Product_amount = req.body.amount;
      let Product_image = req.file && req.file.filename? req.file.filename : "default_product_image.png";
      let product = new productModel();
      product.name = Product_name;
      product.description = Product_description;
      product.price = Product_price;
      product.discount = Product_discount;
      product.category = Product_id_category;
      product.brand = Product_id_brand;
      product.amount = Product_amount;
      product.image = Product_image;
      await product.save();


      //create categorypomise to push id of product into category.products
      let categoryPomise = categoryModel.findById({ _id: product.category });  
      //create brandPomise to push id of product into brand.products
      let brandPomise = brandModel.findById({ _id: product.brand });
      let category = await categoryPomise
      let brand = await brandPomise
      category.products.push(product._id);
      await category.save();
      brand.products.push(product._id);
      await brand.save();

      res.redirect("/admin/product/create");
    } catch (e) {
      res.redirect("error");
    }
  }


  //delete admin/product/deleted
  async deleted_product(req, res) {
    
    try{
    let product_deleted_Pomise  = productModel.findByIdAndDelete({ _id: req.body.id });
    let listProductsPomise = productModel
        .find({})
        .populate({ path: "brand", select: "name" })
        .populate({ path: "category", select: "name" });
        
      let productDeleted = await product_deleted_Pomise ;
      let listProducts = await listProductsPomise;

      if(productDeleted.image != 'default_product_image.png')
      {
        fs.unlink(`upload_product_img/${productDeleted.image}`,function (err) {
          if (err)  throw "error delete img";
          console.log('File deleted!');
        });
      }

      let category = await categoryModel.findById({ _id: productDeleted.category})
     
      if(category){
        category.products.pull(productDeleted._id)
        category.save()
      }
      let brand = await brandModel.findById({ _id: productDeleted.brand})
      if(brand){
        brand.products.pull(productDeleted._id)
        brand.save()
      }
      res.render('table/tableProduct',{layout:false,listProducts})
    }catch{
      res.redirect('admin/error')
    }

   
  }

  //get product/update/id/:id
  async update_product(req, res) {
    let listCategoryPomise  =  categoryModel.find({});
    let listBrandPomise =  brandModel.find({});

    let productPomise = productModel
      .findById({ _id: req.params.id })
      .populate({ path: "brand", select: "name" })
      .populate({ path: "category", select: "name" });

    let listCategory = await listCategoryPomise
    let listBrand = await listBrandPomise
    let product = await productPomise
    res.render("update_product", { product, listCategory, listBrand });
  }

  //post  product/updated
  async updated_product(req, res) {
    try{

    
    let Product_name = req.body.name.toLowerCase();
    let Product_description = req.body.description.toLowerCase();
    let Product_price = req.body.price;
    let Product_discount = req.body.discount;
    // Product_price = Product_price - Math.round(Product_price * (Product_discount / 100) * 100) / 100;
    let Product_id_category = req.body.category; //id category
    let Product_id_brand = req.body.brand; //id brand
    let Product_amount = req.body.amount;
    let Product_image;
    let product_image_old = req.body.image_old;;

    if(req.file&&req.file.filename){
      Product_image = req.file.filename

      if(product_image_old!=='default_product_image.png')
      {
       
        fs.unlink(`upload_product_img/${product_image_old}`,function (err) {
          if (err) throw err;
          console.log('File deleted!');
        });
      }
    }
    else{
      Product_image = req.body.image_old;
    }

    let product_old = await productModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        name: Product_name,
        desciption: Product_description,
        price: Product_price,
        discount: Product_discount,
        category: Product_id_category,
        brand: Product_id_brand,
        amount: Product_amount,
        image: Product_image,
      }
    );
    
   //#region xóa tham chiếu của brand và category


    if(product_old.brand){
      let brand_old_pomise = brandModel.findById({_id:product_old.brand})//thìm ra brand cũ rồi xóa product đi
      let brand_new_pomise =  brandModel.findById({_id:Product_id_brand})// tìm ra brand mưới rồi thêm product vào
      let brand_old =  await brand_old_pomise
      let brand_new =  await brand_new_pomise

      if(brand_old){
        await brand_old.products.pull(product_old._id)
        await brand_old.save()
      }
      if(brand_new){
        await brand_new.products.push(req.body._id)
        await brand_new.save()
      }
    }

    if(product_old.category){
      let category_old_pomise = categoryModel.findById({_id:product_old.category}) //tim ra category cũ rồi xóa product đi
      let category_new_pomise = categoryModel.findById({_id:Product_id_category}) //tim ra category mới rồi thêm product vào

      let category_old = await category_old_pomise
      let category_new = await category_new_pomise
      if(category_old){
         category_old.products.pull(product_old._id)
        await category_old.save()
      }
      if(category_new){
         category_new.products.push(req.body._id)
        await category_new.save()
      }
    }
  //#endregion
   
  // xóa ảnh cũ nếu có
    
  
     res.redirect("/admin");
    } catch(err){
      res.json({err})
    }
  }
}

module.exports = new productController();
