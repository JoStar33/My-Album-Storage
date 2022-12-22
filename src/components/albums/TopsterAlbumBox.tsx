import React from 'react';
import styled from 'styled-components';
import { userAlbumType } from '../../store/album';

type propsType = {
  album?: userAlbumType,
  width: string
};

const TopsterAlbumBox: React.FC<propsType> = ({width, album}) => {
  return (
    <TopsterAlbumContainer width={width}>
      {
        album && <TopsterImage src={album.image}></TopsterImage>
      }
      {
        !album && <TopsterBackground></TopsterBackground>
      }
    </TopsterAlbumContainer>
  );
};

interface widthType {
  width: string;
};

const TopsterAlbumContainer = styled.div<widthType>`
width: ${(props) => { 
  return props.width;
}};
height: ${(props) => { 
  return props.width;
}};
margin: 0.3vw;
`;

const TopsterBackground = styled.div`
width: 100%;
height: 100%;
background-color: white;
`;

const TopsterImage = styled.img`
width: 100%;
height: 100%;
`;

export default TopsterAlbumBox;