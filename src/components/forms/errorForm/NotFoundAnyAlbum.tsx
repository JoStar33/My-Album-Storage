import React from "react";
import styled from "styled-components";
import { RiErrorWarningFill } from "react-icons/ri";

const NotFoundAnyAlbum: React.FC = () => {
  return (
    <NotFoundBackground>
      <NotFoundContainer>
        <RiErrorWarningFill size={50}></RiErrorWarningFill>
        <NotFoundText>이곳은 놀랍도록 조용하군요...</NotFoundText>
      </NotFoundContainer>
      <NotFoundText>다시 검색해보세요!</NotFoundText>
    </NotFoundBackground>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  user-select: none;
`;

const NotFoundBackground = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 60%;
`;

const NotFoundText = styled.h1`
  font-weight: 800;
`;

export default NotFoundAnyAlbum;
