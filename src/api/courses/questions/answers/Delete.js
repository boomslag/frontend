import axios from 'axios';
// import { ToastError } from '../../../../components/ToastError';
// import { ToastSuccess } from '../../../../components/ToastSuccess';

export default async function DeleteAnswer(answerId) {
  try {
    const access = localStorage.getItem('access');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      answerId,
    });

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/answers/delete/`,
      body,
      config,
    );

    if (res.status === 200) {
      // ToastSuccess('Answer deleted successfully.');
      return res;
    }
  } catch (err) {
    // ToastError(`Error: ${err.response.statusText}`);
  }

  return false;
}
