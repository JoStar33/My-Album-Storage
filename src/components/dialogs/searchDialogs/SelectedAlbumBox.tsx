import React from "react";
import styled from "styled-components";
import "../../../styles/fire_font.css";
import { setIsSelected } from "../../../store/album";
import { albumType } from "../../../types/album";
import { AppDispatch } from "../../../store/index";
import { useDispatch } from "react-redux";
import { MdCancel } from "react-icons/md";
import ScoreForm from "../../forms/commonForms/ScoreForm";

type scoreDialogType = {
  scoreAlbum: albumType;
  isOpened: boolean;
};

type propsType = {
  album: albumType;
  selectedAlbums: albumType[];
  setSelectedAlbums: React.Dispatch<React.SetStateAction<albumType[]>>;
  scoreDialog: scoreDialogType;
  setScoreDialog: React.Dispatch<React.SetStateAction<scoreDialogType>>;
};

const SelectedAlbumBox: React.FC<propsType> = ({
  album,
  selectedAlbums,
  setSelectedAlbums,
  setScoreDialog,
  scoreDialog,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleModifyScore = () => {
    setScoreDialog({ ...scoreDialog, scoreAlbum: album, isOpened: true });
  };
  const handleDeleteEvent = () => {
    dispatch(setIsSelected({ key: album.key, isSelected: false }));
    setSelectedAlbums(
      selectedAlbums.filter((seletedAlbum) => seletedAlbum.key !== album.key)
    );
  };
  return (
    <SelectedAlbumContainer>
      <SelectedAlbumImg
        onClick={handleModifyScore}
        src={album.image}
      ></SelectedAlbumImg>
      <ScoreForm score={album.score}></ScoreForm>
      <SelectedAlbumInfoContainer onClick={handleModifyScore}>
        <SelectedAlbumInfo>{album.name}</SelectedAlbumInfo>
        <SelectedAlbumInfo>{album.artist}</SelectedAlbumInfo>
      </SelectedAlbumInfoContainer>
      <DeleteButton onClick={handleDeleteEvent}>
        <MdCancel size={24}></MdCancel>
      </DeleteButton>
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
  margin-top: 0.6%;
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
  width: 7vw;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const SelectedAlbumInfo = styled.div`
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 800;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: -2%;
  left: 91%;
  cursor: pointer;
`;
