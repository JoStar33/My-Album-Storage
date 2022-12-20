import { tokenAxios } from "./axios/tokenAxios"
import { setToken } from './cookies/spotifyCookie';

const setTokenByPost = () => {
  return tokenAxios.post(`api/token`, 'grant_type=client_credentials')
  .then((res) => { 
    setToken(res.data.access_token) 
  });
}

export { setTokenByPost }