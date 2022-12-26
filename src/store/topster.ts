import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { patchTopster, getTopster, putTopster } from '../apis/topsterApi';
import { userAlbumType } from './album';

export type topsterType = {
  _id: string,
  name: string,
  type: string,
  albums: userAlbumType[],
  owner: string
}

type putTopsterType = {
  userId: string
  topsters: topsterType[]
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

const asyncPutTopsterFetch = createAsyncThunk(
  'topsterSlice/asyncPutTopsterFetch', 
  async (param: putTopsterType) => {
    await putTopster(param.userId, param.topsters);
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
  saveTopsterLoading: false
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
    },
    setSelectedTopsterName: (state, action: PayloadAction<string>) => {
      Object.assign(state.selectedTopster, {...state.selectedTopster, name: action.payload });
      state.topsters.filter(topster => topster._id === state.selectedTopster._id)[0].name = action.payload;
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


    builder.addCase(asyncPutTopsterFetch.pending, (state, { payload }) => {
      state.saveTopsterLoading = true;});
    builder.addCase(asyncPutTopsterFetch.fulfilled, (state, { payload })=>{
      state.saveTopsterLoading = false;});
    builder.addCase(asyncPutTopsterFetch.rejected, (state, { payload })=>{
      state.saveTopsterLoading = false;});
  }
});

export { asyncGetTopsterFetch, asyncPatchTopsterFetch, asyncPutTopsterFetch };

export const { setSelectedTopster, setSelectedTopsterType, setSelectedTopsterName } = topsterSlice.actions;

export default topsterSlice.reducer;