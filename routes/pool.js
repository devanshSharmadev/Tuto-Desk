var mysql=require('mysql');
// Use your credentials here
var pool=mysql.createPool({
    host:'',
    port:0,
    user:'',
    password:'',
    database:'tutodesk2',
    connectionLimit:'100'
});
module.exports=pool;
