import React from "react";
import styled from "styled-components";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

const TopsterDescription: React.FC = () => {
  const { selectedTopster } = useSelector(
    (state: RootState) => state.topsterStore
  );
  return (
    <TopsterDescriptionContainer>
      {selectedTopster.albums.map((album) => (
        <DescriptionText key={album._id}>
          {`${album.artist} - ${album.name}`}
        </DescriptionText>
      ))}
    </TopsterDescriptionContainer>
  );
};
const TopsterDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 20vw;
  height: 100vh;
`;

const DescriptionText = styled.div`
  width: 100%;
  height: 20px;
  color: white;
  display: flex;
  justify-content: flex-start;
`;

export default TopsterDescription;
