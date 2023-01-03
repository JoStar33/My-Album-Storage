import React from "react";
import styled from "styled-components";
import NavBar from "../components/layouts/steamTopsterLayouts/NavBar";
import MainView from "../components/layouts/steamTopsterLayouts/MainView";

const SteamTopsterPage: React.FC = () => {
  return (
    <SteamTopsterPageContainer>
      <NavBar></NavBar>
      <MainView></MainView>
    </SteamTopsterPageContainer>
  );
};

const SteamTopsterPageContainer = styled.div`
  background-color: black;
  width: 100vw;
  height: 200vh;
`;

export default SteamTopsterPage;
