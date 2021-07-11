const mongoose = require('mongoose');
const dateFomat = require('../Middleware/dateFomat')
const brandModel = mongoose.model('brands',new mongoose.Schema({
    name: { type:String,required:true,maxlength: 100,minlength:3},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
    createdAt: String,
    updatedAt: String,
},
{ timestamps:  { currentTime: () => dateFomat()}   }
))

if(mongoose.models['brands']){
    module.exports = mongoose.model('brands')
}
else{
    module.exports = brandModel
}
