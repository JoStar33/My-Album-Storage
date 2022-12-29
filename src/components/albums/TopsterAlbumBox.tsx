import React, {useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { asyncPatchTopsterAlbumFetch, asyncDeleteTopsterFetch, topsterType, topsterAlbumType } from '../../store/topster';


type propsType = {
  width: string,
  albumPosition: number,
  topsterAlbum: topsterAlbumType | undefined
};

const TopsterAlbumBox: React.FC<propsType> = ({width, albumPosition, topsterAlbum}) => {
  const dispatch = useDispatch<AppDispatch>();
  const topsterAlbumRef = useRef<any>(null);
  useEffect(() => {
    topsterAlbumRef.current.classList.add(albumPosition);
  }, [albumPosition]);
  const { userAlbums } = useSelector((state: RootState) => state.albumStore);
  const { selectedTopster } = useSelector((state: RootState) => state.topsterStore);

  const handleDragStartEvent = (e: React.DragEvent<HTMLDivElement>) => {
    if(!topsterAlbum?._id) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('album_id', String(topsterAlbum?._id));
  };
  const handleDragOverEvent = (e: React.DragEvent<HTMLDivElement>) =>  {
    e.preventDefault();
  };
  const handleDragEndEvent = (e: React.DragEvent<HTMLDivElement>, topster: topsterType, position: number) => {
    const droppedAlbum = document.getElementsByClassName('dropped')[0];
    const draggedAlbumClassName = e.currentTarget.className;
    if(!draggedAlbumClassName || !droppedAlbum) {
      dispatch(asyncDeleteTopsterFetch({topster, topsterPosition: position}));
      return;
    }
    if(droppedAlbum.className !== draggedAlbumClassName) {
      dispatch(asyncDeleteTopsterFetch({topster, topsterPosition: position}));
    }
    droppedAlbum.classList.remove('dropped');
  };
  const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add('dropped');
    const draggedData = e.dataTransfer.getData('album_id');
    console.log(selectedTopster);
    setAlbum(draggedData, selectedTopster);
    e.preventDefault();
    e.stopPropagation();
  };
  const setAlbum = (albumId: string, topster: topsterType) => {
    dispatch(asyncPatchTopsterAlbumFetch({topster, topsterAlbum: {...userAlbums.filter(album => album._id === albumId)[0], position: albumPosition}}));
  };
  return (
    <TopsterAlbumContainer 
      ref={topsterAlbumRef}
      onDragStart={handleDragStartEvent} 
      onDragOver={handleDragOverEvent} 
      onDragEnd={(e) => handleDragEndEvent(e, selectedTopster, albumPosition)}
      onDrop={handleDropEvent} 
      width={width}
      draggable={
        topsterAlbum?._id !== undefined ? true : false
      }
    >
      <TopsterBackground>
        {
          topsterAlbum?._id !== undefined && <TopsterImage src={topsterAlbum?.image}></TopsterImage>
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