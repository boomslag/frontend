import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from '../components/ScrollToTop';

import {
  checkAuthenticated,
  loadEthereumBalance,
  loadGalrBalance,
  loadMaticPolygonBalance,
  loadPraediumBalance,
  loadUser,
  loadUserProfile,
  loadUserWallet,
  loadWalletAndBalances,
  refresh,
} from '@/redux/actions/auth/auth';
import { useEffect } from 'react';
import { getCartTotal, getItems } from '@/redux/actions/cart/cart';
import DesktopNavbar from './components/Navbar';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const cookies = useSelector((state) => state.cookies.cookies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const wallet = useSelector((state) => state.auth.wallet);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(refresh());
      dispatch(checkAuthenticated());
      dispatch(loadUser());
      dispatch(loadUserProfile());
      dispatch(loadUserWallet()).then(() => {
        dispatch(loadEthereumBalance(wallet && wallet.address));
        dispatch(loadPraediumBalance(wallet && wallet.polygon_address));
        dispatch(loadGalrBalance(wallet && wallet.polygon_address));
        dispatch(loadMaticPolygonBalance(wallet && wallet.polygon_address));
      });
      dispatch(getItems());
    }
    // eslint-disable-next-line
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(getCartTotal(cartItems));
  }, [dispatch, cartItems]);
  return (
    <>
      <ScrollToTop />
      <DesktopNavbar />
      {children}
    </>
  );
}
