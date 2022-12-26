import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './album';
import userReducer from './user';
import topsterReducer from './topster';

export const store = configureStore({
    reducer: {
      albumStore: albumReducer,
      userStore: userReducer,
      topsterStore: topsterReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;