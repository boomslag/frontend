import React from 'react';
import Link from 'next/link';
import slugify from 'react-slugify';

export default function LibraryCourseCard({ data }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative flex flex-col   space-y-1 w-72 transition duration-100 ease-in-out p-3 max-w-xs  mx-auto border border-white bg-white">
        {/* Image */}
        <div className="w-full  bg-white grid place-items-center">
          {/* <video
                      loop
                      muted
                      className='rounded-xl'
                      src={data.sales_video}
                      poster={data.thumbnail}
                      onMouseOver={event => event.target.play()}
                      onMouseOut={event => event.target.load()}
                    >
                    </video> */}
          <Link href={`/courses/study/${slugify(data.course_uuid)}`}>
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt={data.title.length > 46 ? data.title.slice(0, 45) : data.title}
              className="border rounded-xl"
            />
          </Link>
        </div>

        <div className="w-full  bg-white flex flex-col space-y-2 p-3">
          {/* Title */}
          <h3 className="font-bold text-gray-800 hover:text-purple-600 text-md">
            <Link href={`/courses/study/${slugify(data.course_uuid)}`}>
              {data.title.length > 46 ? data.title.slice(0, 45) : data.title}
            </Link>
          </h3>

          <div className="h-1 w-full mt-2 bg-gray-300 dark:bg-dark-second">
            <div
              style={{ width: `75%` }}
              className={`h-full ${75 < 70 ? 'bg-rose-600' : 'bg-purple-600'}`}
            />
          </div>

          {/* Badges */}
          <div className="flex justify-between item-center">
            <p className="text-gray-500 font-medium md:block">
              <Link href={`/courses/study/${slugify(data.course_uuid)}`}>Start Course</Link>
            </p>

            {/* <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <button className="text-gray-600 hover:underline font-regular text-sm ml-1 select-none">
                                leave a review
                            </button>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
