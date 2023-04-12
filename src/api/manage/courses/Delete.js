import axios from 'axios';

export default async function DeleteCourse(courseUUID) {
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

    const body = JSON.stringify({
      courseUUID,
    });

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/delete/`,
      body,
      {
        ...config,
        signal: abortSignal,
      },
    );

    if (res.status === 200) {
      return res.status.results;
    }
  } catch (err) {
    if (axios.isCancel(err)) {
      // eslint-disable-next-line
      console.log('Request canceled', err.message);
    } else {
      // eslint-disable-next-line
      console.log(err);
    }
  }
}
