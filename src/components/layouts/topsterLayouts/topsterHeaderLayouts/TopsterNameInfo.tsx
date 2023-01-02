import React, { useState } from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";
import { AppDispatch, RootState } from "@/store";
import {
  setSelectedTopsterName,
  topsterType,
  asyncPatchTopsterFetch,
} from "../../../../store/topster";
import { useDispatch, useSelector } from "react-redux";

const TopsterNameInfo: React.FC = () => {
  const [isTopsterNameEdit, setIsTopsterNameEdit] = useState(false);
  const { selectedTopster } = useSelector(
    (state: RootState) => state.topsterStore
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleTopsterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedTopsterName(e.target.value));
  };
  const saveEdittedTopsterName = (topster: topsterType) => {
    setIsTopsterNameEdit(false);
    dispatch(
      asyncPatchTopsterFetch({ userId: "63a921dfa7cdfa7871cdb166", topster })
    );
  };
  return (
    <>
      {!isTopsterNameEdit && (
        <TopsterName>
          <TopsterNamePlace>{selectedTopster.name}</TopsterNamePlace>
          <TopsterNameEditButton onClick={() => setIsTopsterNameEdit(true)}>
            <MdEdit size={24}></MdEdit>
          </TopsterNameEditButton>
        </TopsterName>
      )}
      {isTopsterNameEdit && (
        <TopsterName>
          <TopsterNameEditPlace
            onChange={handleTopsterName}
            value={selectedTopster.name || ""}
          ></TopsterNameEditPlace>
          <TopsterNameEditButton
            onClick={() => saveEdittedTopsterName(selectedTopster)}
          >
            <AiFillSave size={24}></AiFillSave>
          </TopsterNameEditButton>
        </TopsterName>
      )}
    </>
  );
};

const TopsterName = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TopsterNamePlace = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: large;
  width: 20vw;
  font-weight: 800;
  margin-left: 30%;
`;

const TopsterNameEditPlace = styled.input`
  margin-left: 30%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  width: 20vw;
  border: none;
  outline: none;
  font-size: large;
  font-weight: 800;
`;

const TopsterNameEditButton = styled.div`
  position: absolute;
  border-radius: 50px;
  border: 4px solid black;
  top: 0%;
  left: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
`;

export default TopsterNameInfo;
