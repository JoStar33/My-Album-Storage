import { customAxios } from './axios/customAxios';

const getTopster = (userId: string) => {
  return customAxios.get(`/topster/${userId}`);
};

const patchTopster = (topster: topsterType) => {
  return customAxios.patch(`/topster/${topster._id}`, {
    topster
  });
};

const patchTopsterAlbum = (topsterId: string, topsterAlbum: topsterAlbumType) => {
  return customAxios.patch(`/topster/album/${topsterId}`, {
    topsterAlbum
  });
};

const deleteTopsterAlbum = (topsterId: string, topsterPosition: number) => {
  return customAxios.delete(`/topster/album/${topsterId}/${topsterPosition}`);
};

const putTopster = (userId: string, topsters: topsterType[]) => {
  //모든 탑스터의 내용 업데이트
  return customAxios.put(`/topster/${userId}`, {
    topsters
  });
}

type topsterType = {
  _id: string,
  name: string,
  type: string,
  albums: userAlbumType[],
  owner: string
};

type userAlbumType = {
  _id: string,
  artist: string,
  name: string,
  image: string,
  score: number,
  description: string,
  owner: string
};

type topsterAlbumType = {
  _id: string,
  artist: string,
  name: string,
  image: string,
  score: number,
  description: string,
  owner: string,
  position: number
};

export { getTopster, patchTopster, putTopster, patchTopsterAlbum, deleteTopsterAlbum };