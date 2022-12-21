import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './album';
import userReducer from './user';

export const store = configureStore({
    reducer: {
      albumStore: albumReducer,
      userStore: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;