import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { wrapper } from '@/redux/store';

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem attribute="class">
        {getLayout(<Component {...props} />)}
        <ToastContainer className="bottom-0" position="bottom-right" />
      </ThemeProvider>
    </Provider>
  );
}
