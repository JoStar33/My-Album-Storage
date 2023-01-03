import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  patchTopster,
  getTopster,
  putTopster,
  patchTopsterAlbum,
  deleteTopsterAlbum,
} from "../apis/topsterApi";
import { patchTopsterType, putTopsterType, deleteTopsterAlbumType, patchTopsterAlbumType, topsterType } from "../types/topster";

const asyncGetTopsterFetch = createAsyncThunk(
  "topsterSlice/asyncGetTopsterFetch",
  async (param: string) => {
    let data: topsterType[] = [];
    await getTopster(param).then((res) => {
      data = res.data;
    });
    return data;
  }
);

const asyncPatchTopsterFetch = createAsyncThunk(
  "topsterSlice/asyncPatchTopsterFetch",
  async (param: patchTopsterType) => {
    let data: topsterType[] = [];
    await patchTopster(param.topster)
      .then(() => getTopster(param.userId))
      .then((res) => {
        data = res.data;
      });
    return data;
  }
);

const asyncPatchTopsterAlbumFetch = createAsyncThunk(
  "topsterSlice/asyncPatchTopsterAlbumFetch",
  async (param: patchTopsterAlbumType) => {
    let data: topsterType[] = [];
    await patchTopsterAlbum(param.topster._id, param.topsterAlbum)
      .then(() => getTopster(param.topster.owner))
      .then((res) => {
        data = res.data;
      });
    return data;
  }
);

const asyncPutTopsterFetch = createAsyncThunk(
  "topsterSlice/asyncPutTopsterFetch",
  async (param: putTopsterType) => {
    await putTopster(param.userId, param.topsters);
  }
);

const asyncDeleteTopsterFetch = createAsyncThunk(
  "topsterSlice/asyncDeleteTopsterFetch",
  async (param: deleteTopsterAlbumType) => {
    let data: topsterType[] = [];
    await deleteTopsterAlbum(param.topster._id, param.topsterPosition)
      .then(() => getTopster(param.topster.owner))
      .then((res) => {
        data = res.data;
      });
    return data;
  }
);

const resetStoreTopster = (topsters: topsterType[]) => {
  topsters.splice(0, topsters.length);
};

const makeTopster = (payload: topsterType[], topsters: topsterType[]) => {
  payload.forEach((element) => {
    topsters.push(element);
  });
};

const updateTopster = (topsters: topsterType[], selectedTopster: topsterType) =>
  topsters.map((topster) =>
    topster._id === selectedTopster._id ? selectedTopster : topster
  );

const initialState = {
  topsters: [] as topsterType[],
  selectedTopster: {
    albums: [],
  } as unknown as topsterType,
  topsterLoading: false,
  saveTopsterLoading: false,
  getTopsterLoading: false,
};

export const topsterSlice = createSlice({
  name: "topster",
  initialState,
  reducers: {
    setSelectedTopster: (state, action: PayloadAction<topsterType>) => {
      Object.assign(state.selectedTopster, action.payload);
      state.topsters = updateTopster(state.topsters, state.selectedTopster);
    },
    setSelectedTopsterType: (state, action: PayloadAction<string>) => {
      Object.assign(state.selectedTopster, {
        ...state.selectedTopster,
        type: action.payload,
      });
    },
    setSelectedTopsterName: (state, action: PayloadAction<string>) => {
      Object.assign(state.selectedTopster, {
        ...state.selectedTopster,
        name: action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetTopsterFetch.pending, (state, { payload }) => {
      state.getTopsterLoading = true;
    });
    builder.addCase(asyncGetTopsterFetch.fulfilled, (state, { payload }) => {
      resetStoreTopster(state.topsters);
      makeTopster(payload, state.topsters);
      Object.assign(state.selectedTopster, state.topsters[0]);
      state.getTopsterLoading = false;
    });
    builder.addCase(asyncGetTopsterFetch.rejected, (state, { payload }) => {
      state.getTopsterLoading = false;
    });

    builder.addCase(asyncPutTopsterFetch.pending, (state, { payload }) => {
      state.saveTopsterLoading = true;
    });
    builder.addCase(asyncPutTopsterFetch.fulfilled, (state, { payload }) => {
      state.saveTopsterLoading = false;
    });
    builder.addCase(asyncPutTopsterFetch.rejected, (state, { payload }) => {
      state.saveTopsterLoading = false;
    });

    builder.addCase(asyncDeleteTopsterFetch.pending, (state, { payload }) => {
      state.getTopsterLoading = true;
    });
    builder.addCase(asyncDeleteTopsterFetch.fulfilled, (state, { payload }) => {
      resetStoreTopster(state.topsters);
      makeTopster(payload, state.topsters);
      state.selectedTopster = state.topsters.filter(
        (topster) => topster._id === state.selectedTopster._id
      )[0];
      state.getTopsterLoading = false;
    });
    builder.addCase(asyncDeleteTopsterFetch.rejected, (state, { payload }) => {
      state.getTopsterLoading = false;
    });

    builder.addCase(asyncPatchTopsterFetch.pending, (state, { payload }) => {
      state.getTopsterLoading = true;
    });
    builder.addCase(asyncPatchTopsterFetch.fulfilled, (state, { payload }) => {
      resetStoreTopster(state.topsters);
      makeTopster(payload, state.topsters);
      state.selectedTopster = state.topsters.filter(
        (topster) => topster._id === state.selectedTopster._id
      )[0];
      state.getTopsterLoading = false;
    });
    builder.addCase(asyncPatchTopsterFetch.rejected, (state, { payload }) => {
      state.getTopsterLoading = false;
    });

    builder.addCase(
      asyncPatchTopsterAlbumFetch.pending,
      (state, { payload }) => {
        state.getTopsterLoading = true;
      }
    );
    builder.addCase(
      asyncPatchTopsterAlbumFetch.fulfilled,
      (state, { payload }) => {
        resetStoreTopster(state.topsters);
        makeTopster(payload, state.topsters);
        state.selectedTopster = state.topsters.filter(
          (topster) => topster._id === state.selectedTopster._id
        )[0];
        state.getTopsterLoading = false;
      }
    );
    builder.addCase(
      asyncPatchTopsterAlbumFetch.rejected,
      (state, { payload }) => {
        state.getTopsterLoading = false;
      }
    );
  },
});

export {
  asyncGetTopsterFetch,
  asyncPatchTopsterFetch,
  asyncPutTopsterFetch,
  asyncPatchTopsterAlbumFetch,
  asyncDeleteTopsterFetch,
};

export const {
  setSelectedTopster,
  setSelectedTopsterType,
  setSelectedTopsterName,
} = topsterSlice.actions;

export default topsterSlice.reducer;
