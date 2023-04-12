import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { createWrapper } from 'next-redux-wrapper';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
  });

  let persistor = persistStore(store);
  store.__persistor = persistor;
  return store;
};

const wrapper = createWrapper(makeStore, { debug: false });

export { wrapper };
