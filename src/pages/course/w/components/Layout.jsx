import ScrollToTop from '@/hocs/components/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';

import {
  checkAuthenticated,
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
    if (isAuthenticated) {
      dispatch(getCartTotal(cartItems));
    }
  }, [dispatch, cartItems]);

  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
