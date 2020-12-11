var express = require('express');
var router = express.Router();
var upload=require("./multer")
var pool=require('./pool');
var passwordHash = require('password-hash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Signup', { title: 'Tutodesk - Signup',msg:'',msg1:'',msg2:'',msg3:'' });
});

router.post('/accountsetup', upload.single('adp'),function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  var c=0
  var un=req.body.auname
  if(req.body.apass!=req.body.avpass)
  {
    c=c+1;
    var msg1="* Password and Verified Password are not same ❌"
  }
  else{
    var msg1="* Valid Password 👍"
  }
  if(c==0)
  {
    pool.query("select * from users where username=?",[un],function(err,result){
      if(err)
      {console.log(err)}
      else{
        console.log(un)
        console.log(result)
        if(result.length==0)
        {
          console.log("Empty Array... Username can be created")
          pool.query("Select * from users where emailid=?",[req.body.email],function(err,result2){
            if(err)
            {console.log(err)}
            else{
              console.log(req.body.email)
              console.log(result2)
              if(result2.length==0)
              {
                console.log("Email Id doesn't exist, account can be created")
                var pass=req.body.apass
                var hashedPassword = passwordHash.generate(pass);
                console.log(pass,hashedPassword)
                pool.query("insert into users (name,username,password,emailid,type,image)values(?,?,?,?,?,?)",[req.body.aname,req.body.auname,hashedPassword,req.body.email,req.body.aradio,req.file.filename],function(err,result){
                  if(err){
                    console.log(err)
                    var msg="Failed to create Account ❌"
                    res.render('Signup',{ title: 'Tutodesk - Signup','msg':msg, msg1:msg1,msg2:'',msg3:'' });
                  }
                    var msg="Account Created 👍"
                    res.render('Signup',{ title: 'Tutodesk - Signup','msg':msg, msg1:msg1,msg2:'',msg3:'' });
                   
                })
                var tempbs=req.body.auname
                var bs1=tempbs+"b"
                var ns1=tempbs+"n"
                var ad1=tempbs+"ad"
                pool.query("CREATE TABLE `tutodesk2`.`?` ( `id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(45) NULL, `author` VARCHAR(45) NULL, `description` LONGTEXT NULL, `publication` VARCHAR(45) NULL, `type` VARCHAR(45) NULL, `image` VARCHAR(45) NULL, `book` VARCHAR(45) NULL, PRIMARY KEY (`id`))",[bs1],function(err,result){
                  if(err){
                    console.log(err)
                  }
                })
                pool.query("CREATE TABLE `tutodesk2`.`?` (`id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(45) NULL, `notes` LONGTEXT NULL, `label` VARCHAR(45) NULL,`bg` VARCHAR(45) NULL,`fg` VARCHAR(45) NULL, PRIMARY KEY (`id`))",[ns1],function(err,result){
                  if(err){
                    console.log(err)
                  }
                })
                pool.query("CREATE TABLE `tutodesk2`.`?` (`id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(45) NULL, `audio` LONGTEXT NULL, PRIMARY KEY (`id`))",[ad1],function(err,result){
                  if(err){
                    console.log(err)
                  }
                })

              }
              else
              {
                console.log("Id exists.. Try a different one")
                msg3="Id exists.. Try a different one"
                res.render('Signup',{ title: 'Tutodesk - Signup','msg':msg, msg1:msg1,msg2:'',msg3:msg3 });
              }
            }
          })
        }
        else
        {
          console.log("Username exists, Try a different one")
          msg2="Username exists, Try a different one"
          msg="Failed to create Account ❌"
          res.render('Signup',{ title: 'Tutodesk - Signup','msg':msg, msg1:msg1,msg2:msg2,msg3:'' });
        }
      }
    })
   
  }
  else
  {
    res.render('Signup', { title: 'Tutodesk - Signup',msg:'Failed to Create Account ❌',msg1:msg1,msg2:'',msg3:'' });

  }
  //res.render('Signup', { title: 'Tutodesk - Signup',msg:'',msg1:'',msg2:'',msg3:'' });
});

module.exports = router;