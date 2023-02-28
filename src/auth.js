import axios from 'axios';
import Cookies from "js-cookie";
import { useEffect } from 'react';

function useAccessToken() {
  const getAccessTokenAPI = (token) => {
    axios({
      url: "http://localhost:3001/accesstoken",
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}` //인증 스키마 사용
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const refreshTokenAPI = (refreshToken) => {
    axios({
      url: "http://localhost:3001/refreshtoken",
      method: "POST",
      withCredentials: true,
      data: {
        refresh_token: refreshToken
      }
    })
    .then(response => {
      const { access_token, refresh_token } = response.data;
      Cookies.set('token', access_token);
      Cookies.set('refreshToken', refresh_token);
      getAccessTokenAPI(access_token); // 새로운 access token으로 API 호출
    })
    .catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    const token = Cookies.get('token');
    const refreshToken = Cookies.get('refreshToken');
    if (token) {
      getAccessTokenAPI(token);
    }
    else if (refreshToken){
        refreshTokenAPI(refreshToken);
    }
    else{
        window.location.href = '/login';
    }

  }, []);
}

export default useAccessToken;