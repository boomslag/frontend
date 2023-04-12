import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers';

const makeStore = () => {
  const isClient = typeof window !== 'undefined';
  let store;

  if (isClient) {
    const storage = require('redux-persist/lib/storage').default;
    const { persistReducer, persistStore } = require('redux-persist');

    const persistConfig = {
      key: 'root',
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    store = configureStore({
      reducer: persistedReducer,
      middleware: [thunk],
      devTools: process.env.NODE_ENV !== 'production',
    });

    store.__persistor = persistStore(store);
  } else {
    store = configureStore({
      reducer: rootReducer,
      middleware: [thunk],
      devTools: process.env.NODE_ENV !== 'production',
    });
  }

  return store;
};

const wrapper = createWrapper(makeStore, { debug: false });

export { wrapper };
