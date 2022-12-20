import React, {useState} from 'react';
import styled from 'styled-components';
import '../../styles/fire_font.css';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import { albumType, setIsSelected } from '../../store/album';
import { GrScorecard } from 'react-icons/gr';
import { MdCancel } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi';
import ScoreDialogController from './ScoreDialogController';

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
  }
  const applyScore = () => {
    //스코어의 값이 1~100사이의 값이 아니라면
    if(scoreAlbum.score <= 0 || scoreAlbum.score > 100) {
      setScoreVaildateText(`점수는 0부터 100까지만 입력이 가능합니다.`);
      return;
    }
    //선택이 되었음을 알리는 함수 호출
    dispatch(setIsSelected({id: scoreAlbum.id, isSelected: true}));
    //스코어를 지정하고자하는 앨범의 값을 update
    setScoreAlbum(scoreAlbum);
    //선택이 됐었던 앨범이 아니라면? push진행
    if(!selectedAlbums.find(selectedAlbum => selectedAlbum.id === scoreAlbum.id)) {
      setSelectedAlbums([...selectedAlbums, scoreAlbum]);
      setScoreDialog(false);
      return;
    }
    //선택이 됐었던 앨범이라면? update진행
    const updateSelectedAlbums = selectedAlbums.map(selectedAlbum => {
      if(selectedAlbum.id === scoreAlbum.id) {
        return scoreAlbum;
      }
      return selectedAlbum;
    })
    setSelectedAlbums(updateSelectedAlbums);
    setScoreDialog(false);
  }
  const closeDialog = () => {
    setScoreDialog(false);
  }
  return (
    <DialogBackground>
      <ScoreDialogContainer>
        <AlbumTitle>
          {scoreAlbum.albumName}
        </AlbumTitle>
        <AlbumImg src={scoreAlbum.albumImg}></AlbumImg>
        <ArtistName>
          {scoreAlbum.artistName}
        </ArtistName>
        <div className="fire">
          <h1 className="blazing">{scoreAlbum.score}</h1>
        </div>
        <ScoreBox>
          <GrScorecard size={24}></GrScorecard>
          <ScoreText>나의 점수는?</ScoreText>
          <ScoreInputBox>
            <Score placeholder='점수를 입력해 주세요.' type="number" name='score' onChange={handleChangeScore}></Score>
            <ScoreValidateText>{scoreVaildateText}</ScoreValidateText>
          </ScoreInputBox>
        </ScoreBox>
        <DescriptionText>
          <BiCommentDetail></BiCommentDetail>
          코멘트
        </DescriptionText>
        <Description placeholder="내용을 입력해 주세요."></Description>
        <ScoreDialogController apply={applyScore} close={closeDialog}></ScoreDialogController>
        <CloseBtn onClick={closeDialog}>
          <MdCancel size={24}></MdCancel>
        </CloseBtn>
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

const ScoreBox = styled.div`
display: flex;
align-items: center;
flex-direction: row;
`;

const ScoreText = styled.div`
margin-right: 20px;
font-weight: 800;
`;

const Score = styled.input`
padding:10px;
border-radius:10px;
outline: none;
`;

const ScoreInputBox = styled.div`
display: flex;
flex-direction: column;
`;

const ScoreValidateText = styled.div`
font-size: x-small;
color: red;
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

const CloseBtn = styled.div`
position: absolute;
top: 1%;
left: 94%;
cursor: pointer;
`;

const ScoreDialogContainer = styled(Centering)`
flex-direction: column;
position: relative;
width: 30vw;
height: 80vh;
border-radius: 25px;
background-color: white;
box-shadow: 0 8px 8px 0 gray;
`;

export default ScoreDialog;