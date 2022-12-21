import React, { useState } from 'react';
import styled from 'styled-components';
import { userAlbumType } from '../../store/album';
import { MdCancel } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi';
import ScoreForm from '../scoreDialogs/ScoreForm';
import ScoreDialogController from '../scoreDialogs/ScoreDialogController';
import ScoreInputForm from '../scoreDialogs/ScoreInputForm';

type propsType = {
  album: userAlbumType,
  setModifyDialog: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModifyDialogs: React.FC<propsType> = ({album, setModifyDialog}) => {
  const [scoreVaildateText, setScoreVaildateText] = useState(``);
  const [modifyAlbum, setModifyAlbum] = useState(album);
  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScoreVaildateText(``);
    setModifyAlbum({...modifyAlbum, score: parseInt(e.target.value)});
  };
  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyAlbum({...modifyAlbum, description: e.target.value});
  };
  const applyScore = () => {
    setModifyDialog(false);
  };
  const closeDialog = () => {
    setModifyDialog(false);
  };
  return (
    <DialogBackground>
      <ModifyDialogContainer>
        <AlbumTitle>
          {album.name}
        </AlbumTitle>
        <AlbumImg src={album.image}></AlbumImg>
        <ArtistName>
          {album.artist}
        </ArtistName>
        <ScoreForm score={album.score}></ScoreForm>
        <ScoreInputForm scoreVaildateText={scoreVaildateText} handleChangeScore={handleChangeScore}></ScoreInputForm>
        <DescriptionText>
          <BiCommentDetail></BiCommentDetail>
          코멘트
        </DescriptionText>
        <Description placeholder="내용을 입력해 주세요." onChange={handleChangeDescription}></Description>
        <ScoreDialogController apply={applyScore} close={closeDialog}></ScoreDialogController>
        <CloseButton onClick={closeDialog}>
          <MdCancel size={24}></MdCancel>
        </CloseButton>
      </ModifyDialogContainer>
    </DialogBackground>
  );
};

const Centering = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;


const DialogBackground = styled(Centering)`
position: absolute !important;
background-color: rgba(0, 0, 0, 0.4);
width: 100vw;
height: 100vh;
top: 0;
left: 0;
`;

const ModifyDialogContainer = styled(Centering)`
flex-direction: column;
position: relative;
width: 50vw;
min-width: 450px;
height: 80vh;
border-radius: 25px;
background-color: white;
box-shadow: 0 8px 8px 0 gray;
`;

const AlbumTitle = styled.h1`
font-weight: 800;
`;

const AlbumImg = styled.img`
width: 13vw;
height: 13vw;
`;

const ArtistName = styled.div`
font-weight: 800;
`;

const DescriptionText = styled.div`
margin-top: 20px;
width: 90%;
font-weight: 800;
text-align: left;
display: flex;
align-items: center;
`

const Description = styled.textarea`
width: 90%;
height: 30%;
border: none;
resize: none;
`;

const CloseButton = styled.div`
position: absolute;
top: 1%;
left: 94%;
cursor: pointer;
`;

export default ModifyDialogs;