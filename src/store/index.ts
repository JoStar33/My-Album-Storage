import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; 
import albumReducer from './album';
import userReducer from './user';
import topsterReducer from './topster';

const reducers = combineReducers({
  albumStore: albumReducer,
  userStore: userReducer,
  topsterStore: topsterReducer
});

const persistConfig: any = {
  key: "root",
  storage: storageSession, // 사용할 스토리지를 정의해요.
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;