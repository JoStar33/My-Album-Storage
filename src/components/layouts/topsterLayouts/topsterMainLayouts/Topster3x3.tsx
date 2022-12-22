import React from 'react';
import styled from 'styled-components';
import TopsterAlbumBox from '../../../albums/TopsterAlbumBox';

const Topster3x3: React.FC = () => {
  return (
    <Topster3x3Container>
      {
        new Array(9).fill(1).map((_, index) => {
          return <TopsterAlbumBox key={index} width={'25vw'}></TopsterAlbumBox>
        })
      }
    </Topster3x3Container>
  );
};

const Topster3x3Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
margin-top: 0.3vw;
margin-bottom: 0.3vw;
`;
export default Topster3x3;