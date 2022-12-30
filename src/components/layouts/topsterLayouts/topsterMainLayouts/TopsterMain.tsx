import React from 'react';
import styled from 'styled-components';
import Topster3x3 from './Topster3x3';
import Topster5x5 from './Topster5x5';
import Topster6x6 from './Topster6x6';
import Topster10x10 from './Topster10x10';
import Topster_10_12_20 from './Topster_10_12_20';

type propsType = {
  topsterLayout: string,
}


const TopsterMain: React.FC<propsType> = ({topsterLayout}) => {
  return (
    <TopsterMainContainer>
      {
        topsterLayout === '3x3' && <Topster3x3></Topster3x3>
      }
      {
        topsterLayout === '5x5' && <Topster5x5></Topster5x5>
      }
      {
        topsterLayout === '6x6' && <Topster6x6></Topster6x6>
      }
      {
        topsterLayout === '10x10' && <Topster10x10></Topster10x10>
      }
      {
        topsterLayout === '10_12_20' && <Topster_10_12_20></Topster_10_12_20>
      }
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