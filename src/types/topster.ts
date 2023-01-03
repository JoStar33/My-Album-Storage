import { userAlbumType } from "./album";

export type topsterAlbumType = userAlbumType & {
  position: number;
};

export type topsterType = {
  _id: string;
  name: string;
  type: string;
  albums: topsterAlbumType[];
  owner: string;
};

export type patchTopsterType = {
  userId: string;
  topster: topsterType;
};

export type putTopsterType = {
  userId: string;
  topsters: topsterType[];
};

export type deleteTopsterAlbumType = {
  topster: topsterType;
  topsterPosition: number;
};

export type patchTopsterAlbumType = {
  topster: topsterType;
  topsterAlbum: topsterAlbumType;
};