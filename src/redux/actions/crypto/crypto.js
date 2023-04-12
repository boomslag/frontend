import axios from 'axios';
import { ToastSuccess } from '../../../components/ToastSuccess';
import { loadMaticPolygonBalance } from '../auth/auth';
// import { ToastSuccess } from '../../../components/ToastSuccess';
// import { loadEthereumBalance, loadMaticPolygonBalance } from '../auth/auth';
// import { createOrder } from '../orders/orders';
// import { ToastError } from '../../../components/ToastError';
import {
  PAYMENT_FAIL,
  PAYMENT_SUCCESS,
  GET_POLYGON_TOKENS_FAIL,
  GET_POLYGON_TOKENS_SUCCESS,
  GET_TOKENS_FAIL,
  GET_TOKENS_SUCCESS,
} from './types';

export const cryptoPay = (userID, address, cartItems) => async (dispatch) => {
  const access = localStorage.getItem('access');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${access}`,
    },
  };

  const body = JSON.stringify({
    userID,
    address,
    cartItems,
  });

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_PAYMENT_URL}/api/crypto/pay/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: PAYMENT_SUCCESS,
        payload: res.data.results,
      });
      dispatch(loadMaticPolygonBalance(address));
      ToastSuccess('Successfull Transaction');
    } else {
      dispatch({
        type: PAYMENT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: PAYMENT_FAIL,
    });
  }
};

export const resetCryptoPayment = () => async (dispatch) => {
  dispatch({
    type: PAYMENT_FAIL,
  });
};

export const getTokens = (tokens) => async (dispatch) => {
  dispatch({
    type: GET_TOKENS_SUCCESS,
    payload: tokens,
  });
};

export const getPolygonTokens = (tokens) => async (dispatch) => {
  dispatch({
    type: GET_POLYGON_TOKENS_SUCCESS,
    payload: tokens,
  });
};

export const resetTokens = (tokens) => async (dispatch) => {
  dispatch({
    type: GET_TOKENS_FAIL,
    payload: tokens,
  });
};
export const resetPolygonTokens = (tokens) => async (dispatch) => {
  dispatch({
    type: GET_POLYGON_TOKENS_FAIL,
    payload: tokens,
  });
};
