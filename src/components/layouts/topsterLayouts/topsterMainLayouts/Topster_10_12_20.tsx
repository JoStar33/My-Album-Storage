import React from 'react';
import styled from 'styled-components';
import TopsterAlbumBox from '../../../albums/TopsterAlbumBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const Topster_10_12_20: React.FC = () => {
  const { selectedTopster } = useSelector((state: RootState) => state.topsterStore);
  return (
    <TopsterContainer>
      {
        new Array(10).fill(1).map((_, index) => {
          return <TopsterAlbumBox 
          topsterAlbum={selectedTopster.albums.find(album => album.position === index + 1)} 
          key={index} 
          albumPosition={index + 1} 
          width={'14.8vw'}></TopsterAlbumBox>
        })
      }
      {
        new Array(12).fill(10).map((_, index) => {
          return <TopsterAlbumBox 
          topsterAlbum={selectedTopster.albums.find(album => album.position === index + 1)} 
          key={index} albumPosition={index + 1} 
          width={'12.2vw'}></TopsterAlbumBox>
        })
      }
      {
        new Array(20).fill(22).map((_, index) => {
          return <TopsterAlbumBox 
          topsterAlbum={selectedTopster.albums.find(album => album.position === index + 1)} 
          key={index} 
          albumPosition={index + 1} 
          width={'7.08vw'}></TopsterAlbumBox>
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


export default Topster_10_12_20;