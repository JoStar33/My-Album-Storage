import React, { useState } from "react";
import styled from "styled-components";
import { AppDispatch } from "../../../store/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { LoadingBar } from "../../forms/loadingForm/ButtonLoadingForm";
import { AiOutlineCheck } from "react-icons/ai";
import { asyncJoinFetch, asyncCheckDuplicatedEmail, asyncCheckDuplicatedNick, resetDuplicateEmailLoading } from "../../../store/user";
import {
  validateEmail,
  validateNick,
  validatePassword,
  validatePasswordCheck,
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
  const [duplicateState, setDuplicateState] = useState({
    email: false,
    nick: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, duplicateEmailLoading, duplicateNickLoading } = useSelector((state: RootState) => state.userStore);
  const [account, setAccount] = useState({
    email: "",
    nick: "",
    password: "",
    passwordCheck: "",
  });
  const join = async () => {
    if (!(account.email && account.password)) {
      setDialogText("이메일 비밀번호를 입력해주세요.");
      dialogController(true);
      return;
    }
    if(duplicateState.email && duplicateState.nick) {
      setDialogText("이메일과 닉네임 중복확인을 해주셔야해요.");
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
    if (validatePasswordCheck(account.password, account.passwordCheck)) {
      return;
    }
    await dispatch(
      asyncJoinFetch({
        id: '',
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
        if(!err.message) {
          setDialogText("내부오류");
          dialogController(true);
          return;
        }
        console.log(err);
        setDialogText(err.message);
        dialogController(true);
      });
  };
  const backToLogin = () => {
    navigate("/");
  };
  const handleDuplicateEmail = () => {
    if (!account.email) {
      setDialogText("이메일을 입력해주세요.");
      dialogController(true);
      return;
    }
    dispatch(asyncCheckDuplicatedEmail(account.email))
    .unwrap()
    .then(() => {
      console.log(duplicateEmailLoading);
      if(!duplicateEmailLoading) {
        setDialogText(`이메일이 이미 존재합니다. 다시 확인바랍니다.`);
        dialogController(true);
        dispatch(resetDuplicateEmailLoading());
        return;
      }
      setDuplicateState({...duplicateState, email: true});
    }).
    catch(() => {
      setDialogText(`이메일이 이미 존재합니다. 다시 확인바랍니다.`);
      dialogController(true);
    })
  }
  const handleDuplicateNick = () => {
    if (!account.email) {
      setDialogText("닉네임을 입력해주세요.");
      dialogController(true);
      return;
    }
    dispatch(asyncCheckDuplicatedNick(account.nick))
    .then(() => {
      console.log(duplicateNickLoading);
      if(!duplicateNickLoading) {
        setDialogText(`닉네임이 이미 존재합니다. 다시 확인바랍니다.`);
        dialogController(true);
        return;
      }
      setDuplicateState({...duplicateState, nick: true});
    })
  }
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
        <DuplicatedCheckButton onClick={handleDuplicateEmail}>
          {
            !duplicateEmailLoading && <>중복확인</>
          }
          {
            (duplicateEmailLoading && !duplicateState.email) && <LoadingBar></LoadingBar>
          }
          {
            (duplicateEmailLoading && duplicateState.email) && <AiOutlineCheck size={20}></AiOutlineCheck>
          }
        </DuplicatedCheckButton>
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
        <DuplicatedCheckButton onClick={handleDuplicateNick}>
          {
            (!duplicateNickLoading) && <>중복확인</>
          }
          {
            (duplicateNickLoading && !duplicateState.nick) && <LoadingBar></LoadingBar>
          }
          {
            (duplicateNickLoading && duplicateState.nick) && <AiOutlineCheck size={20}></AiOutlineCheck>
          }
        </DuplicatedCheckButton>
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
        <NullBox></NullBox>
      </InputContainer>
      <ValidateText>{validatePassword(account.password)}</ValidateText>
      <InputContainer>
        <InputCheckText>패스워드 확인:</InputCheckText>
        <Input
          name="passwordCheck"
          onKeyPress={handleOnKeyPress}
          onChange={onChangeAccount}
          type="password"
        />
        <NullBox></NullBox>
      </InputContainer>
      <ValidateText>{validatePasswordCheck(account.password, account.passwordCheck)}</ValidateText>
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
  border-radius: 6px;
`;

const InputText = styled.div`
  display: flex;
  text-align: left;
  width: 100px;
`;

const InputCheckText = styled.div`
  display: flex;
  text-align: left;
  width: 100px;
  font-size: 12px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;

const NullBox = styled.div`
  width: 83px;
`;

const ButtonContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const DuplicatedCheckButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  border-radius: 20px;
  margin-left: 3px;
  background-color: #baecc8;
  user-select: none;
  cursor: pointer;
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
