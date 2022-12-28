import React, { useState } from 'react';
import styled from 'styled-components';
import { AppDispatch } from '../../../store/index';
import { useDispatch } from 'react-redux';
import { asyncGetSpotifyAlbumFetch } from '../../../store/album';

type propsType = {
  setIsSearchStarted: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchAlbumForm: React.FC<propsType> = ({setIsSearchStarted}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParam, setSearchParam] = useState({
    query: '',
    type: 'album'
  });
  const search = async () => {
    setIsSearchStarted(true);
    await dispatch(asyncGetSpotifyAlbumFetch(searchParam));
  }
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParam({
      ...searchParam,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement> ) => {
    if (e.key === 'Enter') {
      search(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  return (
    <SearchFormContainer>
      <SearchInput placeholder='검색어를 입력해주세요.' type="text" name='query' onKeyPress={handleOnKeyPress} onChange={handleChangeSearch} />
      <SearchButton onClick={search}>검색</SearchButton>
    </SearchFormContainer>
  );
};
const Centering = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const SearchFormContainer = styled(Centering)`
flex-direction: row;
height: 10%;
width: 90%;
background-color: #a9e6d7;
margin-bottom: 2%;
margin-top: 2%;
border-radius: 20px;
box-shadow: 0 8px 8px 0 gray;
`

const SearchButton = styled(Centering)`
font-size: larger;
font-weight: 800;
width: 8%;
height: 70%;
border-radius: 20px;
background-color: skyblue;
cursor: pointer;
user-select: none;
`;

const SearchInput = styled.input`
border-radius: 20px;
width: 70%;
margin-left: 3%;
margin-right: 3%;
outline: none;
`;

export default SearchAlbumForm;