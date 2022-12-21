import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSpotifyAlbum, item, postAlbum } from '../apis/albumApi';

type getSpotifyAlbumParamType = {
  query: string,
  type: string
};

type postAlbumParamType = {
  userId: number,
  selectedAlbums: albumType[]
}

export type albumType = {
  key: string,
  artist: string,
  name: string,
  image: string,
  isSelected: boolean,
  score: number,
  description: string
};

type selectedSetType = {
  key: string,
  isSelected: boolean,
};

const asyncGetSpotifyAlbumFetch = createAsyncThunk(
  'counterSlice/asyncGetSpotifyAlbumFetch',
  async (param: getSpotifyAlbumParamType) => {
    let data: item[] = [];
    await getSpotifyAlbum(param.query, param.type).then((res) => {
      data = res.data.albums.items
    });
    return data;
  }
);

const asyncPostAlbumFetch = createAsyncThunk(
  'counterSlice/asyncPostAlbumFetch',
  async (param: postAlbumParamType) => {
    await postAlbum(param.userId, param.selectedAlbums)
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
  getSpotifyAlbumLoading: false,
  postAlbumLoading: false,
}

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setIsSelected: (state, action: PayloadAction<selectedSetType>) => {
      state.searchAlbums.filter(album => album.key === action.payload.key)[0].isSelected = action.payload.isSelected;
    },
    resetSearchAlbums: (state) => {
      state.searchAlbums.splice(0, state.searchAlbums.length);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetSpotifyAlbumFetch.pending, (state, { payload }) => {
      state.getSpotifyAlbumLoading = true;
    });
    builder.addCase(asyncGetSpotifyAlbumFetch.fulfilled, (state, { payload })=>{
      state.searchAlbums.splice(0, state.searchAlbums.length);
      payload.forEach(element => {
        state.searchAlbums.push(
          {
            key: element.id,
            artist: element.artists[0].name,
            name: element.name,
            image: element.images[0].url,
            isSelected: false,
            score: 0,
            description: ''
          }
        )
      });
      state.getSpotifyAlbumLoading = false;
    });
    builder.addCase(asyncGetSpotifyAlbumFetch.rejected, (state, { payload })=>{
      state.getSpotifyAlbumLoading = false;
    });
    builder.addCase(asyncPostAlbumFetch.pending, (state, { payload }) => {
      state.postAlbumLoading = true;
    });
    builder.addCase(asyncPostAlbumFetch.fulfilled, (state, { payload })=>{
      state.searchAlbums.splice(0, state.searchAlbums.length);
      state.postAlbumLoading = false;
    });
    builder.addCase(asyncPostAlbumFetch.rejected, (state, { payload })=>{
      state.postAlbumLoading = false;
    });
  }
})

export { asyncGetSpotifyAlbumFetch, asyncPostAlbumFetch }

export const { setIsSelected, resetSearchAlbums } = albumSlice.actions;

export default albumSlice.reducer;