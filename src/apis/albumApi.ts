import { spotifyAxios } from './axios/spotifyAxios';
import { customAxios } from './axios/customAxios';

const getSpotifyAlbum = (query: string, type:string) => {
  return spotifyAxios.get(`/v1/search`, {params: {
    q: query,
    type: type,
  }});
};

const postAlbum = (userId: number, selectedAlbum: albumType[]) => {
  return customAxios.post(`/album/${userId}`, {
    selectedAlbum
  })
}

type artist = {
  external_urls: Object,
  href: string,
  id: string,
  name: string,
  type: string,
  uri: string
};

type albumType = {
  albumKey: string,
  artistName: string,
  albumName: string,
  albumImg: string,
  isSelected: boolean,
  score: number,
  description: string
};

type image = {
  height: number,
  url: string,
  width: number
};

export type item = {
  album_type: string,
  artists: artist[],
  available_markets: string[],
  external_urls: Object,
  href: string,
  id: string,
  images: image[],
  name: string,
  release_date: string,
  release_date_precision: string,
  total_tracks: number,
  type: string,
  uri: string
};

export type getAlbumParamType = {
  query: string,
  type: string
};

export { getSpotifyAlbum, postAlbum };