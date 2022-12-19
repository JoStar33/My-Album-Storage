import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingForm: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingBar></LoadingBar>
    </LoadingContainer>
  );
};

export default LoadingForm;

const LoadingContainer = styled.div`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.4);
width: 100vw;
height: 100vh;
top: 0;
left: 0;
`;

const Spin = keyframes`
  to { -webkit-transform: rotate(360deg); }
`;

const LoadingBar = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${Spin} 1s ease-in-out infinite;
`;