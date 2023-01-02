import React from "react";
import styled from "styled-components";
import MainBox from "../components/layouts/defaultLayouts/MainBox";
import NavBar from "../components/layouts/defaultLayouts/NavBar";
import FooterBar from "../components/layouts/defaultLayouts/FooterBar";

const MainPage: React.FC = () => {
  return (
    <MainDiv>
      <NavBar></NavBar>
      <MainBox></MainBox>
      <FooterBar></FooterBar>
    </MainDiv>
  );
};

export default MainPage;

const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;
