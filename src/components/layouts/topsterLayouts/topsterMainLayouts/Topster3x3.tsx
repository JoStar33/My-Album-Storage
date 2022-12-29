import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import TopsterAlbumBoxSkeletion from '../../../../components/forms/loadingForm/TopsterAlbumBoxSkeletion';
import TopsterAlbumBox from '../../../albums/TopsterAlbumBox';

const Topster3x3: React.FC = () => {
  const { selectedTopster, getTopsterLoading } = useSelector((state: RootState) => state.topsterStore);
  return (
    <TopsterContainer>
      {
        !getTopsterLoading &&
        new Array(9).fill(1).map((_, index) => {
          console.log(index);
          return <TopsterAlbumBox 
          topsterAlbum={selectedTopster.albums.find(album => album.position === index + 1)}
          key={index + 1} 
          albumPosition={index + 1} 
          width={'25vw'}></TopsterAlbumBox>
        })
      }
      {
        getTopsterLoading &&
        new Array(9).fill(1).map((_, index) => {
          return <TopsterAlbumBoxSkeletion
          width={'25vw'}
          key={index + 1}></TopsterAlbumBoxSkeletion>
        })
      }
    </TopsterContainer>
  );
};

const TopsterContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
margin-top: 0.3vw;
margin-bottom: 0.3vw;
`;
export default Topster3x3;