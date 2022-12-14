import axios from 'axios';
import { getCookie } from './cookie';


const spotifyAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 기본 서버 주소 입력
  timeout: JSON.parse(process.env.REACT_APP_AXIOS_TIMEOUT),
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    access_token: getCookie('access_token'),
  },
});