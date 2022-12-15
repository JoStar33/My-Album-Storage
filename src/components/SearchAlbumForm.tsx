import React from 'react';
import styled from 'styled-components';
import { AppDispatch } from '../store/index'

type propsType = {
  setAlbumData: React.Dispatch<React.SetStateAction<Object[]>>
};

const SearchAlbumForm: React.FC<propsType> = () => {
  return (
    <div>
      
    </div>
  );
};

const SearchFormContainer = styled.div`

`

export default SearchAlbumForm;