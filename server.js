const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const static = require('serve-static');
const port = 3001;
const dbconfig = require('./config/dbconfig.json');
const Hashing = require('./API/encryt.js');
const cors= require('cors');
const { resolve } = require('path');

const pool = mysql.createPool({
    conncectionLimit: 10,
    host     : dbconfig.host,
    port : dbconfig.port,
    user     : dbconfig.user,
    password : dbconfig.password,
    database : dbconfig.database,
    debug :false
  });
  
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.use('/', static(path.join(__dirname, '')));
  app.use(cors());
  
app.post("/login", (req, res) => {
    console.log(`로그인 호출`);
    console.log(req.body.id);
    var id = req.body.id;
    var pw = req.body.pw;
    
   
    console.log("로그인 요청" + id,pw);
    pool.getConnection((err, conn)=> {
    if (err)
    {
        conn.release();
        console.log('mysql error');
        res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
        
        res.end();
        return;
    }
    let sendData;
    const exec = conn.query('select `id`, `pw` ,`spw` from `users` where `id` = (?)',
        [id],
        (err,rows) => {
            conn.release();
            console.log('실행된 쿼리 : '+exec.sql);
        if(err){
            console.dir(err);
            res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'});
            res.write('<h2>실패<h/2>');
            res.end();
            return;
        }
        if(rows.length == 0)
        {
            console.log('아이디 [%s], 아이디가 일치x', id)
                res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                res.write('<h2>로그인 실패입니다.<h/2>');
                res.end();
        }

        else if(rows.length > 0 ){
           
            var hashpassword;
            console.log("%s", rows[0].spw);
            console.log("%s", rows[0].pw);
            hashpassword=Hashing.ReHash(pw, rows[0].spw);//쉣~~~
            console.log("%s", hashpassword);
            if(rows[0].pw === hashpassword)
            {
                console.log('아이디 [%s], 패스워드가 일치하는 이름 [%s] 찾음', id);
                res.end();
            }
            else {
                console.log('아이디 [%s], 패스워드가 일치x', id)
                res.end();
                return;            
        }          
        }
        
    }
    );
  })
});

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});


