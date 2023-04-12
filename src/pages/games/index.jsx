import Head from 'next/head';
import Layout from '@/hocs/Layout';

const SeoList = {
  title: 'Boomslag - Discover Exciting Games and Interactive Experiences',
  description:
    'Explore a wide variety of immersive games at Boomslag, a cutting-edge marketplace offering seamless transactions using NFTs and ERC1155 tokens. Find and buy games to play, and unlock premium features.',
  href: '/games',
  url: 'https://boomslag.com/games',
  keywords:
    'games, online games, multiplayer games, game marketplace, NFT games, ERC1155 tokens, gaming platform, buy games, game features',
  robots: 'all',
  author: 'BoomSlag',
  publisher: 'BoomSlag',
  image: 'https://your-image-url-here.png',
  twitterHandle: '@BoomSlag',
};

export default function Games() {
  return (
    <div className="dark:bg-dark-bg">
      <Head>
        <title>{SeoList.title}</title>
        <meta name="description" content={SeoList.description} />

        <meta name="keywords" content={SeoList.keywords} />
        <link rel="canonical" href={SeoList.href} />
        <meta name="robots" content={SeoList.robots} />
        <meta name="author" content={SeoList.author} />
        <meta name="publisher" content={SeoList.publisher} />

        {/* Social Media Tags */}
        <meta property="og:title" content={SeoList.title} />
        <meta property="og:description" content={SeoList.description} />
        <meta property="og:url" content={SeoList.url} />
        <meta property="og:image" content={SeoList.image} />
        <meta property="og:image:width" content="1370" />
        <meta property="og:image:height" content="849" />
        <meta property="og:image:alt" content="Boomslag Thumbnail Image" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={SeoList.title} />
        <meta name="twitter:description" content={SeoList.description} />
        <meta name="twitter:image" content={SeoList.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SeoList.twitterHandle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Games
    </div>
  );
}

Games.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
