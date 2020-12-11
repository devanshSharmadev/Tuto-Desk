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
    pool.query("select * from bookcloud",function(err2,booksc){
      if(err2)
      {
        console.log(err2)
      }
      else
      {
        console.log(booksc)
        res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:booksc});
      }
    })
    
  }
  
});

router.get('/editprofile',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    res.render('editprofile',{title:'Tutodesk-Edit Profile',result:req.session.SESSION_ADMIN,msg:"",msg1:''});
  }
  
});

router.post('/editprofilesetup',upload.single(''),function(req,res){
  console.log(req.body)
  console.log(req.body.btn)
  
  if(req.body.btn=="Edit")
  {
    console.log("h4")
    console.log(req.body)
    pool.query("select * from users where id=?",[req.body.userid],function(err,result){
      if(err)
      {
        console.log(err)
      }
      else
      {
        console.log("h5")
        if(result[0].username!=req.body.auname)
        {
          var un=result[0].username
          var bs1=un+"b"
          var ns1=un+"n"
          var ad1=un+"ad"
          console.log("h6")
          console.log(req.body.auname)
            pool.query("select * from users where username=?",[req.body.auname],function(err,result3){
              if(err)
              {
                console.log(err)
              }
              else
              {
                console.log(result3)
                console.log(result3.length)
                console.log("h9")
                if(result3.length!=0){
                  console.log("h10")
                  req.session.SESSION_ADMIN=result
                res.render('editprofile',{title:'Tutodesk-Edit Profile',result:req.session.SESSION_ADMIN,msg:"",msg1:"username already existed try a different one"});
                }
                else
                {
                  console.log("h11")
                  pool.query("update users set name=?,username=?,emailid=? where id=?",[req.body.aname,req.body.auname,req.body.email,req.body.userid],function(err,result2){
  
                    if(err){
                      console.log(err)
                    }
                    else
                    {
                  
                      console.log("h3")
                      pool.query("select * from users where id=?",[req.body.userid],function(err,result4){
                        if(err)
                        {
                          console.log(err)
                        }
                        else
                        {
                          console.log("h12")
                          console.log(result4)
                          req.session.SESSION_ADMIN=result4
                          var un2=req.body.auname
                          var bs2=un2+"b"
                          var ns2=un2+"n"
                          var ad2=un2+"ad"
                          pool.query("ALTER TABLE `tutodesk2`.`?` RENAME TO `tutodesk2`.`?`  ",[bs1,bs2],function(err,result){
                            if(err){
                              console.log(err)
                            }
                          })
                          pool.query("ALTER TABLE `tutodesk2`.`?` RENAME TO `tutodesk2`.`?`  ",[ns1,ns2],function(err,result){
                            if(err){
                              console.log(err)
                            }
                          })
                          pool.query("ALTER TABLE `tutodesk2`.`?` RENAME TO `tutodesk2`.`?`  ",[ad1,ad2],function(err,result){
                            if(err){
                              console.log(err)
                            }
                          })

                          res.render('editprofile',{title:'Tutodesk-Edit Profile',result:req.session.SESSION_ADMIN,msg:"Profile Updated",msg1:''});


                        }
                      })
                      
                      //res.render('editprofile',{title:'Tutodesk-Edit Profile',result:req.session.SESSION_ADMIN,msg:"Profile Updated",msg1:''});
                      
                      


                    }
                  })

                }
              }
            })
        }
        else
        {
          console.log("h1")
          if(req.body.apass!=''&& req.body.avpass!='')
          {
            //Which means he has changed password
            console.log("h2")
          }
          else
          {
            console.log("h7")
            pool.query("update users set name=?,username=?,emailid=? where id=?",[req.body.aname,req.body.auname,req.body.email,req.body.userid],function(err,result2){
  
              if(err){
                console.log(err)
              }
              else
              {
                console.log("h3")
                pool.query("select * from users where id=?",[req.body.userid],function(err,result5){
                  if(err)
                  {
                    console.log(err)
                  }
                  else
                  {
                    console.log("h15")
                    console.log(result5)
                    req.session.SESSION_ADMIN=result5
                    res.render('editprofile',{title:'Tutodesk-Edit Profile',result:req.session.SESSION_ADMIN,msg:"Profile Updated",msg1:''});
                  }
                })
                
              }
            })

          }
        }
      }

    })
    
}
else if(req.body.btn=="Delete"){

  pool.query("delete from users where id=?",[req.body.userid],function(err,result){
  
    if(err){
      console.log(err)
      res.redirect("/editprofile")
    }
    else
    {
      console.log(req.body.auname)
      var un=req.body.auname
      var bs1=un+"b"
      var ns1=un+"n"
      var ad1=un+"ad"
      pool.query("DROP TABLE `tutodesk2`.`?`;",[bs1],function(err,result5){
  
        if(err){
          console.log(err)
        }
      })

      pool.query("DROP TABLE `tutodesk2`.`?`;",[ns1],function(err,result5){
  
        if(err){
          console.log(err)
        }
      })

      pool.query("DROP TABLE `tutodesk2`.`?`;",[ad1],function(err,result5){
  
        if(err){
          console.log(err)
        }
      })

      res.redirect("/logout")
  
    }
  })
}
console.log("h8")
})



