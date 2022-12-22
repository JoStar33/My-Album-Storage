import React from 'react';
import styled from 'styled-components';
import TopsterBody from '../components/layouts/topsterLayouts/TopsterBody';
import TopsterHeader from '../components/layouts/topsterLayouts/TopsterHeader';

const MakeTopsterPage: React.FC = () => {
  return (
    <MainDiv>
      <TopsterHeader></TopsterHeader>
      <TopsterBody></TopsterBody>
    </MainDiv>
  );
};

const MainDiv = styled.div`
width: 100vw;
height: 100vh;
`;

export default MakeTopsterPage;