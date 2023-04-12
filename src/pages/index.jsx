import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'next/head';
import Layout from '@/hocs/Layout';
import Header from './components/Header';
import Badges from './components/Badges';
import AffiliatesInfo from './components/AffiliatesInfo';
import Teach from './components/Teach';
import TeachCTA from './components/TeachCTA';
import { setMetadata } from '@/redux/actions/metadata/metadata';

const SeoList = {
  title: 'Boomslag - The Ultimate NFT Marketplace for Courses & Products',
  description:
    'Explore a new world of possibilities with Boomslag, the innovative NFT marketplace that enables you to discover, purchase, and sell a variety of items, ranging from online courses to physical products and beyond, all using the cutting-edge ERC1155 technology.',
  href: '/',
  url: 'https://boomslag.com',
  keywords: 'nft marketplace, matic nfts, boomslag nfts, sell nfts online',
  robots: 'all',
  author: 'BoomSlag',
  publisher: 'BoomSlag',
  image:
    'https://bafybeiaor24mrcurzyzccxl7xw46zdqpor4sfuhddl6tzblujoiukchxnq.ipfs.w3s.link/teach.png',
  video: 'https://boomslagcourses.s3.us-east-2.amazonaws.com/Quack+Sound+Effect.mp4',

  twitterHandle: '@boomslag_',
};

export default function Home() {
  const dispatch = useDispatch();
  const metadata = useSelector((state) => state.metadata.metadata);

  useEffect(() => {
    dispatch(setMetadata(SeoList));
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.href} />
        <meta name="robots" content={metadata.robots} />
        <meta name="author" content={metadata.author} />
        <meta name="publisher" content={metadata.publisher} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Social Media Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:image:width" content="1370" />
        <meta property="og:image:height" content="849" />
        <meta property="og:image:alt" content={metadata.image} />
        <meta property="og:type" content="website" />

        <meta property="fb:app_id" content="555171873348164" />

        {/* Video meta tags */}
        <meta property="og:video" content={metadata.video} />
        <meta property="og:video:url" content={metadata.video} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta property="og:video:secure_url" content={metadata.video} />

        {/* Twitter meta Tags */}
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={metadata.twitterHandle} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
        <meta name="twitter:player:stream" content={metadata.video} />
      </Head>
      <main className="dark:bg-dark-main">
        <div className="text-gray-700 dark:text-dark-txt space-y-12">
          <Header />
          <Badges />
          <AffiliatesInfo />
          <Teach />
          <TeachCTA />
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
