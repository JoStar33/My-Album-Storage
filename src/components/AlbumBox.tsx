import React from 'react';
import styled from 'styled-components';
import { searchAlbumType } from '../store/album'

type propsType = {
  album: searchAlbumType,
};

const AlbumBox: React.FC<propsType> = ({album}) => {
  return (
    <AlbumBoxContainer>
      <AlbumImg src={ album.albumImg }/>
      <AlbumName>{ album.albumname }</AlbumName>
    </AlbumBoxContainer>
  );
}

const AlbumBoxContainer = styled.div`
width: 14%;
height: 14vh;
background-color: white;
box-shadow: 0 6px 6px 0 gray;
border-radius: 20px;
margin-left: 1.3%;
margin-right: 1.3%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

const AlbumImg = styled.img`
width: 90%;
height: 70%;
`;

const AlbumName = styled.div`
width: 90%;
font-weight: 800;
`

export default AlbumBox;