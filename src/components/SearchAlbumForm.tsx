import React, { useState } from 'react';
import styled from 'styled-components';
import { AppDispatch } from '../store/index';
import { useDispatch } from 'react-redux';
import { asyncGetAlbumFetch } from '../store/album';


const SearchAlbumForm: React.FC = () => {
  const typeData = [
    {
      name: '아티스트',
      value: 'artist'
    },
    { 
      name: '앨범', 
      value: 'album'
    }
  ];
  const dispatch = useDispatch<AppDispatch>();
  const [searchParam, setSearchParam] = useState({
    query: '',
    type: 'album'
  });
  const search = async () => {
    await dispatch(asyncGetAlbumFetch(searchParam))
  }
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParam({
      ...searchParam,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <SearchFormContainer>
      <SearchSelect onChange={onChangeSearch} name='type'>
        {
          typeData.map(type => 
            <option value={type.value}>{type.name}</option>)
        }
      </SearchSelect>
      <SearchInput type="text" name='query' onChange={onChangeSearch} />
      <SearchBtn onClick={search}>검색</SearchBtn>
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
border-radius: 20px;
box-shadow: 0 8px 8px 0 gray;
`

const SearchBtn = styled(Centering)`
font-size: larger;
font-weight: 800;
width: 8%;
height: 70%;
border-radius: 20px;
background-color: skyblue;
cursor: pointer;
user-select: none;
`;

const SearchSelect = styled.select`
width: 10%;
`;
const SearchInput = styled.input`
border-radius: 20px;
width: 70%;
margin-left: 3%;
margin-right: 3%;
`;

export default SearchAlbumForm;