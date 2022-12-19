import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAlbum, item } from '../apis/albumApi';

type getAlbumParamType = {
  query: string,
  type: string
};

export type albumType = {
  id: string,
  artistName: string,
  albumName: string,
  albumImg: string,
  isSelected: boolean,
  score: number,
  description: string
};

type selectedSetType = {
  id: string,
  isSelected: boolean,
};

type scoreSetType = {
  id: string,
  score: number,
};

const asyncGetAlbumFetch = createAsyncThunk(
  'counterSlice/asyncGetAlbumFetch',
  async (param: getAlbumParamType) => {
    let data: item[] = [];
    await getAlbum(param.query, param.type).then((res) => {
      data = res.data.albums.items
    });
    return data;
  }
);
const initialState  = {
  /*
    <사실상 앨범을 위한 배열이 총 3개인셈.>
      -유저가 가지고있는 고유의 album정보를 담을 배열 1개
      -검색해서 나온 앨범 결과를 보여줄 배열 1개
      -유저가 추가하고자 하는 앨범들을 보여줄 배열 1개
  */
  albums: [],
  searchAlbums: [] as albumType[],
  loading: false
}

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setIsSelected: (state, action: PayloadAction<selectedSetType>) => {
      state.searchAlbums.filter(album => album.id === action.payload.id)[0].isSelected = action.payload.isSelected;
    },
    setScore: (state, action: PayloadAction<scoreSetType>) => {
      state.searchAlbums.filter(album => album.id === action.payload.id)[0].score = action.payload.score;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetAlbumFetch.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(asyncGetAlbumFetch.fulfilled, (state, { payload })=>{
      state.searchAlbums.splice(0, state.searchAlbums.length);
      payload.forEach(element => {
        state.searchAlbums.push(
          {
            id: element.id,
            artistName: element.artists[0].name,
            albumName: element.name,
            albumImg: element.images[0].url,
            isSelected: false,
            score: 0,
            description: ''
          }
        )
      });
      state.loading = false;
    });
    builder.addCase(asyncGetAlbumFetch.rejected, (state, { payload })=>{
      state.loading = false;
    });
  }
})

export { asyncGetAlbumFetch }

export const { setIsSelected, setScore } = albumSlice.actions;

export default albumSlice.reducer;