import axios from 'axios';
import { ToastError } from '@/components/ToastError';

export default async function UpdateProductReview(userID, productUUID, rating, content) {
  const controller = new AbortController();
  const abortSignal = controller.signal;

  try {
    const access = localStorage.getItem('access');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      user_id: userID,
      productUUID,
      rating,
      content,
    });

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_PRODUCTS_URL}/api/reviews/edit/`,
      body,
      {
        ...config,
        signal: abortSignal,
      },
    );

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    if (axios.isCancel(err)) {
      // eslint-disable-next-line
      console.log('Request canceled', err.message);
      ToastError(`Error: ${err}`);
    } else {
      // eslint-disable-next-line
      console.log(err);
      ToastError(`Error: ${err}`);
    }
  }
}
