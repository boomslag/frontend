import axios from 'axios';
import { ToastError } from '../../components/toast/ToastError';

export default async function DeployNFT(id, price, tokenId, stock, teamMembers, uri) {
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
      id,
      price,
      tokenId,
      stock,
      teamMembers,
      uri,
    });

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_CRYPTO_URL}/api/courses/nft_deploy/`,
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
      ToastError(`Error: ${err.response.statusText}`);
    } else {
      // eslint-disable-next-line
      console.log(err);
      ToastError(`Error: ${err.response.statusText}`);
    }
  }
}
