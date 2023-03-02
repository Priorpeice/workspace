import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Logout from './logout';

function useAccessToken() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const accessTokenExpTime = 60 * 1000;
  const refreshTokenExpTime = 24 * 60* 60* 1000;

  const AccessTokenAPI =  (accessToken) => {
    axios({
      url: "http://localhost:3001/accesstoken",
      method: "GET",
      withCredentials: true,
      headers: {
      Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      setCookie('accessToken', accessToken, { maxAge: accessTokenExpTime });
    })
    .catch(error => {
      refreshTokenAPI(cookies.refreshToken);
    });
  };

  const refreshTokenAPI =  (refreshToken) => { //check 해야함
    axios({
      url: "http://localhost:3001/refreshtoken",
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
    .then(res => {
      const { accessToken, refreshToken } = res.data;
      console.log(accessToken,refreshToken);
      setCookie('accessToken', accessToken, { maxAge: accessTokenExpTime });
      setCookie('refreshToken', refreshToken, { maxAge: refreshTokenExpTime });
      AccessTokenAPI(accessToken);
    })
    .catch(error => {
      console.log(error);
      navigate('/logout');
    });
  };

  useEffect(() => {
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;
    if(!accessToken && !refreshToken){
      console.log(accessToken);
      console.log(refreshToken);
      navigate('/login');
      }
    else if (accessToken) {
      console.log("hi");
      AccessTokenAPI(accessToken);
    }
    else if (refreshToken){
      console.log("hello");
      refreshTokenAPI(refreshToken);
    }
    else{
      alert("why?");
    }
    
  }, [cookies.accessToken, cookies.refreshToken, cookies, navigate, setCookie]);
  return cookies.accessToken;
}

export default useAccessToken;