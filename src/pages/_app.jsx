import '@/styles/globals.css';
import '@/styles/toastStyles.css';
import '@/styles/customVideo.css';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '@/redux/store';

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  });

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <ThemeProvider enableSystem attribute="class">
          {getLayout(<Component {...props} />)}
          <ToastContainer className="bottom-0" position="bottom-right" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
