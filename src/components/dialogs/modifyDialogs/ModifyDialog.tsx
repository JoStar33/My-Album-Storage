import React, { useState } from 'react';
import styled from 'styled-components';
import { userAlbumType, asyncPatchAlbumFetch, asyncGetAlbumFetch } from '../../../store/album';
import { AppDispatch } from '../../../store/index';
import { useDispatch } from 'react-redux';
import { MdCancel } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi';
import ScoreForm from '../scoreDialogs/ScoreForm';
import ScoreDialogController from '../scoreDialogs/ScoreDialogController';
import ScoreInputForm from '../scoreDialogs/ScoreInputForm';

type dialogType = {
  modifyAlbum: userAlbumType;
  isOpened: boolean;
}

type propsType = {
  modifyDialog: dialogType,
  setModifyDialog: React.Dispatch<React.SetStateAction<dialogType>>,
}

const ModifyDialog: React.FC<propsType> = ({setModifyDialog, modifyDialog}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [scoreVaildateText, setScoreVaildateText] = useState(``);
  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScoreVaildateText(``);
    setModifyDialog({...modifyDialog, modifyAlbum: {
      ...modifyDialog.modifyAlbum,
      score: parseInt(e.target.value)
    }});
  };
  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyDialog({...modifyDialog, modifyAlbum: {
      ...modifyDialog.modifyAlbum,
      description: e.target.value
    }});
  };
  const applyScore = async () => {
    await dispatch(asyncPatchAlbumFetch(modifyDialog.modifyAlbum));
    dispatch(asyncGetAlbumFetch('63a921dfa7cdfa7871cdb166'));
    setModifyDialog({...modifyDialog, isOpened: false});
  };
  const closeDialog = () => {
    setModifyDialog({...modifyDialog, isOpened: false});
  };
  return (
    <DialogBackground>
      <ModifyDialogContainer>
        <AlbumTitle>
          {modifyDialog.modifyAlbum.name}
        </AlbumTitle>
        <AlbumImg src={modifyDialog.modifyAlbum.image}></AlbumImg>
        <ArtistName>
          {modifyDialog.modifyAlbum.artist}
        </ArtistName>
        <ScoreForm score={modifyDialog.modifyAlbum.score}></ScoreForm>
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

export default ModifyDialog;