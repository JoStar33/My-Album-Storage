
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, join, logout } from "../apis/userApi";
import { userInfo } from "../types/user";

const asyncLoginFetch = createAsyncThunk(
  "counterSlice/asyncLoginFetch",
  async (userInfo: userInfo) => {
    await login(userInfo.email, userInfo.password).then((res) => {
      userInfo = res.data;
    });
    return userInfo;
  }
);

const asyncJoinFetch = createAsyncThunk(
  "counterSlice/asyncJoinFetch",
  async (userInfo: userInfo) => {
    await join(userInfo.email, userInfo.nick, userInfo.password).then((res) => {
      userInfo = res.data;
    });
    return userInfo;
  }
);

const asyncLogoutFetch = createAsyncThunk(
  "counterSlice/asyncLogoutFetch",
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
  },
});

export { asyncLoginFetch, asyncJoinFetch, asyncLogoutFetch };
export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
