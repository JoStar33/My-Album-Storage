import axios from 'axios';
import { getCookie, updateCookie } from '../cookies/cookie';


const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 기본 서버 주소 입력
  timeout: JSON.parse(process.env.REACT_APP_AXIOS_TIMEOUT as string),
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    access_token: getCookie(),
  },
});
customAxios.interceptors.request.use((config) => {
  return config
}); 
customAxios.interceptors.response.use((config) => {
  updateCookie();
  return config
}); 
export { customAxios };