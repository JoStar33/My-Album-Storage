import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAlbum } from '../apis/albumApi';

type getAlbumParamType = {
  query: string,
  type: string
}

const asyncGetAlbumFetch = createAsyncThunk(
  'counterSlice/asyncLoginFetch',
  async (param: getAlbumParamType) => {
    await getAlbum(param.query, param.type).then((res) => {
      return res.data;
    })
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    album: {
    },
    loading: false
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetAlbumFetch.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(asyncGetAlbumFetch.fulfilled, (state, { payload })=>{
      state.loading = false;
    });
    builder.addCase(asyncGetAlbumFetch.rejected, (state, { payload })=>{
      state.loading = false;
    });
  }
})

export { asyncGetAlbumFetch }

export default userSlice.reducer;