import axios from 'axios';

export default async function ListPolygonTokenBalances(tokens) {
  // const controller = new AbortController();
  // const abortSignal = controller.signal;

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
      tokens,
    });

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_CRYPTO_URL}/api/tokens/list/balances/polygon/`,
      body,
      {
        ...config,
        // signal: abortSignal,
      },
    );

    if (res.status === 200) {
      return res;
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