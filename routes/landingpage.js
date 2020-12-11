var express = require('express');
var router = express.Router();
var upload=require("./multer")
var pool=require('./pool');
var fs = require('fs');
var passwordHash = require('password-hash');
/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var week=days[d.getDay()];
	var day=d.getDate()
	var month=months[d.getMonth()];
  var year= d.getFullYear();
  if(week=="Monday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f1.txt').toString().split("\n");
    var img="d1.jpg"
  }
  else if(week=="Tuesday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f2.txt').toString().split("\n");
    var img="d2.jpg"
  }
  else if(week=="Wednesday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f3.txt').toString().split("\n");
    var img="d3.jpg"
  }
  else if(week=="Thursday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f4.txt').toString().split("\n");
    var img="d4.jpg"
  }
  else if(week=="Friday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f5.txt').toString().split("\n");
    var img="d5.jpg"
  }
  else if(week=="Saturday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f6.txt').toString().split("\n");
    var img="d6.jpg"
  }
  else if(week=="Sunday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f7.txt').toString().split("\n");
    var img="d7.jpg"
  }
  
  var qu=array[0]
  var qun=array[1]
  var fact=array[2]
  var word=array[3]
  var ex=array[4]
  var de=array[5]
  var syn=array[6]
  res.render('landingpage', { title: 'Tutodesk - Login',msg1:"",week:week,day:day,month:month,year:year,qu:qu,qun:qun,fact:fact,word:word,ex:ex,de:de,syn:syn,img:img });
});

router.post('/check',upload.single(''),function(req,res,next){

  // Landing Page Part..
  var d = new Date();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var week=days[d.getDay()];
	var day=d.getDate()
	var month=months[d.getMonth()];
  var year= d.getFullYear();
  if(week=="Monday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f1.txt').toString().split("\n");
    var img="d1.jpg"
  }
  else if(week=="Tuesday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f2.txt').toString().split("\n");
    var img="d2.jpg"
  }
  else if(week=="Wednesday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f3.txt').toString().split("\n");
    var img="d3.jpg"
  }
  else if(week=="Thursday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f4.txt').toString().split("\n");
    var img="d4.jpg"
  }
  else if(week=="Friday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f5.txt').toString().split("\n");
    var img="d5.jpg"
  }
  else if(week=="Saturday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f6.txt').toString().split("\n");
    var img="d6.jpg"
  }
  else if(week=="Sunday")
  {
    var array = fs.readFileSync('D:/Tutodesk2/server/public/images/f7.txt').toString().split("\n");
    var img="d7.jpg"
  }
  
  var qu=array[0]
  var qun=array[1]
  var fact=array[2]
  var word=array[3]
  var ex=array[4]
  var de=array[5]
  var syn=array[6]

  //landing page part end

  var unv=req.body.unv
  var passv=req.body.passv
  console.log(unv,passv)

  
  pool.query("select * from users where username=?",[unv],function(err,result){
    if(err)
    {
      console.log(err)
    }
    else
    {

      console.log(result)
      
      if(result.length==0)
      {
        console.log("Username not found")
  
        var msg1="Username Not Found !!!..Try to login again."
        res.render('landingpage', { title: 'Tutodesk - Login',msg1:msg1,week:week,day:day,month:month,year:year,qu:qu,qun:qun,fact:fact,word:word,ex:ex,de:de,syn:syn,img:img });
      }
      else
      {
        console.log(result[0].password)
        
        if(passwordHash.verify(passv, result[0].password))
        {
          req.session.SESSION_ADMIN=result
          //res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN});
          res.redirect('/')
        }
        else
        {
          console.log(result[0].password)
          console.log("Incorrect Password")
          var msg1="Incorrect Password"
          
          res.render('landingpage', { title: 'Tutodesk - Login',msg1:msg1,week:week,day:day,month:month,year:year,qu:qu,qun:qun,fact:fact,word:word,ex:ex,de:de,syn:syn,img:img});
        }
      }
    }
  })

  //res.render('home',{title:'Tutodesk'});
});



module.exports = router;
