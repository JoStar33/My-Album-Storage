import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AlbumDialog from '../components/searchDialogs/AlbumDialog';
import { setTokenByPost } from '../apis/tokenApi';
import { AppDispatch } from '../store';
import { asyncGetAlbumFetch } from '../store/album';
import { useDispatch } from 'react-redux';
import TopsterBody from '../components/layouts/topsterLayouts/TopsterBody';
import TopsterHeader from '../components/layouts/topsterLayouts/topsterHeaderLayouts/TopsterHeader';

const MakeTopsterPage: React.FC = () => {
  const [topsterLayout, setTopsterLayout] = useState('3x3');
  const [albumDialog, setAlbumDialog] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(asyncGetAlbumFetch(30));
    setTokenByPost();
  }, []);
  return (
    <MainDiv>
      <TopsterHeader setTopsterLayout={setTopsterLayout}></TopsterHeader>
      <TopsterBody topsterLayout={topsterLayout} setAlbumDialog={setAlbumDialog}></TopsterBody>
      {
        albumDialog && <AlbumDialog setAlbumDialog={setAlbumDialog}></AlbumDialog>
      }
    </MainDiv>
  );
};

const MainDiv = styled.div`
width: 100vw;
height: 100vh;
`;

export default MakeTopsterPage;