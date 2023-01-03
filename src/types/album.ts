export type albumType = {
  key: string;
  artist: string;
  name: string;
  image: string;
  isSelected: boolean;
  score: number;
  description: string;
};

export type userAlbumType = {
  _id: string;
  artist: string;
  name: string;
  image: string;
  score: number;
  description: string;
  owner: string;
};

export type getSpotifyAlbumParamType = {
  query: string;
  type: string;
};

export type postAlbumParamType = {
  userId: string;
  selectedAlbums: albumType[];
};

