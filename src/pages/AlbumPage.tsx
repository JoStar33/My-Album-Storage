import React from 'react';
import { setTokenByPost } from '../apis/tokenApi';
import AlbumDialog from '../components/searchDialogs/AlbumDialog';

const AlbumPage: React.FC = () => {
  setTokenByPost();
  return (
    <AlbumDialog></AlbumDialog>
  );
}

export default AlbumPage;