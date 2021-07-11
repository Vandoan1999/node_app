const mongoose = require('mongoose');
const dateFomat = require('../Middleware/dateFomat')
const accountModel = mongoose.model('accounts',new mongoose.Schema({
    email: {type: String , required: true, unique: true, maxlength: 100},
    password: {type: String , required: true,maxlength: 100 ,minlength:1},
    type: {type: String ,  enum: ['admin', 'customer'],default: 'customer'},
    image: {type: String , default:'default_image.png'},
    createdAt: String,
    updatedAt: String,
},
{ timestamps:  { currentTime: () => dateFomat()} }
))

if(mongoose.models['accounts']){
    module.exports = mongoose.model('accounts')
}
else{
    module.exports = accountModel
}


