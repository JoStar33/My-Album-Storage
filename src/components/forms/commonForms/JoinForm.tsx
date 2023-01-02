import React, { useState } from "react";
import styled from "styled-components";
import { AppDispatch } from "../../../store/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { asyncJoinFetch } from "../../../store/user";
import {
  validateEmail,
  validatePassword,
  validateNick,
} from "../../../utils/validate";
import LoadingForm from "../loadingForm/LoadingForm";

type propsType = {
  dialogController: (dialogStatus: boolean) => void;
  setDialogText: React.Dispatch<React.SetStateAction<string>>;
  setDialogSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const JoinForm: React.FC<propsType> = ({
  dialogController,
  setDialogText,
  setDialogSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.userStore);
  const [account, setAccount] = useState({
    email: "",
    nick: "",
    password: "",
  });
  const join = async () => {
    if (!(account.email && account.password)) {
      setDialogText("이메일 비밀번호를 입력해주세요.");
      dialogController(true);
      return;
    }
    if (validateEmail(account.email)) {
      return;
    }
    if (validateNick(account.nick)) {
      return;
    }
    if (validatePassword(account.password)) {
      return;
    }
    await dispatch(
      asyncJoinFetch({
        id: NaN,
        email: account.email,
        nick: account.nick,
        password: account.password,
      })
    )
      .unwrap()
      .then(() => {
        setDialogText(`회원가입이 성공했습니다. 축하드려요!`);
        setDialogSuccess(true);
        dialogController(true);
      })
      .catch((err) => {
        if(err.message) {
          setDialogText("내부오류");
          dialogController(true);
          return;
        }
        setDialogText(err.message);
        dialogController(true);
      });
  };
  const backToLogin = () => {
    navigate("/");
  };
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      join(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  const onChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };
  loading ? <LoadingForm></LoadingForm> : <></>;
  return (
    <JoinFormContainer>
      <h2>회원가입</h2>
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
        <InputText>닉네임:</InputText>
        <Input
          name="nick"
          onKeyPress={handleOnKeyPress}
          onChange={onChangeAccount}
          type="text"
        />
      </InputContainer>
      <ValidateText>{validateNick(account.nick)}</ValidateText>
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
        <JoinBtn onClick={join}>
          <h1>회원가입</h1>
        </JoinBtn>
        <JoinBtn onClick={backToLogin}>
          <h1>돌아가기</h1>
        </JoinBtn>
      </ButtonContainer>
    </JoinFormContainer>
  );
};

export default JoinForm;

const ValidateText = styled.div`
  color: red;
  font-size: x-small;
`;

const JoinFormContainer = styled.div`
  width: 500px;
  height: 350px;
  border-radius: 25px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 200px;
  border: 2px solid black;
  border-radius: 10px;
`;

const InputText = styled.div`
  width: 100px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;

const ButtonContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const JoinBtn = styled.div`
  width: 130px;
  height: 80px;
  border-radius: 25px;
  background-color: skyblue;
  font-weight: 700;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
  user-select: none;
`;
