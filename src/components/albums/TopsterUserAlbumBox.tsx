import React from 'react';
import styled from 'styled-components';
import { userAlbumType } from '../../store/album';

type propsType = {
  album: userAlbumType;
}

const TopsterUserAlbumBox: React.FC<propsType> = ({album}) => {
  const handleDragStartEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('album_id', String(album._id));
    e.dataTransfer.dropEffect = "move";
  }
  return (
    <TopsterUserAlbumContainer onDragStart={handleDragStartEvent} draggable>
      <TopsterAlbumImage src={album.image}></TopsterAlbumImage>
    </TopsterUserAlbumContainer>
  );
};

const TopsterUserAlbumContainer = styled.div`
width: 49%;
height: 10vw;
margin: 0.5%;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
display: flex;
justify-content: center;
align-items: center;
`;

const TopsterAlbumImage = styled.img`
width: 80%;
height: 80%;
-webkit-user-drag: none;
`;

export default TopsterUserAlbumBox;