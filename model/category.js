const mongoose = require('mongoose');
const dateFomat = require('../Middleware/dateFomat')


const categoryModel = mongoose.model('categorys',new mongoose.Schema({
    name: { type:String,required:true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
    image: {type:String, required: true, default:'default_category_image.png'},
    createdAt: String,
    updatedAt: String,
},
{
    timestamps:  { currentTime: () => dateFomat()}  
}
))




if(mongoose.models['categorys']){
    module.exports = mongoose.model('categorys')
}
else{
    module.exports = categoryModel
}
