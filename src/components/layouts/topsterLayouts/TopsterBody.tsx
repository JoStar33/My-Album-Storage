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
      <TopsterMain topsterLayout={topsterLayout}></TopsterMain>
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

export default TopsterBody;