import React from 'react';
import styled from 'styled-components';

type propsType = {
  album: Object,
};

const AlbumBox: React.FC<propsType> = ({album}) => {
  return (
    <AlbumBoxContainer>
      
    </AlbumBoxContainer>
  );
}

const AlbumBoxContainer = styled.div`
width: 12vw;
height: 14vh;
background-color: white;
box-shadow: 0 6px 6px 0 gray;
border-radius: 20px;
margin-left: 0.5vw;
margin-right: 0.5vw;
display: flex;
justify-content: center;
align-items: center;
`;

export default AlbumBox;