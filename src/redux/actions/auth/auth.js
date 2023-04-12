import axios from 'axios';
import Web3 from 'web3';
import { ToastError } from '../../../components/ToastError';
import { ToastSuccess } from '../../../components/ToastSuccess';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGOUT,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  MY_USER_PROFILE_LOADED_SUCCESS,
  MY_USER_PROFILE_LOADED_FAIL,
  MY_USER_WALLET_LOADED_SUCCESS,
  MY_USER_WALLET_LOADED_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  USER_WALLET_BALANCE_LOADED_SUCCESS,
  USER_WALLET_BALANCE_LOADED_FAIL,
  GET_PRAEDIUM_BALANCE_SUCCESS,
  GET_PRAEDIUM_BALANCE_FAIL,
  GET_GALR_BALANCE_SUCCESS,
  GET_GALR_BALANCE_FAIL,
  GET_MATIC_BALANCE_SUCCESS,
  GET_MATIC_BALANCE_FAIL,
  GET_DELIVERY_SUCCESS,
  GET_DELIVERY_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER_CONTACTS_SUCCESS,
  GET_USER_CONTACTS_FAIL,
} from './types';

import PraediumToken from '@/contracts/PraediumToken.sol/PraediumToken.json';
import GalacticReserveToken from '@/contracts/GalacticReserveToken.sol/GalacticReserveToken.json';
import { synchCart } from '../cart/cart';

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_APP_RPC_ETH_PROVIDER),
);
const polygonWeb3 = new Web3(
  new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_APP_RPC_POLYGON_PROVIDER),
);

export const loadUser = (currentState) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    if (currentState && currentState.user) {
      // If the user is already in the state, don't make an API call
      return;
    }

    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/me/`, config);

      if (res.status === 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: USER_LOADED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const getUser = (username) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const body = JSON.stringify({
      username,
    });

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/api/users/get_user`,
      body,
      config,
    );

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data.user,
      });
    } else {
      dispatch({
        type: GET_USER_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_USER_FAIL,
    });
  }
};

export const getUserDelivery = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    try {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      };

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/delivery/get_addresses/`,
        config,
      );

      if (res.status === 200) {
        dispatch({
          type: GET_DELIVERY_SUCCESS,
          payload: res.data.results,
        });
      } else {
        dispatch({
          type: GET_DELIVERY_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: GET_DELIVERY_FAIL,
      });
    }
  }
};

export const loadUserProfile = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/profiles/my_profile`,
        config,
      );

      if (res.status === 200) {
        dispatch({
          type: MY_USER_PROFILE_LOADED_SUCCESS,
          payload: res.data.profile,
        });
      } else {
        dispatch({
          type: MY_USER_PROFILE_LOADED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: MY_USER_PROFILE_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: MY_USER_PROFILE_LOADED_FAIL,
    });
  }
};

export const loadUserContacts = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/contacts/my_contact_lists`,
        config,
      );

      if (res.status === 200) {
        dispatch({
          type: GET_USER_CONTACTS_SUCCESS,
          payload: res.data.results,
        });
      } else {
        dispatch({
          type: GET_USER_CONTACTS_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: GET_USER_CONTACTS_FAIL,
      });
    }
  } else {
    dispatch({
      type: GET_USER_CONTACTS_FAIL,
    });
  }
};

export const loadUserWallet = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/wallets/my_wallet`,
        config,
      );

      if (res.status === 200) {
        dispatch({
          type: MY_USER_WALLET_LOADED_SUCCESS,
          payload: res.data.results,
        });
      } else {
        dispatch({
          type: MY_USER_WALLET_LOADED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: MY_USER_WALLET_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: MY_USER_WALLET_LOADED_FAIL,
    });
  }
};

export const loadGalrBalance = (address) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    try {
      // create instances of the ERC20 contracts
      const galacticReserveContract = new web3.eth.Contract(
        GalacticReserveToken.abi,
        process.env.NEXT_APP_GALR_TOKEN_ADDRESS,
      );
      // get the token balances
      const galacticReserveBalance = await galacticReserveContract.methods
        .balanceOf(address)
        .call();

      dispatch({
        type: GET_GALR_BALANCE_SUCCESS,
        payload: web3.utils.fromWei(galacticReserveBalance, 'ether'),
      });
    } catch (err) {
      dispatch({
        type: GET_GALR_BALANCE_FAIL,
      });
    }
  }
};

