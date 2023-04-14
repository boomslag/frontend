import Head from 'next/head';
import axios from 'axios';
import Layout from '@/hocs/Layout';
import PopularTabs from '../categories/c/components/PopularTabs';
import FeaturedCourses from '../components/courses/list/FeaturedCourses';
import PopularTopics from '../categories/c/components/PopularTopics';
import PopularInstructors from '../categories/c/components/PopularInstructors';
import SearchCourses from '../categories/c/components/SearchCourses';

const SeoList = {
  title: 'Boomslag Courses - Explore Premium Online Courses',
  description:
    'Find and buy high-quality online courses at Boomslag, a cutting-edge marketplace where you can acquire knowledge through secure and seamless transactions using NFTs and ERC1155 tokens.',
  href: '/',
  url: 'https://boomslag.com',
  keywords:
    'online courses, online education, e-learning, nft courses marketplace, nft education, erc1155 tokens, blockchain education',
  robots: 'all',
  author: 'Boomslag',
  publisher: 'Boomslag',
  image:
    'https://bafybeiaor24mrcurzyzccxl7xw46zdqpor4sfuhddl6tzblujoiukchxnq.ipfs.w3s.link/teach.png',
  video: 'https://boomslagcourses.s3.us-east-2.amazonaws.com/Quack+Sound+Effect.mp4',

  twitterHandle: '@boomslag_',
};

export default function Courses({
  mostViewedCourses,
  newestCourses,
  mostSoldCourses,
  categories,
  instructors,
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
              coursesBySold={mostSoldCourses}
              courses={newestCourses}
              coursesByViews={mostViewedCourses}
            />
            <FeaturedCourses data={newestCourses} />
            <PopularTopics categories={categories} />
            <PopularInstructors instructors={instructors} />
            <SearchCourses categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}

Courses.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  const categoriesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_COURSES_URL}/api/category/popular/`,
  );

  const instructorsRes = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/users/instructors/best_selling/`,
  );

  const mostViewedCoursesRes = await axios.get(
    `${
      process.env.NEXT_PUBLIC_APP_COURSES_URL
    }/api/courses/search/?p=${1}&page_size=${12}&max_page_size=${100}&filter=${'views'}&order=${'-published'}&search=${''}&rating=${''}&language=${''}&duration=${''}&category=${''}&level=${''}&pricing=${''}&author=${''}`,
  );
  const newestCoursesRes = await axios.get(
    `${
      process.env.NEXT_PUBLIC_APP_COURSES_URL
    }/api/courses/search/?p=${1}&page_size=${12}&max_page_size=${100}&filter=${'-published'}&order=${'-published'}&search=${''}&rating=${''}&language=${''}&duration=${''}&category=${''}&level=${''}&pricing=${''}&author=${''}`,
  );
  const mostSoldCoursesRes = await axios.get(
    `${
      process.env.NEXT_PUBLIC_APP_COURSES_URL
    }/api/courses/search/?p=${1}&page_size=${12}&max_page_size=${100}&filter=${'sold'}&order=${'-published'}&search=${''}&rating=${''}&language=${''}&duration=${''}&category=${''}&level=${''}&pricing=${''}&author=${''}`,
  );

  return {
    props: {
      categories: categoriesRes.data.results,
      instructors: instructorsRes.data.results,
      mostViewedCourses: mostViewedCoursesRes.data.results,
      newestCourses: newestCoursesRes.data.results,
      mostSoldCourses: mostSoldCoursesRes.data.results,
    },
  };
}
