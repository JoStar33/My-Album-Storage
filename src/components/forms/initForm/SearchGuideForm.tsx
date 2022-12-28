import React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';


const SearchGuideForm: React.FC = () => {
  return (
    <SearchGuideBackground>
      <SearchGuideContainer>
        <AiOutlineSearch size={50}></AiOutlineSearch>
        <SearchGuideText>앨범을 검색해보세요!</SearchGuideText>
      </SearchGuideContainer>
    </SearchGuideBackground>
  );
};

const SearchGuideContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
user-select: none;
`;

const SearchGuideBackground = styled.div`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
width: 90%;
height: 60%;
`;

const SearchGuideText = styled.h1`

font-weight: 800;
`;

export default SearchGuideForm;