import axios from 'axios';

export default async function SetProductHandle(productUUID, bool, url) {
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
      productUUID,
      bool,
    });

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_APP_PRODUCTS_URL}/api/products/edit/handle/${url}/`,
      body,
      {
        ...config,
        signal: abortSignal,
      },
    );

    if (res.status === 200) {
      return res.data.results;
    }
  } catch (err) {
    if (axios.isCancel(err)) {
      // eslint-disable-next-line
      console.log('Request canceled', err.message);
    } else {
      // eslint-disable-next-line
      console.log(err);
    }
  } finally {
    controller.abort();
  }
}
