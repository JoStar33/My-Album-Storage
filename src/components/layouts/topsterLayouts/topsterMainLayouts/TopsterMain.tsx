import React from 'react';
import styled from 'styled-components';
import Topster3x3 from './Topster3x3';

type propsType = {
  topsterForm: string
}

const TopsterMain: React.FC = () => {
  return (
    <TopsterMainContainer>
      <Topster3x3></Topster3x3>
    </TopsterMainContainer>
  );
};

const TopsterMainContainer = styled.div`
margin-left: 1vw;
width: 79vw;
height: 100%;
border-radius: 20px;
box-shadow: 0 6px 6px 0 gray;
background-color: black;
overflow-y: scroll;
::-webkit-scrollbar {
    display: none;
}
`;

export default TopsterMain;