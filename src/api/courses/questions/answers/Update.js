import axios from 'axios';

export default async function UpdateQuestionAnswer(answerId, body) {
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

    const content = JSON.stringify({
      answerId,
      body,
    });

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/answers/update/`,
      content,
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
      // console.log('Request canceled', err.message);
    } else {
      // console.log(err);
    }
  }
}
