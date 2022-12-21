import React, {useState} from 'react';
import styled from 'styled-components';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import { albumType, setIsSelected } from '../../store/album';
import { MdCancel } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi';
import ScoreDialogController from './ScoreDialogController';
import ScoreForm from './ScoreForm';
import ScoreInputForm from './ScoreInputForm';

type propsType = {
  scoreAlbum: albumType,
  selectedAlbums: albumType[],
  setSelectedAlbums: React.Dispatch<React.SetStateAction<albumType[]>>,
  setScoreDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setScoreAlbum: React.Dispatch<React.SetStateAction<albumType>>
};

const ScoreDialog: React.FC<propsType> = ({scoreAlbum, selectedAlbums, setScoreDialog, setSelectedAlbums, setScoreAlbum}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [scoreVaildateText, setScoreVaildateText] = useState(``);
  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScoreVaildateText(``);
    setScoreAlbum({...scoreAlbum, score: parseInt(e.target.value)});
  };
  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScoreAlbum({...scoreAlbum, description: e.target.value});
  };
  const applyScore = () => {
    //스코어의 값이 1~100사이의 값이 아니라면
    if(scoreAlbum.score <= 0 || scoreAlbum.score > 100) {
      setScoreVaildateText(`점수는 1부터 100까지만 입력이 가능합니다.`);
      return;
    }
    //선택이 되었음을 알리는 함수 호출
    dispatch(setIsSelected({key: scoreAlbum.key, isSelected: true}));
    //스코어를 지정하고자하는 앨범의 값을 update
    setScoreAlbum(scoreAlbum);
    //선택이 됐었던 앨범이 아니라면? push진행
    !selectedAlbums
    .find(selectedAlbum => selectedAlbum.key === scoreAlbum.key) ? pushScoreAlbum() : updateSeletedAlbum()
  };
  const pushScoreAlbum = () => {
    setSelectedAlbums([...selectedAlbums, scoreAlbum]);
    setScoreDialog(false);
  };
  const updateSeletedAlbum = () => {
    const updatedSelectedAlbums = selectedAlbums
    .map(selectedAlbum => selectedAlbum.key === scoreAlbum.key ? scoreAlbum : selectedAlbum);
    setSelectedAlbums(updatedSelectedAlbums);
    setScoreDialog(false);
  };
  const closeDialog = () => {
    setScoreDialog(false);
  };
  return (
    <DialogBackground>
      <ScoreDialogContainer>
        <AlbumTitle>
          {scoreAlbum.name}
        </AlbumTitle>
        <AlbumImg src={scoreAlbum.image}></AlbumImg>
        <ArtistName>
          {scoreAlbum.artist}
        </ArtistName>

        <ScoreForm score={scoreAlbum.score}></ScoreForm>
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
      </ScoreDialogContainer>
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

const ScoreDialogContainer = styled(Centering)`
flex-direction: column;
position: relative;
width: 30vw;
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

export default ScoreDialog;