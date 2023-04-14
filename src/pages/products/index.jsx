import Head from 'next/head';
import Layout from '@/hocs/Layout';
import axios from 'axios';
import PopularTabs from '../categories/p/components/PopularTabs';
import FeaturedProducts from '../components/products/list/FeaturedProducts';
import PopularTopics from '../categories/p/components/PopularTopics';
import PopularInstructors from '../categories/p/components/PopularInstructors';
import SearchProducts from '../categories/p/components/SearchProducts';

const SeoList = {
  title: 'Boomslag - Buy & Sell Products with NFTs on our Marketplace',
  description:
    'Discover a new way to buy and sell products using NFTs on Boomslag. Our revolutionary platform lets you purchase and sell physical and digital products securely and seamlessly using ERC1155 tokens.',
  href: '/',
  url: 'https://boomslag.com',
  keywords: 'buy and sell products, nft product marketplace, nft marketplace, sell nfts',
  robots: 'all',
  author: 'BoomSlag',
  publisher: 'BoomSlag',
  image:
    'https://bafybeiaor24mrcurzyzccxl7xw46zdqpor4sfuhddl6tzblujoiukchxnq.ipfs.w3s.link/friends.png',
  twitterHandle: '@BoomSlag',
};

export default function Products({
  categories,
  instructors,
  mostViewedProducts,
  newestProducts,
  mostSoldProducts,
}) {
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
      <div className="mx-auto max-w-7xl px-4 ">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-7xl p-0 pt-12 md:p-12">
          <div className="space-y-12">
            <PopularTabs
              productsBySold={mostSoldProducts}
              products={newestProducts}
              productsByViews={mostViewedProducts}
            />
            <FeaturedProducts data={newestProducts} />
            <PopularTopics categories={categories} />
            <PopularInstructors instructors={instructors} />
            <SearchProducts categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}

Products.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  const categoriesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_PRODUCTS_URL}/api/category/popular/`,
  );

  const instructorsRes = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/users/instructors/best_selling/`,
  );

  const mostViewedRes = await axios.get(
    `${
      process.env.NEXT_PUBLIC_APP_PRODUCTS_URL
    }/api/products/list/?filter=date_created&p=${1}&page_size=${12}&max_page_size=${100}&filter=${'views'}`,
  );
  const newestRes = await axios.get(
    `${
      process.env.NEXT_PUBLIC_APP_PRODUCTS_URL
    }/api/products/list/?filter=date_created&p=${1}&page_size=${12}&max_page_size=${100}`,
  );
  const mostSoldRes = await axios.get(
    `${
      process.env.NEXT_PUBLIC_APP_PRODUCTS_URL
    }/api/products/list/?filter=date_created&p=${1}&page_size=${12}&max_page_size=${100}&filter=${'sold'}`,
  );

  return {
    props: {
      categories: categoriesRes.data.results,
      instructors: instructorsRes.data.results,
      mostViewedProducts: mostViewedRes.data.results,
      newestProducts: newestRes.data.results,
      mostSoldProducts: mostSoldRes.data.results,
    },
  };
}
