const e = require('express');
var express = require('express');
var router = express.Router();
var upload=require("./multer")
var pool=require('./pool');
/* GET home page. */
router.get('/',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    res.render('tutodeskapps',{title:'Tutodesk - Apps',result:req.session.SESSION_ADMIN});
  }
  
});

router.get('/logout',function(req,res,next){
  req.session.destroy();
  res.redirect('/login')
  
  
});

module.exports = router;
