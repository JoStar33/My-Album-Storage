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
  }, [albumPosition])
  const [topsterAlbum, setTopsterAlbum] = useState({} as userAlbumType | undefined);
  const { userAlbums } = useSelector((state: RootState) => state.albumStore);

  const dropTheAlbum = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedData = e.dataTransfer.getData('album_id');
    setAlbum(parseInt(draggedData));
  }
  const setAlbum = (albumId: number) => {
    setTopsterAlbum(userAlbums.find(album => album.id === albumId));
  };
  const allowDrop = (e: React.DragEvent<HTMLDivElement>) =>  {
    e.preventDefault();
  };
  const setDragAlbumData = (e: React.DragEvent<HTMLDivElement>) => {
    topsterAlbumRef.current.classList.add("dragged");
    e.dataTransfer.setData('album_id', String(topsterAlbum?.id));
  };
  const deleteDragAlbumData = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(String(albumPosition));
    console.log(document.getElementsByClassName("dragged")[0].className);
    console.log(e.currentTarget.className);
    if(!document.getElementsByClassName("dragged")[0].className.includes(e.currentTarget.className)){
      setTopsterAlbum({} as userAlbumType);
    }
  }
  return (
    <TopsterAlbumContainer 
      onDragStart={setDragAlbumData} 
      onDragOver={allowDrop} 
      onDragEnd={deleteDragAlbumData}
      onDrop={dropTheAlbum} 
      width={width}
      ref={topsterAlbumRef}
      draggable
    >
      <TopsterBackground>
        {
          topsterAlbum && <TopsterImage src={topsterAlbum?.image}></TopsterImage>
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