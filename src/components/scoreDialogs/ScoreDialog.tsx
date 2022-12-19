import React, {useState} from 'react';
import styled from 'styled-components';
import '../../styles/fire_font.css';
import { AppDispatch } from '../../store/index';
import { useDispatch } from 'react-redux';
import { albumType, setScore, setIsSelected } from '../../store/album';
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
    if(!Number.isNaN(parseInt(userScore)) && parseInt(userScore) > 0){
      dispatch(setScore({id: album.id, score: parseInt(userScore)}));
      dispatch(setIsSelected({id: album.id, isSelected: true}));
      selectedAlbums.push(album);
      const albumIndex = selectedAlbums.findIndex(selectedAlbum => selectedAlbum.id === album.id);
      selectedAlbums[albumIndex] = {...selectedAlbums[albumIndex], score: parseInt(userScore)};
      setScoreDialog(false);
    } else {

    }
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
          <h1 className="blazing">{userScore}</h1>
        </div>
        <Score type="number" name='score' onChange={handleChangeScore}></Score>
        <Description></Description>
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

const AlbumTitle = styled.div`
font-size: larger;
font-weight: 800;
`;

const AlbumImg = styled.img`
width: 9vw;
height: 9vw;
`;

const ArtistName = styled.div`
font-weight: 800;
`;

const Score = styled.input`

`;

const Description = styled.textarea`
width: 90%;
height: 30%;
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