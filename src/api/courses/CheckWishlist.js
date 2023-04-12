import axios from 'axios';
// import { ToastError } from '../../components/ToastError';

export default async function CheckWishlist(courseUUID) {
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

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/wishlist/check/?course_id=${courseUUID}`,
      {
        ...config,
        signal: abortSignal,
      },
    );

    return res;
  } catch (err) {
    if (axios.isCancel(err)) {
      //   ToastError(`Error: ${err.response.statusText}`);
    } else {
      //   ToastError(`Error: ${err.response.statusText}`);
    }
  }
}