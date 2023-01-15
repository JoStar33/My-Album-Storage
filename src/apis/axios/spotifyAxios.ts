import axios from 'axios';

const spotifyAxios = axios.create({
  baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
  timeout: JSON.parse(process.env.REACT_APP_AXIOS_TIMEOUT as string)
});

export { spotifyAxios }; 