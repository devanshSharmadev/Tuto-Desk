const e = require('express');
var express = require('express');
var router = express.Router();
var upload=require("./multer")
var pool=require('./pool');
var say = require("say");
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
      {console.log(err)}
      else{
        var tempbs=result[0].username
        var ad1=tempbs+"ad"
        console.log(ad1)
        pool.query("select * from `tutodesk2`.`?`",[ad1],function(err2,audios){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(audios)
            res.render('myaudiobooks',{title:'Tutodesk-My Audiobooks',result:req.session.SESSION_ADMIN,audios:audios});
          }
        })  
      }
    })
  }
  
});


router.post('/add',upload.single(''),function(req,res,next){
  console.log(req.body)
  var id=req.query.id
  var filename = "./public/audios/"+req.body.titleau+".wav"
  var un=req.body.audioun+"ad"

say.export(req.body.audi, '', 0.75, filename, function(errad) {
    if (errad) {
        return console.error(err);
    }

    else{
      pool.query("insert into `tutodesk2`.`?` (title,audio)values(?,?)",[un,req.body.titleau+".wav",req.body.audi],function(err,result){
        if(err){
          console.log(err)          
        }
        else{
          //res.render('myaudiobooks',{title:'Tutodesk-My Audio Books',result:result})
          res.redirect('/myaudiobooks?id='+id)
        }
      })
    }
    console.log(`Text has been saved to ${filename}`);
});
  //res.redirect('/myaudiobooks?id='+id)
  
});

router.get('/logout',function(req,res,next){
  req.session.destroy();
  res.redirect('/login')
  
  
});

router.post('/delete',upload.single(''),function(req,res,next){
  var id=req.query.id
  console.log("///////////////////////////////////////////////"+req.body.btn)
  console.log(req.query.id)
  pool.query("select * from users where id=?",[id],function(err,result){
    if(err)
    {console.log(err)}
    else{
      var tempbs=result[0].username
      var ad1=tempbs+"ad"
      console.log(ad1)

      pool.query("delete from `tutodesk2`.`?`  where id=?",[ad1,req.body.btn],function(err,result5){
  
        if(err){
          console.log(err)
          res.redirect('/myaudiobooks?id='+id)   
        }
        else
        {
          res.redirect('/myaudiobooks?id='+id)  
        }
      })

      
        
    }
  })
  

})

router.post('/search',upload.single(''),function(req,res,next){
  if(req.session.SESSION_ADMIN==null)
  {
    res.redirect("/login")
  }
  else{
    var id=req.query.id
    console.log("///////////////////////////////////////////////"+req.body.showlabel+"/////////////////////////////")
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        var tempbs=result[0].username
        var ns1=tempbs+"ad"
        console.log(ns1)
        var search="%"+req.body.search+"%"
        pool.query("select * from `tutodesk2`.`?` where title like ?",[ns1,search],function(err2,audios){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(audios)
            res.render('myaudiobooks',{title:'Tutodesk-My Audiobooks',result:req.session.SESSION_ADMIN,audios:audios});
            //res.render('mynotes',{title:'Tutodesk-My Notes',result:result,notes:notesN})
          }
        })  
      }
    })
    //res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN});
  }
  
});



module.exports = router;
