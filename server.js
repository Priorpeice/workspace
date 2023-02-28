const express = require('express');
const path = require('path');
const app = express();
// const static = require('serve-static');
const port = 3001;
const Hashing = require('./API/encryt.js');
const cors= require('cors');
const cookieParser = require('cookie-parser');
const token = require('./maketoken.js');
const router =express.Router();
const sql= require('./sql.js');

  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, './frontend/build')));//static resource 사용할 폴더 지정! html, css, js 
  app.use(express.urlencoded({extended: true}))//json 파싱
  app.use(express.json())//json 파싱
//   app.use('/', static(path.join(__dirname, '')));//static resource 사용할 폴더 지정! html, css, js 
  app.use(cors());//다른 port 연결하기 위한 cors 정책 뚫기 위함 
  
app.post("/login", (req, res) => {
    console.log(`로그인 호출`);
    console.log(req.body.id);
    var id = req.body.id;
    var pw = req.body.pw;
    
   console.log("로그인 요청" + id,pw);
   sql.check(id)
   .then((rows)=> { if(rows.length == 0)
    {
        console.log('아이디 [%s], 아이디가 일치x', id)
        res.send({'f' : 'fail'});
        res.end();
        return;
    }

    else if(rows.length > 0 ){
       
        var hashpassword;
        console.log("%s", rows[0].spw);
        console.log("%s", rows[0].pw);
        hashpassword=Hashing.ReHash(pw, rows[0].spw);//쉣~~~
        console.log("%s", hashpassword);
        if(rows[0].pw === hashpassword)
        {
            try{
                //  access token sign({ 사용자 정보  })
                const accessToken = token.Gat(rows[0].id);
                const refreshToken= token.Grt(rows[0].id);
                //token 전송
                res.cookie("accessToken", accessToken, {
                    secure : false,
                    httpOnly: true,
                });
                res.cookie("refreshToken", refreshToken, {
                    secure : false,
                    httpOnly: true,   
                }
                );
                console.log('아이디 [%s], 패스워드가 일치하는 이름 [%s] 찾음', id);
                res.status(200).json({'s':'success'});
                }
                catch(error){
                    console.log('토큰 오류');
                    res.status(500).json({'f':'fail'});
                }
        }
        else {
            console.log('아이디 [%s], 패스워드가 일치x', id)
            res.send({'f' : 'fail'});
            res.end();
            return;            
    }          
    }})
    .catch((err)=> {
        res.send({'f':'fail'});
        console.log(err);
    });   
});
app.get('/accesstoken', token.vat ,(req, res) => {
    const userId = req.userId;
    sql.check(userId)
    .then((rows)=>{
        if(rows[0].id == userId)
        {
            return userId;
        }
    })
    .catch((err)=>{
        res.json({message : "fail"});
    })
    res.json({message: '',userId});
});
app.post('/refreshtoken',(req,res)=>
{

});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './frontend/build/index.html'));
// });

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});


