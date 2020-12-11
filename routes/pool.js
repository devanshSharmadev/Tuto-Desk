var mysql=require('mysql');
var pool=mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'pandit',
    database:'tutodesk2',
    connectionLimit:'100'
});
module.exports=pool;