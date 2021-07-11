const brandModel = require('../../model/brand')
const productModel = require('../../model/product')
class brandController{
     create_brand(req, res, next){
        res.render('create_brand')
        
    }
    created_brand(req, res, next){
        let brand_name = req.body.name
        let brand = new brandModel()
        brand.name = brand_name.toLowerCase()
        brand.save((err,result)=>{
            if(err) res.json(err)
            res.redirect('/admin/brand/create')
        })
    }

    async deleted_brand(req,res){
        try{

            let brand_deleted = await brandModel.findByIdAndDelete({_id: req.body.id})
            await productModel.find({}).where({brand: brand_deleted._id}).updateMany({brand: null})
            let listBrands = await brandModel.find({})
            res.render('table/tableBrand',{listBrands,layout:false})
        }catch{
            res.redirect('admin/error')
        }
    }

    async update_brand(req, res){
        let brand =  await brandModel.findById(req.params.id);
        res.render('update_brand',{brand})
    }

    async updated_brand(req, res){
        try{
            await brandModel.findByIdAndUpdate(req.body._id,{name: req.body.name})
            res.redirect('/admin')
        }catch{
            res.redirect('/admin/error')
        }
    }
}

module.exports = new brandController();