const accountModel = require('../../model/Account')
const bcrypt = require('bcryptjs');
class logginController {
        //get admin/login
        login(req,res,next){
            res.render('login')
          }
          
          //POST admin/login
          logged(req,res,next){
            
            accountModel.findOne({email: req.body.email},(err,result)=>{
              if(result)
              {
                if(!bcrypt.compareSync(req.body.password, result.password)|| result.type != 'admin') /*|| result.type != 'admin'*/
                {
                   res.render('login',{
                    error: result.type == 'admin'?'incorrect information of email or password':'you not is admin'
                   })
                }
                else
                {
                  
                  req.session.userId = result._id
                  res.redirect('/admin')
                }
      
              }
              else{
                res.render('login',{
                  error: 'incorrect information of email or password'
                 })
              }
      
             
              
             
            })
           
          }

          logout(req,res) {
            req.session.userId = null;
            res.redirect('/admin')
          }
      
}

module.exports = new logginController()