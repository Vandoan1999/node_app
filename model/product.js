const mongoose = require('mongoose');
const dateFomat = require('../Middleware/dateFomat')

const productModel = mongoose.model('products',new mongoose.Schema({
    name:{type: String, required: true, maxlength: 100},
    description:{type: String,  maxlength: 500 , required: true},
    price:{type: Number, required: true},
    discount:{type: Number, default:0 ,max: 100},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categorys'},
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'brands' },
    rate:{type: Number, enum: [0,1,2,3,4,5], default: 0},
    numberRate:{type: Number,default:0},
    liked:{type:Number,default:0},
    sold:{type:Number,default:0},
    amount:{type:Number,default:0},
    image:{type:String, default:'default_product_image.png'},
    createdAt: String,
    updatedAt: String,
},
{ timestamps:  { currentTime: () => dateFomat()} }
))

if(mongoose.models['products']){
    module.exports = mongoose.model('products')
}
else{
    module.exports = productModel
}
