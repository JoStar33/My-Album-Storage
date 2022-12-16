import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAlbum } from '../apis/albumApi';

type getAlbumParamType = {
  query: string,
  type: string
}

type artist = {
  external_urls : Object,
  href : string,
  id : string,
  name : string,
  type : string,
  uri : string
}

type image = {
  height : number,
  url : string,
  width : number
}

type item = {
  album_type : string,
  artists : artist[],
  available_markets : string[],
  external_urls: Object,
  href : string,
  id : string,
  images : image[],
  name : string,
  release_date : string,
  release_date_precision : string,
  total_tracks : number,
  type: string,
  uri: string
}

const asyncGetAlbumFetch = createAsyncThunk(
  'counterSlice/asyncGetAlbumFetch',
  async (param: getAlbumParamType) => {
    let data: item[] = [];
    await getAlbum(param.query, param.type).then((res) => {
      data = res.data.albums.items
    });
    return data;
  }
)
type searchAlbumType = {
  id: string,
  artistName: string,
  albumname: string,
  albumImg: string,
}

export const albumSlice = createSlice({
  name: 'album',
  initialState: {
    album: [],
    searchAlbum: [] as searchAlbumType[],
    loading: false
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetAlbumFetch.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(asyncGetAlbumFetch.fulfilled, (state, { payload })=>{
      payload.forEach(element => {
        state.searchAlbum.push(
          {
            id: element.id,
            artistName: element.artists[0].name,
            albumname: element.name,
            albumImg: element.images[0].url
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

export default albumSlice.reducer;