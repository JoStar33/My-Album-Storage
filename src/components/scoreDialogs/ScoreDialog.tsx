import React, {useState} from 'react';
import styled from 'styled-components';
import '../../styles/fire_font.css';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import { albumType, setScore, setIsSelected } from '../../store/album';
import { GrScorecard } from 'react-icons/gr';
import { BiCommentDetail } from 'react-icons/bi';
import ScoreDialogController from './ScoreDialogController';

type propsType = {
  album: albumType,
  selectedAlbums: albumType[],
  setScoreDialog: React.Dispatch<React.SetStateAction<boolean>>
};

const ScoreDialog: React.FC<propsType> = ({album, selectedAlbums, setScoreDialog}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [userScore, setUserScore] = useState(``);
  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserScore(e.target.value);
  }
  const applyScore = () => {
    if(Number.isNaN(parseInt(userScore))){
      return
    }
    if(parseInt(userScore) <= 0 && parseInt(userScore) > 100) {
      return
    }
    dispatch(setScore({id: album.id, score: parseInt(userScore)}));
    dispatch(setIsSelected({id: album.id, isSelected: true}));
    if(!selectedAlbums.find(selectedAlbum => selectedAlbum.id === album.id)) {
      selectedAlbums.push(album);
    }
    const albumIndex = selectedAlbums.findIndex(selectedAlbum => selectedAlbum.id === album.id);
    selectedAlbums[albumIndex] = {...selectedAlbums[albumIndex], score: parseInt(userScore)};
    setScoreDialog(false);
  }
  const closeDialog = () => {
    setScoreDialog(false);
  }
  return (
    <DialogBackground>
      <ScoreDialogContainer>
        <AlbumTitle>
          {album.albumName}
        </AlbumTitle>
        <AlbumImg src={album.albumImg}></AlbumImg>
        <ArtistName>
          {album.artistName}
        </ArtistName>
        <div className="fire">
          <h1 className="blazing">{album.score ? album.score : userScore}</h1>
        </div>
        <ScoreBox>
          <GrScorecard size={24}></GrScorecard>
          <ScoreText>나의 점수는?</ScoreText>
          <Score placeholder='점수를 입력해 주세요.' type="number" name='score' onChange={handleChangeScore}></Score>
        </ScoreBox>
        <DescriptionText>
          <BiCommentDetail></BiCommentDetail>
          코멘트
        </DescriptionText>
        <Description placeholder="내용을 입력해 주세요."></Description>
        <ScoreDialogController apply={applyScore} close={closeDialog}></ScoreDialogController>
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
width: 9vw;
height: 9vw;
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

const ScoreDialogContainer = styled(Centering)`
flex-direction: column;
width: 30vw;
height: 60vh;
border-radius: 25px;
background-color: white;
box-shadow: 0 8px 8px 0 gray;
`;

export default ScoreDialog;