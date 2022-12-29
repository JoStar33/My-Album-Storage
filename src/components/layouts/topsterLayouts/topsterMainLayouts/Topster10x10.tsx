import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import TopsterAlbumBox from '../../../albums/TopsterAlbumBox';

const Topster10x10: React.FC = () => {
  const { selectedTopster } = useSelector((state: RootState) => state.topsterStore);
  return (
    <TopsterContainer>
      {
        new Array(100).fill(1).map((_, index) => {
          return <TopsterAlbumBox 
            topsterAlbum={selectedTopster.albums.find(album => album.position === index + 1)}
            key={index} 
            albumPosition={index + 1} 
            width={'7.1vw'}></TopsterAlbumBox>
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

export default Topster10x10;