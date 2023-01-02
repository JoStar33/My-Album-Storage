import React from "react";
import styled from "styled-components";

const UserAlbumSkeleton: React.FC = () => {
  return (
    <UserAlbumContainer>
      <UserAlbumImg></UserAlbumImg>
      <UserAlbumName></UserAlbumName>
    </UserAlbumContainer>
  );
};

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

const UserAlbumContainer = styled.div`
  width: 30%;
  height: 50vh;
  border-radius: 20px;
  margin: 1.5%;
  box-shadow: 0 6px 6px 0 gray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  user-select: none;
  cursor: pointer;
`;

const UserAlbumImg = styled(SceletonDefault)`
  margin-top: 1vw;
  width: 17vw;
  height: 17vw;
`;

const UserAlbumName = styled.h2`
  width: 90%;
  font-weight: 800;
  height: 40px;
`;

export default UserAlbumSkeleton;
