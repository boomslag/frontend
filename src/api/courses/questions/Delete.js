import axios from 'axios';
// import { ToastError } from '../../../components/ToastError';
// import { ToastSuccess } from '../../../components/ToastSuccess';

export default async function DeleteQuestion(questionId) {
  try {
    const access = localStorage.getItem('access');
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
      },
    };

    const body = JSON.stringify({
      questionId,
    });

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/questions/delete/`,
      body,
      {
        ...config,
      },
    );

    if (res.status === 200) {
      // ToastSuccess('Question deleted successfully.');
      return res;
    }
  } catch (err) {
    // ToastError(`Error: ${err.response.statusText}`);
  }
}
