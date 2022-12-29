import React from 'react';
import styled from 'styled-components';

type propsType = {
  width: string,
};

const TopsterAlbumBoxSkeletion: React.FC<propsType> = ({width}) => {
  return (
    <TopsterAlbumContainer width={width}>
      <TopsterBackground></TopsterBackground>
    </TopsterAlbumContainer>
  );
};

interface widthType {
  width: string;
};

const TopsterAlbumContainer = styled.div<widthType>`
width: ${(props) => { 
  return props.width;
}};
height: ${(props) => { 
  return props.width;
}};
margin: 0.3vw;
`;

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

const TopsterBackground = styled(SceletonDefault)`
width: 100%;
height: 100%;
`;

export default TopsterAlbumBoxSkeletion;