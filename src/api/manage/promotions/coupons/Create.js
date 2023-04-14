import axios from 'axios';
import { ToastError } from '../../../../components/toast/ToastError';

export default async function CreateCoupon(name, uses, price, percentage, type, object) {
  const controller = new AbortController();
  const abortSignal = controller.signal;

  try {
    const access = localStorage.getItem('access');
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    let body;
    if (price) {
      body = JSON.stringify({
        name,
        fixed_price_coupon: {
          discount_price: price,
          uses,
        },
        content_type: type,
        object_id: object,
      });
    } else if (percentage) {
      body = JSON.stringify({
        name,
        percentage_coupon: {
          discount_percentage: percentage,
          uses,
        },
        content_type: type,
        object_id: object,
      });
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COUPONS_API_URL}/api/coupons/create/`,
      body,
      {
        ...config,
        signal: abortSignal,
      },
    );

    if (res.status === 201) {
      return res.data;
    }
  } catch (err) {
    if (axios.isCancel(err)) {
      ToastError(`Error: ${err.response.data.error}`);
      // eslint-disable-next-line
      // console.log('FETCH ERROR: ', err.response.data);
    } else {
      ToastError(`Error: ${err.response.data.error}`);
      // eslint-disable-next-line
      // console.log('FETCH ERROR: ', err.response.data);
      return { error: err.response.data.error };
    }
  } finally {
    controller.abort();
  }
}
