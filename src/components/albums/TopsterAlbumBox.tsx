import React, { useRef, useEffect, memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useSelector } from "react-redux";
import {
  asyncPatchTopsterAlbumFetch,
  asyncDeleteTopsterFetch
} from "../../store/topster";
import { topsterAlbumType, topsterType } from "@/types/topster";

type propsType = {
  width: string;
  albumPosition: number;
  topsterAlbum: topsterAlbumType | undefined;
};

const TopsterAlbumBox: React.FC<propsType> = ({
  width,
  albumPosition,
  topsterAlbum,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const topsterAlbumRef = useRef<any>(null);
  const { userAlbums } = useSelector((state: RootState) => state.albumStore);
  const { selectedTopster } = useSelector(
    (state: RootState) => state.topsterStore
  );
  useEffect(() => {
    topsterAlbumRef.current.classList.add(albumPosition);
  }, [albumPosition]);

  const handleDragStartEvent = (
    e: React.DragEvent<HTMLDivElement>,
    topsterAlbum: topsterAlbumType | undefined
  ) => {
    if (!topsterAlbum?._id) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("album_id", topsterAlbum?._id);
    e.dataTransfer.setData("album_position", String(topsterAlbum?.position));
  };

  const handleDragOverEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEndEvent = (topster: topsterType, albumPosition: number) => {
    const droppedAlbum = document.getElementsByClassName("dropped")[0];
    //영역밖으로 드랍을 했을시 삭제.
    !droppedAlbum
      ? dispatch(asyncDeleteTopsterFetch({ topster, topsterPosition: albumPosition }))
      : droppedAlbum.classList.remove("dropped");
  };

  const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add("dropped");
    const draggedAlbumId = e.dataTransfer.getData("album_id");
    //앨범을 정확하게 기억시키기 위해 position값까지 추가.
    const draggedAlbumPosition = parseInt(e.dataTransfer.getData("album_position"));
    setAlbum(draggedAlbumId, draggedAlbumPosition, selectedTopster);
    e.preventDefault();
    e.stopPropagation();
  };

  const setAlbum = (
    draggedAlbumId: string,
    draggedAlbumPosition: number,
    topster: topsterType
  ) => {
    const currentAlbum = topster.albums.filter(
      (album) =>
        album._id === draggedAlbumId && album.position === draggedAlbumPosition
    )[0];
    currentAlbum 
    ? dispatch(asyncDeleteTopsterFetch({topster, topsterPosition: currentAlbum.position,}))
    : dispatch(asyncPatchTopsterAlbumFetch({topster, 
      topsterAlbum: {
        ...userAlbums.filter((album) => album._id === draggedAlbumId)[0],
        position: albumPosition,
      },}));
  };

  return (
    <TopsterAlbumContainer
      ref={topsterAlbumRef}
      onDragStart={(e) => handleDragStartEvent(e, topsterAlbum)}
      onDragOver={handleDragOverEvent}
      onDragEnd={() => handleDragEndEvent(selectedTopster, albumPosition)}
      onDrop={handleDropEvent}
      width={width}
      draggable={topsterAlbum?._id !== undefined ? true : false}
    >
      <TopsterBackground>
        {topsterAlbum?._id !== undefined && (
          <TopsterImage src={topsterAlbum?.image}></TopsterImage>
        )}
      </TopsterBackground>
    </TopsterAlbumContainer>
  );
};

interface widthType {
  width: string;
}

const TopsterAlbumContainer = styled.div<widthType>`
  width: ${(props) => {
    return props.width;
  }};
  height: ${(props) => {
    return props.width;
  }};
  margin: 0.3vw;
`;

const TopsterBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const TopsterImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default memo(TopsterAlbumBox);
