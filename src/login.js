import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useCookies } from 'react-cookie';
function Login()
{
    const [id, setInputId]= useState('');
    const [pw, setInputPw]=useState('');
    const[cookies ,setCookie, removeCookie]= useCookies(['token']);
    const navigate = useNavigate();


    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	
    const onClickLogin = (e) => {
        const postInfo={ method: "POST", headers: {'content-type' : 'application/json'} , body : JSON.stringify({id,pw})};
        fetch('http://localhost:3001/login', postInfo)
        .then((response)=> response.json()) // JSON.stringify();
        .then((data) => {
            console.log(data);
            if(data.s == 'success')
            {
                alert("Success");
                setCookie('token', data.token);//token을 저장시킴
                navigate('/accesstoken');
                
            }
            else{
                alert("Try again");
            }
        });
        
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='id'>ID : </label>
                <input type='text' name='id' value={id} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='pw'>PW : </label>
                <input type='password' name='pw' value={pw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
        </div>
    )
    
}



export default Login;
