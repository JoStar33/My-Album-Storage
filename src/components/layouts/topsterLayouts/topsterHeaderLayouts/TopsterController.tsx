import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setSelectedTopster, setSelectedTopsterType, topsterType } from '../../../../store/topster'

type layout = {
  name: string,
  value: string
}

type propsType = {
  setTopsterLayout: React.Dispatch<React.SetStateAction<string>>
}

const TopsterController: React.FC<propsType> = ({setTopsterLayout}) => {
  const { topsters, selectedTopster } = useSelector((state: RootState) => state.topsterStore);
  const dispatch = useDispatch<AppDispatch>();
  const layoutType: layout[] = [
    {
      name: "3x3",
      value: "3x3"
    }, {
      name: "5x5",
      value: "5x5"
    }, {
      name: "6x6",
      value: "6x6"
    }, {
      name: "10x10",
      value: "10x10"
    }, {
      name: "10 & 12 & 20 구도",
      value: "10_12_20"
    },
  ];
  const handleSelectTopster = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //불변성 문제로인해 이렇게 작성
    const findTopster = topsters.find((item) => item._id === e.target.value)
    const pickTopster = {
      _id: findTopster?._id,
      name: findTopster?.name,
      type: findTopster?.type,
      albums: findTopster?.albums,
      owner: findTopster?.owner
    } as topsterType;
    dispatch(setSelectedTopster(pickTopster));
    setTopsterLayout(pickTopster.type);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopsterLayout(e.target.value);
    dispatch(setSelectedTopsterType(e.target.value));
  };
  return (
    <TopsterControllerContainer>
      <TopsterChooseSetting onChange={handleSelectTopster}>
        {
          topsters.map(topster => {
            return <TopsterOption value={topster._id}>{topster.name}</TopsterOption>
          })
        }
      </TopsterChooseSetting>
      <TopsterLayoutSetting value={selectedTopster.type} onChange={handleSelect} name="layout">
        {
          layoutType.map(item => {
            return <TopsterOption value={item.value} >{item.name}</TopsterOption>
          })
        }
      </TopsterLayoutSetting>
    </TopsterControllerContainer>
  );
};

const TopsterControllerContainer = styled.div`
width: 90vw;
height: 35px;
border-radius: 4px;
display: flex;
flex-direction: row-reverse;
`;

const SelectDefault = styled.select`
width: 200px;
height: inherit;
background: transparent;
border: 2px solid lightcoral;
border-radius: 4px;
outline: 0 none;
padding: 0 5px;
z-index: 3;
margin-right: 20px;
`;

const TopsterLayoutSetting = styled(SelectDefault)`
`;

const TopsterChooseSetting = styled(SelectDefault)`
`;

const TopsterOption = styled.option`
background: lightcoral;
color: #fff;
padding: 3px 0;
font-size: 16px;
`;


export default TopsterController;