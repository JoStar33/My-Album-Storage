import React from 'react';
import styled from 'styled-components';

const MainBox: React.FC = () => {
  return (
    <MainContainer>
      <div></div>
    </MainContainer>
  );
};

export default MainBox;

const MainContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 100vw;
height: 83vh;
`