import React from 'react';
import styled from 'styled-components';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import TopsterUserAlbumBox from '../../../albums/TopsterUserAlbumBox';

const TopsterUsersAlbum: React.FC = () => {
  const { userAlbums } = useSelector((state: RootState) => state.albumStore);
  return (
    <TopsterUsersAlbumContainer>
      {
        userAlbums.map(album => {
          return <TopsterUserAlbumBox key={album.id} album={ album }/>
        })
      }
    </TopsterUsersAlbumContainer>
  );
};

const TopsterUsersAlbumContainer = styled.div`
width: 95%;
margin-bottom: 1%;
display: flex;
justify-content: center;
flex-wrap: wrap;
overflow-y: scroll;
::-webkit-scrollbar {
    display: none;
}
`;

export default TopsterUsersAlbum;