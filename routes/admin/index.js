const express = require('express');
const router = express.Router();
const upload_Account_img = require('../../Middleware/uploadFile_account_img')
const upload_product_img = require('../../Middleware/uploadFile_Product_img')
const upload_category_img = require('../../Middleware/uploadFile_Category_img')
const loginRequired = require('../../Middleware/loginRequired')

const adminHomeController =  require('../../controller/admin/adminHomeController')
const logginController =  require('../../controller/admin/logginController')
const registerController =  require('../../controller/admin/registerController')
const categoryController = require('../../controller/admin/categoryController')
const productController = require('../../controller/admin/productController')
const brandController = require('../../controller/admin/brandController');
const errorController = require('../../controller/admin/errorController');
/* GET home page. */

router.get('/',loginRequired, adminHomeController.index);

/* GET loggin page. */
router.get('/login' ,logginController.login);
router.post('/logged' ,logginController.logged);
router.get('/logout' ,logginController.logout);

/* GET register page. */
router.get('/register',registerController.register);
router.post('/register',upload_Account_img.single('avatar'), registerController.registered);

/* GET create product page. */
router.get('/product/create',  productController.create_product);
router.get('/product/update/id/:id',productController.update_product);
router.patch('/product/updated',upload_product_img.single('image_product'),productController.updated_product);
router.post('/product/create',upload_product_img.single('image_product'),  productController.created_product);
router.delete('/product/deleted',productController.deleted_product);

/* GET create category page. */
router.get('/category/create',  categoryController.create_category);
router.post('/category/create',upload_category_img.single('image-category'),  categoryController.created_category);
router.delete('/delete/category', categoryController.deleted_category);
router.get('/category/update/id/:id', categoryController.update_category);
router.patch('/category/updated',upload_category_img.single('image-category'), categoryController.updated_category);
/*  */
router.get('/brand/create',  brandController.create_brand);
router.post('/brand/create',  brandController.created_brand);
router.delete('/brand/deleted',brandController.deleted_brand)
router.get('/brand/update/id/:id',brandController.update_brand)
router.patch('/brand/updated',brandController.updated_brand)

router.delete('/delete/account', adminHomeController.delete_account)
router.patch('/resetpassword/account', adminHomeController.reset_password_account)

router.get('/error',errorController.error)


module.exports = router;
