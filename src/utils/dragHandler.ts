import React from 'react';

const setDragAlbumData = (e: React.DragEvent<HTMLDivElement>, albumId: number) => {
  e.dataTransfer.setData('album_id', String(albumId));
}