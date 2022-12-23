import React from 'react';
import styled from 'styled-components';

type layout = {
  name: string,
  value: string
}

type propsType = {
  setTopsterLayout: React.Dispatch<React.SetStateAction<string>>
}

const TopsterLayoutController: React.FC<propsType> = ({setTopsterLayout}) => {
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
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopsterLayout(e.target.value);
  };
  return (
    <TopsterLayoutControllerContainer>
      <TopsterLayoutSetting onChange={handleSelect} name="layout">
        {
          layoutType.map(item => {
            return <TopsterOption value={item.value} >{item.name}</TopsterOption>
          })
        }
      </TopsterLayoutSetting>
    </TopsterLayoutControllerContainer>
  );
};

const TopsterLayoutControllerContainer = styled.div`
position: relative;
width: 200px;
height: 35px;
border-radius: 4px;
border: 2px solid lightcoral;
`;

const TopsterLayoutSetting = styled.select`
width: inherit;
height: inherit;
background: transparent;
border: 0 none;
outline: 0 none;
padding: 0 5px;
position: relative;
z-index: 3;
`;

const TopsterOption = styled.option`
background: lightcoral;
color: #fff;
padding: 3px 0;
font-size: 16px;
`;


export default TopsterLayoutController;