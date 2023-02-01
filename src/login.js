import { useState} from 'react';
function Login()
{
    const [id, setInputId]= useState('');
    const [pw, setInputPw]=useState('');
    
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	
    const onClickLogin = (e) => {
        const postInfo={ method: "POST", headers: {'content-type' : 'application/json'} , body : JSON.stringify({id,pw})};
        fetch('http://localhost:3001/login', postInfo)
        .then((response)=> console.log(response.data)
        // .then(){
        //     if(data.response == 'success')
        //     {
        //         alert("Success");
        //         window.location = "http://localhost:3001/login";
        //     }
        // }
        )
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
