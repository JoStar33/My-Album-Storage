import axios from 'axios';
import { getToken, setToken, removeToken } from '../tokens/token';


const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 기본 서버 주소 입력
  timeout: JSON.parse(process.env.REACT_APP_AXIOS_TIMEOUT as string),
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
customAxios.interceptors.request.use((config: any) => {
  config.headers.Authorization = getToken();
  return config
}); 

customAxios.interceptors.response.use((config) => {
    if(config.headers.authorization) {
      setToken(config.headers.authorization);
    }
    return config
  }, (error) => {
  if(error.message === "Request failed with status code 419") {
    removeToken();
  }
}); 
export { customAxios };