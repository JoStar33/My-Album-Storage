import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { albumType, setIsSelected } from '../../store/album';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import CheckComponent from './CheckComponent';

type propsType = {
  album: albumType,
  selectedAlbums: albumType[],
  setSelectedAlbums: React.Dispatch<React.SetStateAction<albumType[]>>
};

const AlbumBox: React.FC<propsType> = ({album, selectedAlbums, setSelectedAlbums}) => {
  const [isLineOver, setIsLineOver] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const albumText = useRef<any>(null);
  useEffect(() => {
    const height = albumText.current.clientHeight;
    if(height > 23) {
      setIsLineOver(true);
    }
  }, [album.id]);
  const handleClickSelectAlbum = () => {
    dispatch(setIsSelected(album));
    if(selectedAlbums.find(albumData => albumData.id === album.id)) {
      setSelectedAlbums(selectedAlbums.filter(albumData => albumData.id !== album.id));
      return;
    } 
    selectedAlbums.push(album);
    setSelectedAlbums(selectedAlbums);
  };
  return (
    <AlbumBoxContainer onClick={handleClickSelectAlbum}>
      <AlbumImg src={ album.albumImg } isLineOver={isLineOver}/>
      <AlbumName ref={albumText} isLineOver={isLineOver}>{ album.albumName }</AlbumName>
      {
        album.isSelected && <CheckComponent></CheckComponent>
      }
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
overflow: hidden;
position: relative;
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