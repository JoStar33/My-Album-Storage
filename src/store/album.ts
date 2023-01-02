import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getSpotifyAlbum,
  item,
  postAlbum,
  getAlbum,
  deleteAlbum,
  patchAlbum,
} from "../apis/albumApi";

type getSpotifyAlbumParamType = {
  query: string;
  type: string;
};

type postAlbumParamType = {
  userId: string;
  selectedAlbums: albumType[];
};

export type albumType = {
  key: string;
  artist: string;
  name: string;
  image: string;
  isSelected: boolean;
  score: number;
  description: string;
};

export type userAlbumType = {
  _id: string;
  artist: string;
  name: string;
  image: string;
  score: number;
  description: string;
  owner: string;
};

type selectedSetType = {
  key: string;
  isSelected: boolean;
};

const asyncGetSpotifyAlbumFetch = createAsyncThunk(
  "albumSlice/asyncGetSpotifyAlbumFetch",
  async (param: getSpotifyAlbumParamType) => {
    let data: item[] = [];
    await getSpotifyAlbum(param.query, param.type).then((res) => {
      data = res.data.albums.items;
    });
    return data;
  }
);

const asyncGetAlbumFetch = createAsyncThunk(
  "albumSlice/asyncGetAlbumFetch",
  async (param: string) => {
    let data: userAlbumType[] = [];
    await getAlbum(param).then((res) => {
      data = res.data;
    });
    return data;
  }
);

const asyncPostAlbumFetch = createAsyncThunk(
  "albumSlice/asyncPostAlbumFetch",
  async (param: postAlbumParamType) => {
    await postAlbum(param.userId, param.selectedAlbums);
  }
);

const asyncDeleteAlbumFetch = createAsyncThunk(
  "albumSlice/asyncDeleteAlbumFetch",
  async (param: string) => {
    await deleteAlbum(param);
  }
);

const asyncPatchAlbumFetch = createAsyncThunk(
  "albumSlice/asyncPatchAlbumFetch",
  async (param: userAlbumType) => {
    await patchAlbum(param);
  }
);

const initialState = {
  /*
    <사실상 앨범을 위한 배열이 총 3개인셈.>
      -유저가 가지고있는 고유의 album정보를 담을 배열 1개
      -검색해서 나온 앨범 결과를 보여줄 배열 1개
      -유저가 추가하고자 하는 앨범들을 보여줄 배열 1개
  */
  userAlbums: [] as userAlbumType[],
  searchAlbums: [] as albumType[],
  getSpotifyAlbumLoading: false,
  postAlbumLoading: false,
  getAlbumLoading: false,
};

const makeSearchAlbum = (payload: item[], searchAlbums: albumType[]) => {
  payload.forEach((element) => {
    searchAlbums.push({
      key: element.id,
      artist: element.artists[0].name,
      name: element.name,
      image: element.images[0].url,
      isSelected: false,
      score: 0,
      description: "",
    });
  });
};

const resetAlbum = (albums: albumType[]) => {
  albums.splice(0, albums.length);
};

const resetUserAlbum = (albums: userAlbumType[]) => {
  albums.splice(0, albums.length);
};

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setIsSelected: (state, action: PayloadAction<selectedSetType>) => {
      state.searchAlbums.filter(
        (album) => album.key === action.payload.key
      )[0].isSelected = action.payload.isSelected;
    },
    resetSearchAlbums: (state) => {
      resetAlbum(state.searchAlbums);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetSpotifyAlbumFetch.pending, (state, { payload }) => {
      state.getSpotifyAlbumLoading = true;
    });
    builder.addCase(
      asyncGetSpotifyAlbumFetch.fulfilled,
      (state, { payload }) => {
        resetAlbum(state.searchAlbums);
        makeSearchAlbum(payload, state.searchAlbums);
        state.getSpotifyAlbumLoading = false;
      }
    );
    builder.addCase(
      asyncGetSpotifyAlbumFetch.rejected,
      (state, { payload }) => {
        state.getSpotifyAlbumLoading = false;
      }
    );

    builder.addCase(asyncPostAlbumFetch.pending, (state, { payload }) => {
      state.postAlbumLoading = true;
    });
    builder.addCase(asyncPostAlbumFetch.fulfilled, (state, { payload }) => {
      state.postAlbumLoading = false;
      resetAlbum(state.searchAlbums);
    });
    builder.addCase(asyncPostAlbumFetch.rejected, (state, { payload }) => {
      state.postAlbumLoading = false;
    });

    builder.addCase(asyncGetAlbumFetch.pending, (state, { payload }) => {
      state.getAlbumLoading = true;
    });
    builder.addCase(asyncGetAlbumFetch.fulfilled, (state, { payload }) => {
      resetUserAlbum(state.userAlbums);
      payload.forEach((album) => {
        state.userAlbums.push(album);
      });
      state.getAlbumLoading = false;
    });
    builder.addCase(asyncGetAlbumFetch.rejected, (state, { payload }) => {
      state.getAlbumLoading = false;
    });

    builder.addCase(asyncDeleteAlbumFetch.pending, (state, { payload }) => {});
    builder.addCase(
      asyncDeleteAlbumFetch.fulfilled,
      (state, { payload }) => {}
    );
    builder.addCase(asyncDeleteAlbumFetch.rejected, (state, { payload }) => {});

    builder.addCase(asyncPatchAlbumFetch.pending, (state, { payload }) => {});
    builder.addCase(asyncPatchAlbumFetch.fulfilled, (state, { payload }) => {});
    builder.addCase(asyncPatchAlbumFetch.rejected, (state, { payload }) => {});
  },
});

export {
  asyncGetSpotifyAlbumFetch,
  asyncPostAlbumFetch,
  asyncPatchAlbumFetch,
  asyncGetAlbumFetch,
  asyncDeleteAlbumFetch,
};

export const { setIsSelected, resetSearchAlbums } = albumSlice.actions;

export default albumSlice.reducer;
