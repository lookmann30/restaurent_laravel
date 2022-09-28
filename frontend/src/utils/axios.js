import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Router from 'next/router'

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

axiosInstance.interceptors.request.use((req) => {
  // Do something before request is sent
  req.headers = { 
    'Content-Type': 'application/json',
    'authorization': `Bearer ${req.token}` 
  }
return req
}, function (error) {
  // Do something with request error
  console.log(error)
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (403 === error.response.status || 401 === error.response.status || 500 === error.response.status) {
    // Router.push('/returnToLogin')
    // response.writeHead(302, { Location: '/returnToLogin' });
    // response.end();
    // window.location.href = '/returnToLogin'
    return false
  } 
  else if(400 === error.response.status){
    return  error.response 
  } else {
    return Promise.reject(error);
  }
});

export default axiosInstance;
