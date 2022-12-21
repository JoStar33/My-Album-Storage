import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import AlbumDialog from '../components/searchDialogs/AlbumDialog';
import { setTokenByPost } from '../apis/tokenApi';
import { RootState, AppDispatch } from '../store';
import { asyncGetAlbumFetch } from '../store/album';
import { useSelector, useDispatch } from 'react-redux';
import UserAlbumBox from '../components/albums/UserAlbumBox';
import UserAlbumSkeleton from '../components/loadingForm/UserAlbumSkeleton';

const AlbumPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(asyncGetAlbumFetch(30));
    setTokenByPost();
  }, []);
  const { userAlbums, getAlbumLoading } = useSelector((state: RootState) => state.albumStore);
  const [albumDialog, setAlbumDialog] = useState(false);
  const openDialog = () => {
    setAlbumDialog(true);
  }
  return (
    <AlbumPageContainer>
      <ButtonContainer>
        <OpenDialogButton onClick={ openDialog }>다이얼로그 오픈</OpenDialogButton>
      </ButtonContainer>
      <UserAlbumViewer>
        {
          !getAlbumLoading && userAlbums.map(album => 
            <UserAlbumBox key={album.id} album={album}></UserAlbumBox>)
        }
        {
          getAlbumLoading && new Array(9).fill(1).map((_, index) => {
            return <UserAlbumSkeleton key={index}></UserAlbumSkeleton>
          })
        }
      </UserAlbumViewer>
      {
        albumDialog && <AlbumDialog setAlbumDialog={setAlbumDialog}></AlbumDialog>
      }
    </AlbumPageContainer>
  );
};

const Centering = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const UserAlbumViewer = styled.div`
display: flex;
flex-wrap: wrap;
overflow-y: scroll;
width: 90vw;
height: 70vh;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
::-webkit-scrollbar {
    display: none;
}
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: right;
align-items: center;
width: 90vw;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
font-weight: 800;
margin-bottom: 20px;
`;

const OpenDialogButton = styled(Centering)`
background-color: skyblue;
width: 200px;
height: 50px;
border-radius: 20px;
font-weight: 800;
box-shadow: 0 6px 6px 0 gray;
user-select: none;
cursor: pointer;
`;

const AlbumPageContainer = styled(Centering)`
flex-direction: column;
`;

export default AlbumPage;