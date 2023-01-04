import styled, { keyframes } from "styled-components";


const Spin = keyframes`
  to { -webkit-transform: rotate(360deg); }
`;

export const LoadingBar = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${Spin} 1s ease-in-out infinite;
`;
