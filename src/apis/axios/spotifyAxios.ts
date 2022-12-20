import axios from 'axios';
import { getToken } from '../cookies/spotifyCookie';


const spotifyAxios = axios.create({
  baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
  timeout: JSON.parse(process.env.REACT_APP_AXIOS_TIMEOUT as string),
  headers: {
    Authorization: `Bearer ${ getToken() }`,
  },
});

export { spotifyAxios }; 