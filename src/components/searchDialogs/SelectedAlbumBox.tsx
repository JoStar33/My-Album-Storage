import React from 'react';
import styled from 'styled-components';
import { albumType, setIsSelected } from '../../store/album';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import { MdCancel } from 'react-icons/md';

type propsType = {
  album: albumType,
  selectedAlbums: albumType[],
  setSelectedAlbums: React.Dispatch<React.SetStateAction<albumType[]>>
};

const SelectedAlbumBox: React.FC<propsType> = ({album, selectedAlbums, setSelectedAlbums}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteEvent = () => {
    dispatch(setIsSelected({album: album, isSelected: false}));
    setSelectedAlbums(selectedAlbums.filter(seletedAlbum => seletedAlbum.id !== album.id));
  };
  return (
    <SelectedAlbumContainer>
      <SelectedAlbumImg src={album.albumImg}></SelectedAlbumImg>
      <SelectedAlbumInfoContainer>
        <SelectedAlbumInfo>{album.artistName}</SelectedAlbumInfo>
        <SelectedAlbumInfo>{album.albumName}</SelectedAlbumInfo>
      </SelectedAlbumInfoContainer>
      <DeleteBtn onClick={handleDeleteEvent}>
        <MdCancel size={24}></MdCancel>
      </DeleteBtn>
    </SelectedAlbumContainer>
  );
};

export default SelectedAlbumBox;

const SelectedAlbumContainer = styled.div`
display: flex;
align-items: center;
flex-direction: row;
position: relative;
min-width: 20%;
min-height: 80%;
margin-left: 2.5%;
margin-right: 2.5%;
border-radius: 10px;
background-color: white;
user-select: none;
`;

const SelectedAlbumImg = styled.img`
margin-left: 4px;
width: 5vw;
height: 5vw;
`;

const SelectedAlbumInfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
margin-left: 10px;
`;

const SelectedAlbumInfo = styled.div`
display: flex;
justify-content: flex-start;
font-weight: 800;
`;

const DeleteBtn = styled.div`
position: absolute;
top: -2%;
left: 94%;
cursor: pointer;
`;