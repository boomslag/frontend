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

  // Return both the store and persistor
  return { store, persistor };
};

const wrapper = createWrapper(
  () => makeStore().store, // Update this line to use the store from the returned object
  { debug: false },
);

// Export store and persistor individually
export const { store, persistor } = makeStore();

export { wrapper };
