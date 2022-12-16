import { spotifyAxios } from './spotifyAxios';

const getAlbum = (query: string, type:string) => {
  return spotifyAxios.get(`/v1/search`, {params: {
    q: query,
    type: type,
  }});
};

export { getAlbum };