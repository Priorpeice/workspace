const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

const Hashing = require('./API/encryt.js');
const token = require('./API/maketoken.js');
const sql= require('./API/sql.js');

  
app.post("/login", (req, res) => {
    console.log(`로그인 호출`);
    console.log(req.body.id);
    const id = req.body.id; // 변경되지 않는 값 Const로 변경
    const pw = req.body.pw;
    
   console.log("로그인 요청" + id,pw);
   sql.check(id)
   .then((rows)=> { if(rows.length == 0)
    {
        console.log('아이디 [%s], 아이디가 일치x', id)
        res.send({'f' : 'fail'});
        res.end();
        
    }

    else if(rows.length > 0 ){
       
       
        // console.log("%s", rows[0].spw);
        // console.log("%s", rows[0].pw);
        const hashpassword=Hashing.ReHash(pw, rows[0].spw);//쉣~~~
        // console.log("%s", hashpassword);
        if(rows[0].pw === hashpassword)
        {
            try{
                //  access token sign({ 사용자 정보  })
                const accessToken = token.Gat(rows[0].id);
                const refreshToken= token.Grt(rows[0].id);
                //token 전송
                res.cookie('accessToken', accessToken, {
                    secure : false
                });
                res.cookie('refreshToken', refreshToken, {
                    secure : false  
                }
                );
               
                console.log('아이디 [%s], 패스워드가 일치하는 이름 [%s] 찾음', id);
                res.status(200).json({'s':'success', accessToken ,refreshToken});
               
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
    if (userId) {
      sql.check(userId)
        .then((rows)=>{
          if(rows[0].id == userId) {
            
            res.json({message: userId});
          } else {
            res.json({message : "fail"});
          }
        })
        .catch((err)=>{
          res.json({message : "fail"});
        });
    } else {
      res.status(401).json('fail');
    }
  });
app.get('/refreshtoken',token.vrt, (req,res) =>
{
  const refreshToken = req.refreshToken;
  const accessToken = req.accessToken;
  console.log(refreshToken,accessToken);
  res.cookie('refreshToken', refreshToken, { secure: false });
  res.cookie('accessToken', accessToken, { secure: false });
  res.status(200).json({accessToken, refreshToken});
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});
app.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).send('Logged out');
  });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './frontend/build/index.html'));
// });

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});


moudle.exports =router;