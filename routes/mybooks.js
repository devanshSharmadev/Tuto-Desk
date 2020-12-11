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
    var id=req.query.id

    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {
        console.log(err)
      }
      else
      {
        console.log(result)
        console.log(result[0].username)
        tempas=result[0].username+"b"
        
        pool.query("select * from `tutodesk2`.`?`",[tempas],function(err2,booksc){  ``
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(booksc)
            res.render('mybooks',{title:'Tutodesk - My books',result:req.session.SESSION_ADMIN,books:booksc});
          }
        })
      }
    })

   // res.render('mybooks',{title:'Tutodesk - My books',result:req.session.SESSION_ADMIN,books:booksc});
  }
  
});

router.post('/search',upload.single(''),function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
   
    var id=req.query.id;
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {
        console.log(err)
      }
      else
      {
        console.log(result)
        console.log(result[0].username)
        var tempas=result[0].username+"b"
        var search="%"+req.body.search+"%"
        pool.query("select * from `tutodesk2`.`?` where name like ?",[tempas,search],function(err2,sbook){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(sbook)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:sbook});
            //res.render('mynotes',{title:'Tutodesk-My Notes',result:result,notes:notesN})
          }
        })  
  
        //res.render('mybooks',{title:'Tutodesk-Mybooks',result:result})
      }
    }) 

  }
  
});

router.get('/logout',function(req,res,next){
  req.session.destroy();
  res.redirect('/login')
  
  
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Action & Adventure' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Advice & How to' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Bestsellers' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Buisness' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Biographies' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Children's' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Contemporary Romance' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Education' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='History' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Horror' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Politics & Current events' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Religion' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
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
        tempas=result[0].username+"b"
        pool.query("select * from `tutodesk2`.`?` where type='Science' ",[tempas],function(err2,cbooks){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(cbooks)
            res.render('mybooks',{title:'Tutodesk - My Books',result:req.session.SESSION_ADMIN,books:cbooks});
          }
        })  
      }
    })
  }
  
});


module.exports = router;
