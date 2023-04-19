import axios from 'axios';
import { ToastError } from '@/components/toast/ToastError';

export default async function CreateProductReview(userID, productUUID, rating, content) {
  const controller = new AbortController();
  const abortSignal = controller.signal;

  try {
    const body = {
      userID,
      productUUID,
      rating,
      content,
    };

    const res = await axios.post('/api/products/reviews/create', body, {
      signal: abortSignal,
    });

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
