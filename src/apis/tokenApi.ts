import { tokenAxios } from "./axios/tokenAxios"
import { setToken } from './cookies/spotifyCookie';

const setTokenByPost = async () => {
  const res = await tokenAxios.post(`api/token`, 'grant_type=client_credentials');
  setToken(res.data.access_token);
}

export { setTokenByPost }