router.get('/logout',function(req,res,next){
  req.session.destroy();
  res.redirect('/login')
  
  
});

router.get('/aboutus',function(req,res,next){
  res.render('aboutus',{title:'Tutodesk-About us'});
  
  
});

router.post('/editpicture',upload.single('edpicture'),function(req,res){
  console.log(req.body.userid)
  console.log(req.file)
  pool.query("update users set image=? where id=?",[req.file.filename,req.body.userid],function(err,result){

  if(err){
    console.log(err)
    res.redirect("/editprofile")
  }
  else
  {
    res.redirect("/editprofile")

  }
})

})

router.post('/add',upload.any('bcoverpage','bookpdf'),function(req,res,next){
  var id=req.query.id
  console.log(id)
  console.log(req.body)
  console.log(req.files)
  pool.query("select * from users where id=?",[id],function(err,result){
    if(err)
    {
      console.log(err)
    }
    else
    {
      var tempun=result[0].username+'b'
      pool.query("insert into bookcloud (name,author,description,publication,type,image,book)values(?,?,?,?,?,?,?)",[req.body.bname,req.body.baname,req.body.bookdes,req.body.bpub,req.body.booktype,req.files[0].filename,req.files[1].filename],function(err,result){
        if(err){
          console.log(err)          
        }
      })

      pool.query("insert into `tutodesk2`.`?` (name,author,description,publication,type,image,book)values(?,?,?,?,?,?,?)",[tempun,req.body.bname,req.body.baname,req.body.bookdes,req.body.bpub,req.body.booktype,req.files[0].filename,req.files[1].filename],function(err,result){
        if(err){
          console.log(err)          
        }
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"+"Book Submitted to"+tempun)
      })
      res.redirect("/")
    }
  })
})

router.post('/search',upload.single(''),function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
   
    var search="%"+req.body.search+"%"
        pool.query("select * from bookcloud where name like ?",[search],function(err2,sbook){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(sbook)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:sbook});
            //res.render('mynotes',{title:'Tutodesk-My Notes',result:result,notes:notesN})
          }
        })  

  }
  
});

router.get('/aa',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Action & Adventure' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/bu',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Buisness' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/ah',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Advice & How to' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/bs',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Bestsellers' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/bi',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Biographies' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/ch',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Children\'s' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/cr',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Contemporary Romance' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/ed',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Education' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/ht',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='History' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/ho',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Horror' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/pc',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Politics & Current events' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/rg',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Religion' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});

router.get('/sc',function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        pool.query("select * from bookcloud where type='Science' ",function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('home',{title:'Tutodesk',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});


module.exports = router;
