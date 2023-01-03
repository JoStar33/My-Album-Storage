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
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20vw;
`;

const DescriptionText = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 20px;
  color: white;
  display: flex;
  text-align: left;
  align-items: flex-start;
  justify-content: flex-start;
`;

export default TopsterDescription;
