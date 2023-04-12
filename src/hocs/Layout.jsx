import { useDispatch, useSelector } from 'react-redux';
import { acceptCookies, rejectCookies } from '../redux/actions/cookies/cookies';
import ScrollToTop from './components/ScrollToTop';
import Link from 'next/link';
import Footer from '@/features/footer';
import Navbar from '@/features/navbar';
import {
  checkAuthenticated,
  getUserDelivery,
  loadEthereumBalance,
  loadGalrBalance,
  loadMaticPolygonBalance,
  loadPraediumBalance,
  loadUser,
  loadUserProfile,
  loadUserWallet,
  refresh,
} from '@/redux/actions/auth/auth';
import { useEffect } from 'react';
import { getCartTotal, getItems } from '@/redux/actions/cart/cart';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const cookies = useSelector((state) => state.cookies.cookies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const wallet = useSelector((state) => state.auth.wallet);

  useEffect(() => {
    if (isAuthenticated) {
      // dispatch(refresh());
      // dispatch(checkAuthenticated());
      dispatch(loadUser());
      // dispatch(loadUserProfile());
      // dispatch(loadUserWallet()).then(() => {
      //   dispatch(loadEthereumBalance(wallet && wallet.address));
      //   dispatch(loadPraediumBalance(wallet && wallet.polygon_address));
      //   dispatch(loadGalrBalance(wallet && wallet.polygon_address));
      //   dispatch(loadMaticPolygonBalance(wallet && wallet.polygon_address));
      // });
      // dispatch(getItems());
    }
    // eslint-disable-next-line
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(getCartTotal(cartItems));
  }, [dispatch, cartItems]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {children}
      {cookies === null && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
          <div className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-white dark:bg-dark-second p-6 shadow-lg dark:ring-gray-900/10">
            <p className="text-sm leading-6 text-gray-900 dark:text-dark-txt">
              This website uses cookies to supplement a balanced diet and provide a much deserved
              reward to the senses after consuming bland but nutritious meals. Accepting our cookies
              is optional but recommended, as they are delicious. See our{' '}
              <Link href="/terms" className="font-semibold text-iris-600 dark:text-dark-primary">
                cookie policy
              </Link>
              .
            </p>
            <div className="mt-4 flex items-center gap-x-5">
              <button
                type="button"
                onClick={() => {
                  dispatch(acceptCookies());
                }}
                className="rounded-md bg-dark-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 dark:hover:bg-dark-third focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                I love cookies
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch(rejectCookies());
                }}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-dark-txt"
              >
                I&apos;m on a diet
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
