import React from "react";
import styled from "styled-components";
import { removeToken } from "../../../apis/tokens/token";
import { AppDispatch } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutFetch, resetUserState } from "../../../store/user";
import { resetTopsterState } from "../../../store/topster";
import { resetAlbumState } from "../../../store/album";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";

const NavBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userStore);
  const logout = async () => {
    await dispatch(asyncLogoutFetch())
      .unwrap()
      .then(() => {
        removeToken();
        navigate("/login");
        dispatch(resetUserState());
        dispatch(resetTopsterState());
        dispatch(resetAlbumState());
        console.log(user);
      })
      .catch((err) => console.log(err));
  };
  return (
    <NavBarContainer>
      <NavBarMenuHandler></NavBarMenuHandler>
      <NavBarTitleContainer>ALBUM</NavBarTitleContainer>
      <NavBarUserInfo>
        <div>welcome {user.nick}</div>
        <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
      </NavBarUserInfo>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const NavBarTitleContainer = styled.div`
  font-weight: 800;
  font-size: larger;
  width: 80vw;
`;

const NavBarMenuHandler = styled.div`
  width: 5vw;
`;

const NavBarUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-weight: 800;
  width: 15vw;
`;

const LogoutBtn = styled.div`
  cursor: pointer;
  user-select: none;
  background-color: white;
  font-weight: 800;
  border-radius: 20px;
  width: 50%;
`;
