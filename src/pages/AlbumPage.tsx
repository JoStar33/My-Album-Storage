import React, {useEffect} from 'react';
import { setTokenByPost } from '../apis/tokenApi';
import AlbumDialog from '../components/searchDialogs/AlbumDialog';

const AlbumPage: React.FC = () => {
  useEffect(() => {setTokenByPost();})
  return (
    <AlbumDialog></AlbumDialog>
  );
}

export default AlbumPage;