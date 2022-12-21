import { customAxios } from "./axios/customAxios";

const login = (email: string, password: string) => {
  return customAxios.post('/auth/login', {
    email: email,
    password: password
  })
}

const join = (email: string, nick: string, password: string) => {
  return customAxios.post('/auth/join', {
    email: email,
    nick: nick,
    password: password
  })
}

const updateUserInfo = (user: {}) => {
  return customAxios.patch('/user', { user })
}

const logout = () => {
  return customAxios.get('/auth/logout')
}

export { login, join, logout, updateUserInfo }; 