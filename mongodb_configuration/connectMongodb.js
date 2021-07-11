const mongoose = require('mongoose');
async function connect(){
   await mongoose.connect('mongodb://127.0.0.1/OnlineShop', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
   });
}

module.exports = connect;