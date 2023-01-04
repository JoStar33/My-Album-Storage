import { customAxios } from "./axios/customAxios";

const login = (email: string, password: string) => {
  return customAxios.post('/auth/login', {
    email: email,
    password: password
  })
};

const checkDuplicatedEmail = (email: string) => {
  return customAxios.post('/auth/join/email', {
    email: email,
  })
};

const checkDuplicatedNick = (nick: string) => {
  return customAxios.post('/auth/join/nick', {
    nick: nick,
  })
};

const join = (email: string, nick: string, password: string) => {
  return customAxios.post('/auth/join', {
    email: email,
    nick: nick,
    password: password
  })
};

const updateUserInfo = (user: {}) => {
  return customAxios.patch('/user', { user })
};

const logout = () => {
  return customAxios.get('/auth/logout')
};

export { login, join, logout, updateUserInfo, checkDuplicatedEmail, checkDuplicatedNick }; 