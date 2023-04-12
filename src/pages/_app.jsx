import '@/styles/globals.css';
import { wrapper } from '@/redux/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}
