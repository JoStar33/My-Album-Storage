import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { AiFillSave } from 'react-icons/ai';
import { AppDispatch, RootState } from '@/store';
import { setSelectedTopsterName, topsterType, asyncPatchTopsterFetch } from '../../../../store/topster';
import { useDispatch, useSelector } from 'react-redux';

const TopsterNameInfo: React.FC = () => {
  const [ isTopsterNameEdit, setIsTopsterNameEdit ] = useState(false);
  const { selectedTopster } = useSelector((state: RootState) => state.topsterStore);
  const dispatch = useDispatch<AppDispatch>();
  const handleTopsterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedTopsterName(e.target.value));
  };
  const saveEdittedTopsterName = (topster: topsterType) => {
    setIsTopsterNameEdit(false);
    dispatch(asyncPatchTopsterFetch({userId: '63a921dfa7cdfa7871cdb166', topster}));
  };
  return (
    <>
      {
        !isTopsterNameEdit &&
          <TopsterName>
            <TopsterNamePlace>{selectedTopster.name}</TopsterNamePlace>
            <TopsterNameEditButton onClick={() => setIsTopsterNameEdit(true)}>
              <MdEdit size={24}></MdEdit>
            </TopsterNameEditButton>
          </TopsterName>
      }
      {
        isTopsterNameEdit && (
          <TopsterName>
            <TopsterNameEditPlace onChange={handleTopsterName} value={selectedTopster.name || ''}></TopsterNameEditPlace>
            <TopsterNameEditButton onClick={() => saveEdittedTopsterName(selectedTopster)}>
              <AiFillSave size={24}></AiFillSave>
            </TopsterNameEditButton>
          </TopsterName>)
      }
    </>
  );
};

const TopsterName = styled.div`
width: 60%;
display: flex;
align-items: center;
justify-content: center;
`;

const TopsterNamePlace = styled.div`
position: relative;
font-size: large;
font-weight: 800;
margin-left: 30%;
`;

const TopsterNameEditButton = styled.div`
position: absolute;
border-radius: 50px;
border: 4px solid black;
top: 0%;
left: 45%;
display: flex;
align-items: center;
justify-content: center;
user-select: none;
cursor: pointer;
`;

const TopsterNameEditPlace = styled.input`
margin-left: 30%;
border: none;
outline: none;
font-size: large;
font-weight: 800;
`;

export default TopsterNameInfo;