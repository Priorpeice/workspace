const mysql = require('mysql');
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
const pool = mysql.createPool({
  conncectionLimit: 10,
  host     : dbconfig.host,
  port : dbconfig.port,
  user     : dbconfig.user,
  password : dbconfig.password,
  database : dbconfig.database,
  debug :false
});

function checkUser(id){
return new Promise((resolve, reject)=> {
  pool.getConnection((err, conn)=> {
  if (err)
  {
      conn.release();
      reject({'f' : 'fail'});
      return;
  }
  const exec = 'select `id`, `pw` ,`spw` from `users` where `id` = (?)';//command로 받기
  const params =  [id];

  conn.query(exec, params, (err,rows)=> { //rows는 성공 했을때만
    conn.release();
    if(err)  {
      reject();
      return ;
    }
    console.log('실행된 쿼리 : '+ exec);// sql 속성을 사용할 필요가 없음
    resolve(rows);
  })
});
});
}



module.exports = {check :checkUser};