import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';
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
import messagesReducer from './messagesSlice';
import usersReducer from './usersSlice';
import authSlice from './authSlice';
import storage from 'redux-persist/es/storage';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['messages', 'users'],
};

const messagesPersistConfig = {
  key: 'messages',
  storage: storage,
};

const usersPersistConfig = {
  key: 'users',
  storage: storage,
};

const rootReducer = combineReducers({
  messages: persistReducer(messagesPersistConfig, messagesReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
  auth: authSlice,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(createStateSyncMiddleware({ blacklist: [PERSIST, REHYDRATE, 'auth/setLoggedIn', 'messages/selectMessage'] })),
});

initMessageListener(store);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
