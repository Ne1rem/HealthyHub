import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './Auth/authSlices';
import { userReducer } from './User/userSlice';

const tokenPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'isLoggedIn'],
};

const userPersistorConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(tokenPersistConfig, authReducer),
    user: persistReducer(userPersistorConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
