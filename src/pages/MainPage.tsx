import React from 'react';
import styled from 'styled-components';
import MainBox from '../components/layouts/MainBox';
import NavBar from '../components/layouts/NavBar';
import FooterBar from '../components/layouts/FooterBar';

const MainPage: React.FC = () => {
  return (
    <MainDiv>
      <NavBar></NavBar>
      <MainBox></MainBox>
      <FooterBar></FooterBar>
    </MainDiv>
  );
}

export default MainPage;

const MainDiv = styled.div`
width: 100vw;
height: 100vh;
`;