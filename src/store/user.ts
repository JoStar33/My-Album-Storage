
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, join, logout, checkDuplicatedEmail, checkDuplicatedNick } from "../apis/userApi";
import { userInfo } from "../types/user";

const asyncLoginFetch = createAsyncThunk(
  "userSlice/asyncLoginFetch",
  async (userInfo: userInfo) => {
    await login(userInfo.email, userInfo.password).then((res) => {
      userInfo = res.data;
    });
    return userInfo;
  }
);

const asyncCheckDuplicatedEmail = createAsyncThunk(
  "userSlice/asyncCheckDuplicatedEmail",
  async (email: string) => {
    const response = await checkDuplicatedEmail(email)
    return response.data;
  }
);

const asyncCheckDuplicatedNick = createAsyncThunk(
  "userSlice/asyncCheckDuplicatedNick",
  async (nick: string) => {
    const response = await checkDuplicatedNick(nick)
    return response.data;
  }
);

const asyncJoinFetch = createAsyncThunk(
  "userSlice/asyncJoinFetch",
  async (userInfo: userInfo) => {
    await join(userInfo.email, userInfo.nick, userInfo.password).then((res) => {
      userInfo = res.data;
    });
    return userInfo;
  }
);

const asyncLogoutFetch = createAsyncThunk(
  "userSlice/asyncLogoutFetch",
  async () => {
    await logout();
  }
);

const initialState = {
  user: {
    id: '',
    email: ``,
    nick: ``,
    password: ``,
  } as userInfo,
  loading: false,
  duplicateEmailLoading: false,
  duplicateNickLoading: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLoginFetch.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(asyncLoginFetch.fulfilled, (state, { payload }) => {
      state.loading = false;
      Object.assign(state.user, payload);
    });
    builder.addCase(asyncLoginFetch.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(asyncJoinFetch.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(asyncJoinFetch.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(asyncJoinFetch.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(asyncLogoutFetch.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(asyncLogoutFetch.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user.email = "";
      state.user.id = '';
      state.user.nick = "";
      state.user.password = "";
    });
    builder.addCase(asyncLogoutFetch.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(asyncCheckDuplicatedEmail.pending, (state, { payload }) => {
      state.duplicateEmailLoading = true;
    });
    builder.addCase(asyncCheckDuplicatedEmail.fulfilled, (state, { payload }) => {
      console.log("run-fulfilled");
      state.duplicateEmailLoading = false;
    });
    builder.addCase(asyncCheckDuplicatedEmail.rejected, (state, { payload }) => {
      console.log("run-rejected");
      state.duplicateEmailLoading = false;
    });
    builder.addCase(asyncCheckDuplicatedNick.pending, (state, { payload }) => {
      state.duplicateNickLoading = true;
    });
    builder.addCase(asyncCheckDuplicatedNick.fulfilled, (state, { payload }) => {
      state.duplicateNickLoading = false;
    });
    builder.addCase(asyncCheckDuplicatedNick.rejected, (state, { payload }) => {
      state.duplicateNickLoading = false;
    });
  },
});

export { asyncLoginFetch, asyncJoinFetch, asyncLogoutFetch, asyncCheckDuplicatedEmail, asyncCheckDuplicatedNick };
export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
