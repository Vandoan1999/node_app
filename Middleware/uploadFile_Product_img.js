var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload_product_img/')
    },
    filename: function (req, file, cb) {
      let extensionIMG = '.'+ file.mimetype.split('/')[1]
      cb(null, file.fieldname + '-' + Date.now()+extensionIMG)
    }
  })
   
var upload = multer({ storage: storage })

module.exports = upload