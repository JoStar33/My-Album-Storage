import React from 'react';
import styled from 'styled-components';
import '../../styles/fire_font.css';
import { albumType, setIsSelected, setScore } from '../../store/album';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import { MdCancel } from 'react-icons/md';

type propsType = {
  album: albumType,
  selectedAlbums: albumType[],
  setSelectedAlbums: React.Dispatch<React.SetStateAction<albumType[]>>,
  setScoreDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setScoreAlbum: React.Dispatch<React.SetStateAction<albumType>>
};

const SelectedAlbumBox: React.FC<propsType> = ({album, selectedAlbums, setSelectedAlbums, setScoreDialog, setScoreAlbum}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleModifyScore = (e: React.MouseEvent<HTMLElement> ) => {
    setScoreDialog(true);
    setScoreAlbum(album);
    e.stopPropagation();
  };
  const handleDeleteEvent = () => {
    dispatch(setIsSelected({id: album.id, isSelected: false}));
    dispatch(setScore({id: album.id, score: 0}));
    setSelectedAlbums(selectedAlbums.filter(seletedAlbum => seletedAlbum.id !== album.id));
  };
  return (
    <SelectedAlbumContainer>
      <SelectedAlbumImg onClick={handleModifyScore} src={album.albumImg}></SelectedAlbumImg>
      <div className="fire" style={{cursor: 'pointer'}} onClick={handleModifyScore}>
        <h3 className="blazing">{album.score}</h3>
      </div>
      <SelectedAlbumInfoContainer onClick={handleModifyScore}>
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
min-height: 80%;
margin-left: 1%;
margin-right: 1%;
margin-bottom: 1%;
margin-top: 1%;
border-radius: 10px;
background-color: white;
user-select: none;
`;

const SelectedAlbumImg = styled.img`
margin-left: 8px;
width: 4vw;
height: 4vw;
cursor: pointer;
`;

const SelectedAlbumInfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
margin-left: 10px;
margin-right: 10px;
cursor: pointer;
`;

const SelectedAlbumInfo = styled.div`
display: flex;
justify-content: flex-start;
font-weight: 800;
`;

const DeleteBtn = styled.div`
position: absolute;
top: -2%;
left: 91%;
cursor: pointer;
`;