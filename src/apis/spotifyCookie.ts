const TokenKey = 'Authorization'

export const getToken = () => {
  return sessionStorage.getItem(TokenKey)
}

export const setToken = (token: string) => {
  return sessionStorage.setItem(TokenKey, token)
}

export const removeToken = () => {
  return sessionStorage.removeItem(TokenKey)
}