import axios from 'axios';
// import { ToastError } from '../../../components/ToastError';

export default async function FetchEpisodeQuestions(
  episodeUUID,
  page,
  pageSize,
  maxPageSize,
  sortBy,
  filterBy,
  userId,
  search,
) {
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
      `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/courses/questions/episode/list/?id=${episodeUUID}&sort_by=${sortBy}&filter_by=${filterBy}&p=${page}&page_size=${pageSize}&max_page_size=${maxPageSize}&user_id=${userId}&search=${search}`,
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
      // ToastError(`Error: ${err.response.statusText}`);
    } else {
      // ToastError(`Error: ${err.response.statusText}`);
    }
  }
}
