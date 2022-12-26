import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patchTopster, getTopster } from '../apis/topsterApi';
import { userAlbumType } from './album';

export type topsterType = {
  _id: string,
  name: string,
  type: string,
  albums: userAlbumType[],
  owner: string
}

const asyncGetTopsterFetch = createAsyncThunk(
  'topsterSlice/asyncGetTopsterFetch', 
  async (param: string) => {
    let data: topsterType[] = [];
    await getTopster(param).then((res) => {
      data = res.data;
    });
    return data;
  }
);

const asyncPatchTopsterFetch = createAsyncThunk(
  'topsterSlice/asyncGetTopsterFetch', 
  async (param: topsterType) => {
    await patchTopster(param);
  }
);

const resetStoreTopster = (topsters: topsterType[]) => {
  topsters.splice(0, topsters.length);
};

const makeTopster = (payload: topsterType[], topsters: topsterType[]) => {
  payload.forEach(element => {
    topsters.push(
      {
        _id: element._id,
        name: element.name,
        type: element.type,
        albums: element.albums,
        owner: element.owner
      }
    );
  });
};

const initialState  = {
  topsters: [] as topsterType[],
  selectedTopster: {} as topsterType,
  topsterLoading: false,
};

export const topsterSlice = createSlice({
  name: 'topster',
  initialState,
  reducers: {
    setSelectedTopster: (state, action: PayloadAction<topsterType>) => {
      Object.assign(state.selectedTopster, action.payload);
      state.topsters = state.topsters.map(topster => 
        topster._id === state.selectedTopster._id ? state.selectedTopster : topster
      );
    },
    setSelectedTopsterType: (state, action: PayloadAction<string>) => {
      Object.assign(state.selectedTopster, {...state.selectedTopster, type: action.payload });
      state.topsters.filter(topster => topster._id === state.selectedTopster._id)[0].type = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetTopsterFetch.pending, (state, { payload }) => {
      state.topsterLoading = true;});
    builder.addCase(asyncGetTopsterFetch.fulfilled, (state, { payload })=>{
      resetStoreTopster(state.topsters);
      state.topsterLoading = false;
      makeTopster(payload, state.topsters);
      Object.assign(state.selectedTopster, state.topsters[0]);
    });
    builder.addCase(asyncGetTopsterFetch.rejected, (state, { payload })=>{
      state.topsterLoading = false;});
  }
});

export { asyncGetTopsterFetch, asyncPatchTopsterFetch };

export const { setSelectedTopster, setSelectedTopsterType } = topsterSlice.actions;

export default topsterSlice.reducer;