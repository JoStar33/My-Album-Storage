import React from "react";
import styled from "styled-components";
import TopsterAlbumBox from "../../../albums/TopsterAlbumBox";
import TopsterAlbumBoxSkeletion from "../../../forms/loadingForm/TopsterAlbumBoxSkeletion";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const Topster_10_12_20: React.FC = () => {
  const { selectedTopster, getTopsterLoading } = useSelector(
    (state: RootState) => state.topsterStore
  );
  return (
    <TopsterContainer>
      {!getTopsterLoading &&
        new Array(10)
          .fill(1)
          .map((_, index) => (
            <TopsterAlbumBox
              topsterAlbum={selectedTopster.albums.find(
                (album) => album.position === index + 1
              )}
              key={index}
              albumPosition={index + 1}
              width={"14.8vw"}
            ></TopsterAlbumBox>
          ))}
      {!getTopsterLoading &&
        new Array(12)
          .fill(1)
          .map((_, index) => (
            <TopsterAlbumBox
              topsterAlbum={selectedTopster.albums.find(
                (album) => album.position === index + 11
              )}
              key={index + 11}
              albumPosition={index + 11}
              width={"12.2vw"}
            ></TopsterAlbumBox>
          ))}
      {!getTopsterLoading &&
        new Array(20)
          .fill(1)
          .map((_, index) => (
            <TopsterAlbumBox
              topsterAlbum={selectedTopster.albums.find(
                (album) => album.position === index + 23
              )}
              key={index + 23}
              albumPosition={index + 23}
              width={"7.08vw"}
            ></TopsterAlbumBox>
          ))}
      {getTopsterLoading &&
        new Array(10)
          .fill(1)
          .map((_, index) => (
            <TopsterAlbumBoxSkeletion
              width={"14.8vw"}
              key={index + 1}
            ></TopsterAlbumBoxSkeletion>
          ))}
      {getTopsterLoading &&
        new Array(12)
          .fill(1)
          .map((_, index) => (
            <TopsterAlbumBoxSkeletion
              width={"12.2vw"}
              key={index + 11}
            ></TopsterAlbumBoxSkeletion>
          ))}
      {getTopsterLoading &&
        new Array(20)
          .fill(1)
          .map((_, index) => (
            <TopsterAlbumBoxSkeletion
              width={"7.08vw"}
              key={index + 23}
            ></TopsterAlbumBoxSkeletion>
          ))}
    </TopsterContainer>
  );
};

const TopsterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0.3vw;
  margin-bottom: 0.3vw;
`;

export default Topster_10_12_20;
