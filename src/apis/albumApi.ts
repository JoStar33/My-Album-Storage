import { spotifyAxios } from './spotifyAxios';

const getAlbum = (query: string, type:string) => {
  return spotifyAxios.get(``, {params: {
    q: query,
    type: type,
  }});
};

export { getAlbum };