import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { asyncLogoutFetch } from "../../../store/user";
import { RootState } from "../../../store";
import { asyncLoginFetch } from "../../../store/user";
import { validateEmail, validatePassword } from "../../../utils/validate";
import { getCookie } from "../../../apis/cookies/cookie";
import LoadingForm from "../loadingForm/LoadingForm";

type propsType = {
  dialogController: (dialogStatus: boolean) => void;
  setDialogText: React.Dispatch<React.SetStateAction<string>>;
};

const LoginForm: React.FC<propsType> = ({
  dialogController,
  setDialogText,
}) => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state: RootState) => state.userStore);
  //토큰삭제이후 로그인 페이지로 왔을 경우
  useEffect(() => {
    //비동기로직 실행을 위한 선언.
    async function logoutCheck() {
      if (user.id && !getCookie()) {
        await dispatch(asyncLogoutFetch());
      }
    }
    logoutCheck();
  });
  const login = async () => {
    if (!(account.email && account.password)) {
      setDialogText("이메일 비밀번호를 입력해주세요.");
      dialogController(true);
      return;
    }
    if (validateEmail(account.email)) {
      return;
    }
    if (validatePassword(account.password)) {
      return;
    }
    await dispatch(
      asyncLoginFetch({
        email: account.email,
        nick: "",
        password: account.password,
        id: NaN,
      })
    )
      .unwrap() //unwrap을 통해 thunk의 비동기 액션결과를 다룰 수 있도록 한다.
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setDialogText(err.message);
        dialogController(true);
      });
  };
  const makeAccount = () => {
    navigate("/join");
  };
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  const onChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };
  if (loading) return <LoadingForm></LoadingForm>;
  return (
    <LoginFormContainer>
      <h2>로그인 화면</h2>
      <InputContainer>
        <InputText>이메일:</InputText>
        <Input
          name="email"
          onKeyPress={handleOnKeyPress}
          onChange={onChangeAccount}
          type="text"
        />
      </InputContainer>
      <ValidateText>{validateEmail(account.email)}</ValidateText>
      <InputContainer>
        <InputText>패스워드:</InputText>
        <Input
          name="password"
          onKeyPress={handleOnKeyPress}
          onChange={onChangeAccount}
          type="password"
        />
      </InputContainer>
      <ValidateText>{validatePassword(account.password)}</ValidateText>
      <ButtonContainer>
        <LoginBtn onClick={makeAccount}>
          <h1>회원가입</h1>
        </LoginBtn>
        <LoginBtn onClick={login}>
          <h1>로그인</h1>
        </LoginBtn>
      </ButtonContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;

const ValidateText = styled.div`
  color: red;
  font-size: x-small;
`;

const LoginFormContainer = styled.div`
  width: 500px;
  height: 350px;
  border-radius: 25px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;

const Input = styled.input`
  border: 2px solid black;
  border-radius: 10px;
`;

const InputText = styled.div`
  width: 100px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const LoginBtn = styled.div`
  width: 130px;
  height: 80px;
  border-radius: 25px;
  background-color: skyblue;
  font-weight: 700;
  margin-left: 20px;
  margin-right: 20px;
  user-select: none;
  cursor: pointer;
`;
