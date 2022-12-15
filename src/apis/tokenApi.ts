import { tokenAxios } from "./tokenAxios"
import { setToken } from './spotifyCookie';

const setTokenByPost = () => {
  return tokenAxios.post(`api/token`, 'grant_type=client_credentials')
  .then((res) => { 
    setToken(res.data.access_token) 
  });
}

export { setTokenByPost }