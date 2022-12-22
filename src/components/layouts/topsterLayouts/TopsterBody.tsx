import React from 'react';
import styled from 'styled-components';
import TopsterMain from './TopsterMain';
import TopsterSideBar from './TopsterSideBar';

const TopsterBody: React.FC = () => {
  return (
    <TopsterBodyContainer>
      <TopsterSideBar></TopsterSideBar>
      <TopsterMain></TopsterMain>
    </TopsterBodyContainer>
  );
};

const TopsterBodyContainer = styled.div`
width: 100vw;
height: 90vh;
display: flex;
flex-direction: row;
`;

export default TopsterBody;