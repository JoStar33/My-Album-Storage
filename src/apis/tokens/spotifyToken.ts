const TokenKey = 'Spotify-Authorization'

export const getSpotifyToken = () => {
  return sessionStorage.getItem(TokenKey)
}

export const setSpotifyToken = (token: string) => {
  return sessionStorage.setItem(TokenKey, token)
}

export const removeSpotifyToken = () => {
  return sessionStorage.removeItem(TokenKey)
}