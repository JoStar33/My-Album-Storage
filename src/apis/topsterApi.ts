import { customAxios } from './axios/customAxios';

const getTopster = (userId: string) => {
  return customAxios.get(`/topster/${userId}`);
};

const patchTopster = (topster: topsterType) => {
  return customAxios.patch(`/topster/${topster._id}`, {
    topster
  });
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

export { getTopster, patchTopster, putTopster };