import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { searchAlbumType } from '../store/album'

type propsType = {
  album: searchAlbumType,
};

const AlbumBox: React.FC<propsType> = ({album}) => {
  const [isLineOver, setIsLineOver] = useState(false);
  const albumText = useRef<any>(null);
  useEffect(() => {
    const height = albumText.current.clientHeight;
    if(height > 23) {
      setIsLineOver(true);
    }
  }, [album.id])
  return (
    <AlbumBoxContainer>
      <AlbumImg src={ album.albumImg } isLineOver={isLineOver}/>
      <AlbumName ref={albumText} isLineOver={isLineOver}>{ album.albumname }</AlbumName>
    </AlbumBoxContainer>
  );
}

const AlbumBoxContainer = styled.div`
width: 14%;
background-color: white;
box-shadow: 0 6px 6px 0 gray;
border-radius: 20px;
margin-left: 1.3%;
margin-right: 1.3%;
margin-top: 2%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

interface AlbumImgType {
  isLineOver: boolean;
};

const AlbumImg = styled.img<AlbumImgType>`
width: ${(props) => (props.isLineOver ? '8vw' : '9vw')};
height: ${(props) => (props.isLineOver ? '8vw' : '9vw')};
`;

const AlbumName = styled.span<AlbumImgType>`
width: 90%;
font-weight: 800;
font-size: ${(props) => (props.isLineOver ? '6px' : '14px')};
`

export default AlbumBox;