import React from 'react';
import styled from 'styled-components';

const AlbumSkeleton: React.FC = () => {
  return (
    <AlbumBoxContainer>
      <AlbumImg></AlbumImg>
      <AlbumName></AlbumName>
    </AlbumBoxContainer>
  );
};

export default AlbumSkeleton;

const SceletonDefault = styled.div`
position: relative;
overflow: hidden;
background: #f2f2f2;
@keyframes loading {
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(460px);
  }
}
::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 100%;
  background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  animation: loading 2s infinite linear;
}
`;

const AlbumBoxContainer = styled.div`
width: 14%;
background-color: white;
box-shadow: 0 6px 6px 0 gray;
border-radius: 20px;
margin-left: 1.3%;
margin-right: 1.3%;
margin-top: 2%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
overflow: hidden;
position: relative;
user-select: none;
`;

const AlbumImg = styled(SceletonDefault)`
margin-top: 1vw;
width: 9vw;
height: 9vw;
`;

const AlbumName = styled.span`
height: 20px;
`
