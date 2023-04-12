import '@/styles/globals.css';
import '@/styles/toastStyles.css';
import '@/styles/customVideo.css';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ThemeProvider enableSystem attribute="class"> */}
        {getLayout(<Component {...pageProps} />)}
        {/* <ToastContainer className="bottom-0" position="bottom-right" /> */}
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  );
}
