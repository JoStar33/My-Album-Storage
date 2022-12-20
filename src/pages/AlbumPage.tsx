import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import AlbumDialog from '../components/searchDialogs/AlbumDialog';
import { setTokenByPost } from '../apis/tokenApi';

const AlbumPage: React.FC = () => {
  useEffect(() => {
    setTokenByPost();
  });
  const [albumDialog, setAlbumDialog] = useState(false);
  return (
    <AlbumPageContainer>
      <UserAlbumViewer></UserAlbumViewer>
      {
        albumDialog && <AlbumDialog setAlbumDialog={setAlbumDialog}></AlbumDialog>
      }
    </AlbumPageContainer>
  );
};
const UserAlbumViewer = styled.div`
`;

const AlbumPageContainer = styled.div`
`;

export default AlbumPage;