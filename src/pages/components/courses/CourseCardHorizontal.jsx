import { StarIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import UpdateCourseClicks from '@/api/courses/UpdateClicks';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CourseCardHorizontal({ data }) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleUpdateClicks = () => {
    UpdateCourseClicks(data && data.id);
  };

  function calculateDiscountPercentage(originalPrice, discountedPrice) {
    if (originalPrice === 0) return 0;
    return parseInt(((originalPrice - discountedPrice) / originalPrice) * 100, 10);
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="m-4 flex flex-col justify-center"
    >
      <div className="relative mx-auto flex h-full max-w-xs flex-col border-t-2 border-l-2 border-r-2 dark:border-b-2 dark:border-dark-border border-dark-bg dark:shadow-none shadow-neubrutalism-md transition duration-300  ease-in-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neubrutalism-xl md:max-w-full md:flex-row ">
        <Link
          // onClick={() => {
          //   handleUpdateClicks();
          // }}
          href={`/course/${data.slug}`}
          className="relative grid w-full place-items-center dark:bg-dark-bg bg-gray-50 md:w-5/12"
        >
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt={data.title}
            className="h-full object-cover"
          />

          <div
            id={`img-shadow${data.id}`}
            className="bg-gray-350 absolute inset-0 mix-blend-multiply"
            aria-hidden="true"
          />
        </Link>

        <div className="relative flex w-full flex-col space-y-2 p-4">
          <div className="item-center flex justify-between">
            <Link
              onClick={() => {
                handleUpdateClicks();
              }}
              href={`/course/${data.slug}`}
              className={`text-lg font-bold  ${
                hover ? 'text-iris-500 dark:text-dark-primary' : 'dark:text-dark-txt text-gray-800'
              }`}
            >
              {data.title}
            </Link>

            <div className="flex items-center">
              {data.discount ? (
                <p className=" text-gray-800 dark:text-dark-txt">
                  {' '}
                  <strong>${data.price}</strong> /{' '}
                  <span className="line-through">{data.compare_price}</span>
                </p>
              ) : (
                <p className=" text-gray-800 dark:text-dark-txt">
                  <strong>${data.price}</strong>
                </p>
              )}
            </div>
          </div>
          <div className="item-center flex justify-between">
            <p className=" text-md select-none dark:text-dark-txt-secondary text-gray-600">
              {data && data.short_description && data.short_description.length > 46
                ? data.short_description.slice(0, 60)
                : data.short_description}
            </p>

            <div className="flex items-center">
              {data.discount ? (
                <p className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                  {calculateDiscountPercentage(data.price, data.compare_price)}% Off
                </p>
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="">
              <p className="text-xs dark:text-dark-txt-secondary text-gray-500">
                {data.author.username}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <div className="flex gap-x-2" />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="hidden md:flex">
              <h3 className="flex space-x-2">
                <span className="text-md inline-flex font-semibold text-almond-600">
                  {data.student_rating}
                </span>
                <div className="ml-1 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        data.student_rating > rating ? 'text-almond-400' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0',
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="inline-flex text-xs dark:text-dark-txt-secondary text-gray-400">
                  ({data.student_rating_no})
                </span>
              </h3>
            </div>
            <div className="ml-4  flex-shrink-0">
              <div className="flex gap-x-2" />
            </div>
          </div>
          <div className="absolute bottom-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <p className="inline-flex text-xs dark:text-dark-txt-secondary text-gray-500">
              {data.total_duration} total hours &middot; {data.total_lectures} lectures &middot;{' '}
              {data.level}
            </p>
            <div className="ml-4  flex-shrink-0">
              <div className="flex gap-x-2" />
            </div>
          </div>
          <div className="absolute bottom-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            {data.best_seller ? (
              <span className="relative inline-flex items-center bg-[#eceb98] px-2.5 py-0.5 text-xs font-bold text-[#314d22]">
                Bestseller
              </span>
            ) : (
              <div />
            )}
            <div className="ml-4  flex-shrink-0">
              <div className="flex gap-x-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
