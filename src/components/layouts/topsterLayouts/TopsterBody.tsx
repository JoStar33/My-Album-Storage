import React from 'react';
import styled from 'styled-components';
import TopsterMain from './topsterMainLayouts/TopsterMain';
import TopsterSideBar from './topsterSideBarLayouts/TopsterSideBar';

type propsType = {
  topsterLayout: string,
  setAlbumDialog: React.Dispatch<React.SetStateAction<boolean>>,
}

const TopsterBody: React.FC<propsType> = ({topsterLayout, setAlbumDialog}) => {
  return (
    <TopsterBodyContainer>
      <TopsterSideBar setAlbumDialog={setAlbumDialog}></TopsterSideBar>
      <TopsterMainContainer>
        <TopsterMain topsterLayout={topsterLayout}></TopsterMain>
      </TopsterMainContainer>
    </TopsterBodyContainer>
  );
};

const TopsterBodyContainer = styled.div`
width: 98vw;
height: 86vh;
display: flex;
flex-direction: row;
margin-bottom: 1vh;
margin-left: 1vw;
margin-right: 1vw;
`;

const TopsterMainContainer = styled.div`
  margin-left: 1vw;
  width: 79vw;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0 6px 6px 0 gray;
  background-color: black;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default TopsterBody;