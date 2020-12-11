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
    console.log("///////////////////////////////////////////////"+req.body.showlabel+"/////////////////////////////")
    pool.query("select * from users where id=?",[id],function(err,result){
      if(err)
      {console.log(err)}
      else{
        var tempbs=result[0].username
        var ns1=tempbs+"n"
        console.log(ns1)
        pool.query("select * from `tutodesk2`.`?`",[ns1],function(err2,notesN){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(notesN)
            res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN,notes:notesN});
            //res.render('mynotes',{title:'Tutodesk-My Notes',result:result,notes:notesN})
          }
        })  
      }
    })
    //res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN});
  }
  
});

router.get('/y',function(req,res,next){
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
        var ns1=tempbs+"n"
        console.log(ns1)
        pool.query("select * from `tutodesk2`.`?` where label=1",[ns1],function(err2,notesN){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(notesN)
            res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN,notes:notesN});
            //res.render('mynotes',{title:'Tutodesk-My Notes',result:result,notes:notesN})
          }
        })  
      }
    })
    //res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN});
  }
  
});

router.get('/r',function(req,res,next){
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
        var ns1=tempbs+"n"
        console.log(ns1)
        pool.query("select * from `tutodesk2`.`?` where label=2",[ns1],function(err2,notesN){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(notesN)
            res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN,notes:notesN});
            //res.render('mynotes',{title:'Tutodesk-My Notes',result:result,notes:notesN})
          }
        })  
      }
    })
    //res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN});
  }
  
});

router.get('/b',function(req,res,next){
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
        var ns1=tempbs+"n"
        console.log(ns1)
        pool.query("select * from `tutodesk2`.`?` where label=3",[ns1],function(err2,notesN){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(notesN)
            res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN,notes:notesN});
            //res.render('mynotes',{title:'Tutodesk-My Notes',result:result,notes:notesN})
          }
        })  
      }
    })
    //res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN});
  }
  
});

router.get('/g',function(req,res,next){
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
        var ns1=tempbs+"n"
        console.log(ns1)
        pool.query("select * from `tutodesk2`.`?` where label=4",[ns1],function(err2,notesN){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(notesN)
            res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN,notes:notesN});
            //res.render('mynotes',{title:'Tutodesk-My Notes',result:result,notes:notesN})
          }
        })  
      }
    })
    //res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN});
  }
  
});

router.post('/add',upload.single(''),function(req,res,next){
  
  console.log(req.body)
  console.log(req.query.id)
  var id=req.query.id
  pool.query("select * from users where id=?",[id],function(err,result){
    if(err)
    {console.log(err)}
    else{
      var tempbs=result[0].username
      var ns1=tempbs+"n"
      console.log(ns1)
      if(req.body.label==1){
        var bg='#e1b12c'
        var fg='#fbc531'
      }
      else if(req.body.label==2){
        var bg='#c23616'
        var fg='#e84118'
      }
      else if(req.body.label==3){
        var bg='#0097e6'
        var fg='#00a8ff'
      }
      else if(req.body.label==4){
        var bg='#44bd32'
        var fg='#4cd137'
      }
      pool.query("insert into `tutodesk2`.`?` (title,notes,label,bg,fg)values(?,?,?,?,?)",[ns1,req.body.titlen,req.body.Notes,req.body.label,bg,fg],function(err,result){
        if(err){
          console.log(err)          
        }
        else{
          //console.log(result)
          res.redirect('/mynotes?id='+id)
        }
      })
    }
  })
 // res.redirect('/mynotes?id='+id)
});

router.get('/logout',function(req,res,next){
  req.session.destroy();
  res.redirect('/login')
  
  
});


router.post('/edit',upload.single(''),function(req,res,next){

  console.log(req.body)
  var id=req.query.id
  var un=req.body.noteun+"n"
  if(req.body.btn=='Edit'){
    pool.query("update `tutodesk2`.`?` set title=?,notes=? where id=?",[un,req.body.titlen,req.body.Notes,req.body.noteid],function(err,result){
  
      if(err){
        console.log(err)
        res.redirect('/mynotes?id='+id)
      }
      else
      {
        res.redirect('/mynotes?id='+id)
    
      }
    })
  }
  else if(req.body.btn=="Delete")
  {


    pool.query("delete from `tutodesk2`.`?`  where id=?",[un,req.body.noteid],function(err,result){
  
      if(err){
        console.log(err)
        res.redirect('/mynotes?id='+id)      
      }
      else
      {
        res.redirect('/mynotes?id='+id)    
      }
    })



  }
  
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
        var ns1=tempbs+"n"
        console.log(ns1)
        var search="%"+req.body.search+"%"
        pool.query("select * from `tutodesk2`.`?` where title like ?",[ns1,search],function(err2,notesN){
          if(err2)
          {
            console.log(err2)
          }
          else
          {
            console.log(notesN)
            res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN,notes:notesN});
            //res.render('mynotes',{title:'Tutodesk-My Notes',result:result,notes:notesN})
          }
        })  
      }
    })
    //res.render('mynotes',{title:'Tutodesk - My Notes',result:req.session.SESSION_ADMIN});
  }
  
});
module.exports = router;
