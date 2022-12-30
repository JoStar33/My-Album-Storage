import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AlbumDialog from '../components/dialogs/searchDialogs/AlbumDialog';
import TopsterBody from '../components/layouts/topsterLayouts/TopsterBody';
import TopsterHeader from '../components/layouts/topsterLayouts/topsterHeaderLayouts/TopsterHeader';
import { setTokenByPost } from '../apis/tokenApi';
import { AppDispatch, RootState } from '../store';
import { asyncGetAlbumFetch } from '../store/album';
import { asyncGetTopsterFetch } from '../store/topster';
import { useSelector, useDispatch } from 'react-redux';

const MakeTopsterPage: React.FC = () => {
  const { selectedTopster } = useSelector((state: RootState) => state.topsterStore);
  const [topsterLayout, setTopsterLayout] = useState(selectedTopster.type);
  const [albumDialog, setAlbumDialog] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(asyncGetAlbumFetch('63a921dfa7cdfa7871cdb166'));
    dispatch(asyncGetTopsterFetch('63a921dfa7cdfa7871cdb166'));
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