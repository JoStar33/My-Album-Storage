import React from 'react';
import styled from 'styled-components';
import { albumType } from '../../store/album';

type propsType = {
  album: albumType
};

const SelectedAlbumBox: React.FC<propsType> = ({album}) => {
  return (
    <SelectedAlbumContainer>
      <SelectedAlbumImg src={album.albumImg}></SelectedAlbumImg>
      <SelectedAlbumInfoContainer></SelectedAlbumInfoContainer>
    </SelectedAlbumContainer>
  );
};

export default SelectedAlbumBox;

const SelectedAlbumContainer = styled.div`
width: 20%;
height: 80%;
margin-left: 2.5%;
margin-right: 2.5%;
border-radius: 10px;
background-color: white;
display: flex;
align-items: center;
`;

const SelectedAlbumImg = styled.img`
margin-left: 4px;
width: 5vw;
height: 5vw;
`;

const SelectedAlbumInfoContainer = styled.div`

`;