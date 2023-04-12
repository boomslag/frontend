import '@/styles/globals.css';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ThemeProvider enableSystem attribute="class"> */}
        <Component {...pageProps} />
        {/* <ToastContainer className="bottom-0" position="bottom-right" /> */}
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  );
}
