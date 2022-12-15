import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './album';

export const store = configureStore({
    reducer: {
      albumStore: albumReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;