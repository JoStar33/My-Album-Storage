import axios from 'axios';
window.Buffer = window.Buffer || require("buffer").Buffer;

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const tokenAxios = axios.create({
  baseURL: process.env.REACT_APP_TOKEN_URL, // 기본 서버 주소 입력
  timeout: JSON.parse(process.env.REACT_APP_AXIOS_TIMEOUT as string),
  headers: {
    Authorization: 'Basic ' + auth,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export { tokenAxios }; 