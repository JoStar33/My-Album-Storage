import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import AlbumDialog from '../components/searchDialogs/AlbumDialog';
import { setTokenByPost } from '../apis/tokenApi';

const AlbumPage: React.FC = () => {
  useEffect(() => {
    setTokenByPost();
  });
  const [albumDialog, setAlbumDialog] = useState(false);
  const openDialog = () => {
    setAlbumDialog(true);
  }
  return (
    <AlbumPageContainer>
      <OpenDialogButton onClick={openDialog}>다이얼로그 오픈</OpenDialogButton>
      <UserAlbumViewer></UserAlbumViewer>
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
width: 90vw;
height: 70vh;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
`;

const OpenDialogButton = styled(Centering)`
background-color: skyblue;
width: 200px;
height: 50px;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
user-select: none;
cursor: pointer;
`;

const AlbumPageContainer = styled(Centering)`
`;

export default AlbumPage;