import { tokenAxios } from "./axios/tokenAxios"
import { setSpotifyToken } from './tokens/spotifyToken';

const setTokenByPost = async () => {
  const res = await tokenAxios.post(`api/token`, 'grant_type=client_credentials');
  setSpotifyToken(res.data.access_token);
}

export { setTokenByPost }