import React from 'react';
import styled from 'styled-components';

type propsType = {
  setAlbumDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopsterUserInfo: React.FC<propsType> = ({setAlbumDialog}) => {
  const uploadNewAlbum = () => {
    setAlbumDialog(true)
  } 
  return (
    <TopsterUserInfoContainer>
      <OpenDialogButton onClick={uploadNewAlbum}>앨범추가하기</OpenDialogButton>
    </TopsterUserInfoContainer>
  );
};



const TopsterUserInfoContainer = styled.div`
border-radius: 20px 20px 0px 0px;
background-color: skyblue;
width: 95%;
height: 17%;
margin-top: 1%;
margin-bottom: 1%;
box-shadow: 0 6px 6px 0 gray;
display: flex;
align-items: center;
`;

const OpenDialogButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-weight: 800;
border-radius: 20px;
width: 100px;
height: 30px;
background-color: white;
margin-top: 10px;
margin-bottom: 10px;
user-select: none;
cursor: pointer;
`;

export default TopsterUserInfo;