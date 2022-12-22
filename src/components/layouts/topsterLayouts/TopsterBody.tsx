import React from 'react';
import styled from 'styled-components';
import TopsterMain from './topsterMainLayouts/TopsterMain';
import TopsterSideBar from './topsterSideBarLayouts/TopsterSideBar';

const TopsterBody: React.FC = () => {
  return (
    <TopsterBodyContainer>
      <TopsterSideBar></TopsterSideBar>
      <TopsterMain></TopsterMain>
    </TopsterBodyContainer>
  );
};

const TopsterBodyContainer = styled.div`
width: 98vw;
height: 86vh;
display: flex;
flex-direction: row;
margin-bottom: 1vh;
margin-left: 1vw;
margin-right: 1vw;
`;

export default TopsterBody;