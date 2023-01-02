import React from "react";
import styled from "styled-components";
import TopsterUserInfo from "./TopsterUserInfo";
import TopsterUsersAlbum from "./TopsterUsersAlbum";

//탑스터앨범들을 담고, 앨범들의 조작 기능을 담을 sidebar.
type propsType = {
  setAlbumDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopsterSideBar: React.FC<propsType> = ({ setAlbumDialog }) => {
  return (
    <TopsterSideBarContainer>
      <TopsterUserInfo setAlbumDialog={setAlbumDialog}></TopsterUserInfo>
      <TopsterUsersAlbum></TopsterUsersAlbum>
    </TopsterSideBarContainer>
  );
};

const TopsterSideBarContainer = styled.div`
  width: 20vw;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0 6px 6px 0 gray;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default TopsterSideBar;
