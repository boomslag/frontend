import axios from 'axios';
import { ToastError } from '../../../components/ToastError';
import {
  GET_TOTAL_SUCCESS,
  GET_TOTAL_FAIL,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  ADD_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  GET_PRODUCTS_FROM_LIST_SUCCESS,
  GET_PRODUCTS_FROM_LIST_FAIL,
  GET_COURSES_FROM_LIST_SUCCESS,
  GET_COURSES_FROM_LIST_FAIL,
  REMOVE_ITEM_FAIL,
  REMOVE_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  ADD_ITEM,
  EMPTY_CART,
  EMPTY_CART_FAIL,
  EMPTY_CART_SUCCESS,
  REMOVE_ITEM,
  SYNCH_CART_FAIL,
  SYNCH_CART_SUCCESS,
} from './types';

export const getItems = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_CART_URL}/api/cart/cart-items/`,
      config,
    );
    if (res.status === 200) {
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: res.data.results,
      });
    } else {
      dispatch({
        type: GET_ITEMS_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ITEMS_FAIL,
    });
  }
};

export const getCartTotal = (body) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  // Send an empty array if the body is empty
  const requestData = body || [];

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_CART_URL}/api/cart/get-total/`,
      requestData,
      config,
    );
    if (res.status === 200) {
      dispatch({
        type: GET_TOTAL_SUCCESS,
        payload: res.data.results,
      });
    } else {
      dispatch({
        type: GET_TOTAL_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_TOTAL_FAIL,
    });
  }
};

export const addItem =
  (itemID, type, coupon, shipping, quantity, size, color, weight, material, referrer) =>
  async (dispatch) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      };

      const body = JSON.stringify({
        itemID,
        type,
        shipping: shipping || '',
        color: color || '',
        size: size || '',
        weight: weight || '',
        material: material || '',
        quantity,
        coupon,
        referrer,
      });

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_CART_URL}/api/cart/add-item/`,
          body,
          config,
        );
        // eslint-disable-next-line
        // console.log(res.data.results);
        if (res.status === 200) {
          dispatch({
            type: ADD_ITEM_SUCCESS,
            payload: res.data.results,
          });
        } else {
          ToastError('Error Adding item to cart');
          dispatch({
            type: ADD_ITEM_FAIL,
          });
        }
      } catch (err) {
        ToastError(err.response.data.error);
        dispatch({
          type: ADD_ITEM_FAIL,
        });
      }
    } else {
      let cart = [];

      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      let shouldAddItem = true;

      cart.map((item) => {
        if (itemID.toString() === item.course || itemID.toString() === item.product) {
          shouldAddItem = false;
        }
      });

      if (type === 'Course') {
        const orderItem = {
          course: itemID,
          coupon,
          referrer,
        };

        if (shouldAddItem) {
          cart.push(orderItem);
        }
      }
      if (type === 'Product') {
        const orderItem = {
          product: itemID,
          type,
          shipping: (shipping && shipping.id) || '',
          color: (color && color.id) || '',
          size: (size && size.id) || '',
          weight: (weight && weight.id) || '',
          material: (material && material.id) || '',
          quantity,
          coupon,
          referrer,
        };

        if (shouldAddItem) {
          cart.push(orderItem);
        }
      }

      dispatch({
        type: ADD_ITEM,
        payload: cart,
      });
      // dispatch(getCartTotal(cart));
    }
  };

export const removeCartItem = (itemID, type) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    };

    const body = JSON.stringify({
      itemID,
      type,
    });

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_APP_CART_URL}/api/cart/remove-item/`,
        body,
        config,
      );
      if (res.status === 200) {
        dispatch({
          type: REMOVE_ITEM_SUCCESS,
          payload: res.data.results,
        });
      } else {
        ToastError('Error Removing item from cart');
        dispatch({
          type: REMOVE_ITEM_FAIL,
        });
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
      // ToastError(err.response.data.error);
      dispatch({
        type: REMOVE_ITEM_FAIL,
      });
    }
  } else {
    let cart = [];

    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));

      const new_cart = cart.filter((cart_item) => {
        if (type === 'Course') {
          return !('course' in cart_item && cart_item.course.toString() === itemID.toString());
        } else if (type === 'Product') {
          return !('product' in cart_item && cart_item.product.toString() === itemID.toString());
        }
        return true;
      });

      localStorage.setItem('cart', JSON.stringify(new_cart));

      dispatch({
        type: REMOVE_ITEM,
        payload: new_cart,
      });
      dispatch(getCartTotal(new_cart));
    }
  }
};

export const updateCartItem = (itemID, value) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    };

    const body = JSON.stringify({
      itemID,
      value,
    });

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_APP_CART_URL}/api/cart/update-item/`,
        body,
        config,
      );
      if (res.status === 200) {
        dispatch({
          type: UPDATE_ITEM_SUCCESS,
          payload: res.data.results,
        });
      } else {
        ToastError('Error Adding item to cart');
        dispatch({
          type: UPDATE_ITEM_FAIL,
        });
      }
    } catch (err) {
      // ToastError(err.response.data.error);
      // eslint-disable-next-line
      console.log(err);
      dispatch({
        type: UPDATE_ITEM_FAIL,
      });
    }
  }
};

export const getCoursesFromCart = (body) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/list/id/`,
      body,
      config,
    );
    if (res.status === 200) {
      dispatch({
        type: GET_COURSES_FROM_LIST_SUCCESS,
        payload: res.data.results,
      });
    } else {
      dispatch({
        type: GET_COURSES_FROM_LIST_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_COURSES_FROM_LIST_FAIL,
    });
  }
};

export const getProductsFromCart = (body) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_PRODUCTS_URL}/api/products/list/id/`,
      body,
      config,
    );
    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCTS_FROM_LIST_SUCCESS,
        payload: res.data.results,
      });
    } else {
      dispatch({
        type: GET_PRODUCTS_FROM_LIST_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS_FROM_LIST_FAIL,
    });
  }
};

export const emptyCart = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_CART_URL}/api/cart/clear/`,
        config,
      );

      if (res.status === 200) {
        dispatch({
          type: EMPTY_CART_SUCCESS,
        });
      } else {
        dispatch({
          type: EMPTY_CART_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: EMPTY_CART_FAIL,
      });
    }
  } else {
    dispatch({
      type: EMPTY_CART,
    });
  }
};

export const synchCart = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  let cart_items = [];

  if (localStorage.getItem('cart')) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart.map((cart_item) => {
      const item = {};
      if (cart_item.product) {
        item.product_id = cart_item.product;
        item.type = 'Product';
      } else if (cart_item.course) {
        item.course_id = cart_item.course;
        item.type = 'Course';
      }
      item.coupon = cart_item.coupon;
      item.referrer = cart_item.referrer;
      cart_items.push(item);
    });
  }

  const body = JSON.stringify({ cart_items });

  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_CART_URL}/api/cart/synch`,
      body,
      config,
    );

    if (res.status === 201) {
      dispatch({
        type: SYNCH_CART_SUCCESS,
      });
    } else {
      dispatch({
        type: SYNCH_CART_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: SYNCH_CART_FAIL,
    });
  }
};
