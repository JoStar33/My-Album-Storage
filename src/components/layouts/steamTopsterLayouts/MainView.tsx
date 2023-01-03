import React from "react";
import styled from "styled-components";
import TopsterMain from "../topsterLayouts/topsterMainLayouts/TopsterMain";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import TopsterDescription from "./TopsterDescription";

const MainView: React.FC = () => {
  const { selectedTopster } = useSelector(
    (state: RootState) => state.topsterStore
  );
  return (
    <MainViewContainer>
      <TopsterMainContainer>
        <TopsterMain topsterLayout={selectedTopster.type}></TopsterMain>
      </TopsterMainContainer>
      <TopsterDescription></TopsterDescription>
    </MainViewContainer>
  );
};

const TopsterMainContainer = styled.div`
width: 78vw;
`;

const MainViewContainer = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
`;

export default MainView;