export const loadPraediumBalance = (address) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    try {
      const praediumContract = new web3.eth.Contract(
        PraediumToken.abi,
        process.env.NEXT_APP_PDM_TOKEN_ADDRESS,
      );
      const praediumBalance = await praediumContract.methods.balanceOf(address).call();

      dispatch({
        type: GET_PRAEDIUM_BALANCE_SUCCESS,
        payload: web3.utils.fromWei(praediumBalance, 'ether'),
      });
    } catch (err) {
      dispatch({
        type: GET_PRAEDIUM_BALANCE_FAIL,
      });
    }
  }
};

export const loadEthereumBalance = (address) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    try {
      web3.eth.getBalance(address, (err, balance) => {
        if (err) {
          // eslint-disable-next-line
          console.error(err);
        } else {
          dispatch({
            type: USER_WALLET_BALANCE_LOADED_SUCCESS,
            payload: web3.utils.fromWei(balance, 'ether'),
          });
        }
      });
    } catch (err) {
      dispatch({
        type: USER_WALLET_BALANCE_LOADED_FAIL,
      });
    }
  }
};

export const loadMaticPolygonBalance = (address) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    try {
      polygonWeb3.eth.getBalance(address, (err, balance) => {
        if (err) {
          // eslint-disable-next-line
          console.error(err);
        } else {
          dispatch({
            type: GET_MATIC_BALANCE_SUCCESS,
            payload: polygonWeb3.utils.fromWei(balance, 'ether'),
          });
        }
      });
    } catch (err) {
      dispatch({
        type: GET_MATIC_BALANCE_FAIL,
      });
    }
  }
};

export const loadWalletAndBalances = () => async (dispatch, getState) => {
  const wallet = await dispatch(loadUserWallet());
  if (wallet) {
    const { address, polygon_address } = wallet;
    dispatch(loadEthereumBalance(address));
    dispatch(loadPraediumBalance(polygon_address));
    dispatch(loadGalrBalance(polygon_address));
    dispatch(loadMaticPolygonBalance(polygon_address));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/user/jwt/create/`,
      body,
      config,
    );

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(loadUserProfile());
      dispatch(loadUserWallet());
      dispatch(loadUserContacts());

      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(synchCart());
      // dispatch(get_wishlist_items());
      // dispatch(get_wishlist_item_total());
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      ToastError('Error con el servidor');
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    ToastError('Error, Correo o Contraseña incorrecto.');
  }
};

export const register =
  (email, username, agreed, firstName, lastName, password, rePassword) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      email,
      username,
      agreed,
      first_name: firstName,
      last_name: lastName,
      password,
      re_password: rePassword,
    });

    try {
      //   // eslint-disable-next-line no-console
      //   console.log(body);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/`,
        body,
        config,
      );

      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        ToastSuccess('We have sent you a confirmation email. Check all your inboxes.');
      } else {
        dispatch({
          type: SIGNUP_FAIL,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        ToastError('Error con el servidor', 'error');
      }

      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      ToastError(err.request.response);
    }
  };

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      token: localStorage.getItem('access'),
    });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/jwt/verify/`,
        body,
        config,
      );

      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const refresh = () => async (dispatch) => {
  if (localStorage.getItem('refresh')) {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      refresh: localStorage.getItem('refresh'),
    });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/jwt/refresh/`,
        body,
        config,
      );

      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: REFRESH_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } else {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

export const activate = (uid, token) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    uid,
    token,
  });

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/activation/`,
      body,
      config,
    );

    if (res.status === 204) {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      ToastSuccess('Cuenta activada correctamente');
    } else {
      dispatch({
        type: ACTIVATION_FAIL,
      });
      ToastError('error al activar cuenta');
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    ToastError(err.request.response);
  }
};

export const resetPassword = (email) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/reset_password/`,
      body,
      config,
    );

    if (res.status === 204) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
      ToastSuccess('Te hemos enviado un correo');
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      ToastError('Error con el servidor');
    }
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    ToastError(err.request.response);
  }
};

export const resendActivation = (email) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/resend_activation/`,
      body,
      config,
    );

    if (res.status === 204) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
      ToastSuccess('Te hemos enviado un correo');
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      ToastError('Error con el servidor');
    }
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    ToastError('Email does not exist');
  }
};

export const resetPasswordConfirm =
  (uid, token, newPassword, reNewPassword) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      uid,
      token,
      new_password: newPassword,
      re_new_password: reNewPassword,
    });

    if (newPassword !== reNewPassword) {
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/users/reset_password_confirm/`,
          body,
          config,
        );

        if (res.status === 204) {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
          });
          ToastSuccess('Contraseña cambiada correctamente');
          dispatch({
            type: REMOVE_AUTH_LOADING,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL,
          });
          dispatch({
            type: REMOVE_AUTH_LOADING,
          });
          ToastError('Error con el servidor');
        }
      } catch (err) {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
        ToastError(err.request.response);
      }
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
