import axios from "axios";
import { setCookie, getCookie } from "./cookie";

const createToken = () => axios
  .post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials"
  )
  .then((res) => {
    setCookie('token', res.data.access_token);
  });
const getAlbum = (searchContent: string, searchType: string, country: string) => axios.get('https://api.spotify.com/v1/search', {
  params: {
    q: searchContent,
    type: searchType,
    market: country,
    limit: 50
  },
  headers: {
    Authorization: `Bearer ${getCookie('token')}`,
  },
})

export { createToken, getAlbum };