import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { userAlbumType } from '../../store/album';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

type propsType = {
  width: string,
  albumPosition: number
};

const TopsterAlbumBox: React.FC<propsType> = ({width, albumPosition}) => {
  const topsterAlbumRef = useRef<any>(null);
  useEffect(() => {
    topsterAlbumRef.current.classList.add(albumPosition);
  }, [albumPosition]);
  const [topsterAlbum, setTopsterAlbum] = useState({} as userAlbumType | undefined);
  const { userAlbums } = useSelector((state: RootState) => state.albumStore);


  const handleDragStartEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('album_id', String(topsterAlbum?.id));
  };
  const handleDragOverEvent = (e: React.DragEvent<HTMLDivElement>) =>  {
    e.preventDefault();
  };
  const handleDragEndEvent = (e: React.DragEvent<HTMLDivElement>) => {
    const droppedAlbum = document.getElementsByClassName('dropped')[0];
    const draggedAlbumClassName = e.currentTarget.className;
    if(!draggedAlbumClassName || !droppedAlbum) {
      setTopsterAlbum({} as userAlbumType);
      return;
    }
    if(droppedAlbum.className !== draggedAlbumClassName)
      setTopsterAlbum({} as userAlbumType);
    droppedAlbum.classList.remove('dropped');
  };
  const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add('dropped');
    const draggedData = e.dataTransfer.getData('album_id');
    setAlbum(parseInt(draggedData));
    e.preventDefault();
    e.stopPropagation();
  }
  const setAlbum = (albumId: number) => {
    setTopsterAlbum(userAlbums.find(album => album.id === albumId));
  };
  return (
    <TopsterAlbumContainer 
      ref={topsterAlbumRef}
      onDragStart={handleDragStartEvent} 
      onDragOver={handleDragOverEvent} 
      onDragEnd={handleDragEndEvent}
      onDrop={handleDropEvent} 
      width={width}
      draggable
    >
      <TopsterBackground>
        {
          topsterAlbum?.id !== undefined && <TopsterImage src={topsterAlbum?.image}></TopsterImage>
        }
      </TopsterBackground>
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

const TopsterBackground = styled.div`
width: 100%;
height: 100%;
background-color: white;
`;

const TopsterImage = styled.img`
width: 100%;
height: 100%;
`;

export default TopsterAlbumBox;