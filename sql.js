
const mysql      = require('mysql');
const dbconfig = require('./config/dbconfig.json');
/* 노드 js와 mysql 서버를 떨어트릴경우 conn 상태를 유지하기 위함 */
/*const pool = mysql.createPool({
  conncectionLimit: 10,
  host     : 'ip ',
  port : 3306,
  user     : 'root',
  password : 'cancer3652!@',
  database : 'test',
  debug :false
});*/
//json 파일로 정보를 넘김.
const conn = mysql.createConnection({
  host     : dbconfig.host,
  port : dbconfig.port,
  user     : dbconfig.user,
  password : dbconfig.password,
  database : dbconfig,database
});

function check(command){
 
  
}


conn.connect();


conn.end();