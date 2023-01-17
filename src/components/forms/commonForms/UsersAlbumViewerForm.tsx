import React, { memo } from 'react';
import styled from 'styled-components';
import UserAlbumBox from "../../albums/UserAlbumBox";
import UserAlbumSkeleton from "../loadingForm/UserAlbumSkeleton";
import { userAlbumType } from "../../../types/album";

type propsType = {
  getAlbumLoading: boolean,
  userAlbums: userAlbumType[],
  modifyDialog: {
    modifyAlbum: userAlbumType;
    isOpened: boolean;
  }
  setModifyDialog: React.Dispatch<React.SetStateAction<{
    modifyAlbum: userAlbumType;
    isOpened: boolean;
  }>>
}

const UsersAlbumViewerForm: React.FC<propsType> = ({getAlbumLoading, userAlbums, modifyDialog, setModifyDialog}) => {
  return (
    <UserAlbumViewer>
      {
        //앨범로딩이 종료시에 앨범들 정상적으로 보여주기.
        !getAlbumLoading &&
          userAlbums.map((album) => (
            <UserAlbumBox
              key={album._id}
              album={album}
              modifyDialog={modifyDialog}
              setModifyDialog={setModifyDialog}
            ></UserAlbumBox>
          ))
      }
      {
        //앨범로딩시에는 스켈레톤 앨범들이 보이도록.
        getAlbumLoading &&
          new Array(9)
            .fill(1)
            .map((_, index) => (
              <UserAlbumSkeleton key={index}></UserAlbumSkeleton>
            ))
      }
    </UserAlbumViewer>
  );
};

const UserAlbumViewer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 90vw;
  height: 70vh;
  border-radius: 20px;
  margin-bottom: 30vh;
  box-shadow: 0 6px 6px 0 gray;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default memo(UsersAlbumViewerForm);