import React, { useRef } from 'react';

import moment from 'moment';
import { useRouter } from 'next/router';
import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductCardHorizontal({ data, index }) {
  const router = useRouter();
  const titleRef = useRef(null);

  return (
    <button
      type="button"
      onClick={() => {
        router.push(`/sell/products/manage/goals/${data.id}`);
      }}
      onMouseEnter={() => {
        if (titleRef.current) {
          titleRef.current.classList.add('text-purple-500');
          titleRef.current.classList.add('dark:text-dark-primary');
        }
      }}
      onMouseLeave={() => {
        if (titleRef.current) {
          titleRef.current.classList.remove('text-purple-500');
          titleRef.current.classList.remove('dark:text-dark-primary');
        }
      }}
      className="w-full max-w-full border dark:bg-dark-main dark:border-dark-border bg-white transition  duration-300 ease-in-out hover:shadow lg:flex"
    >
      {data.images.length !== 0 ? (
        <img
          src={data.images[0]}
          alt="img"
          className="h-auto w-full flex-none bg-cover object-cover lg:w-40"
        />
      ) : (
        <img
          src="/assets/img/placeholder/course.jpg"
          alt="img"
          className="h-auto w-full flex-none bg-cover object-cover lg:w-40"
        />
      )}
      <div className="flex h-full w-full flex-col justify-between p-4 text-left leading-normal">
        <div className="">
          <div>
            {data.title ? (
              <div ref={titleRef} id={`title${index}-${data.id}`} className="text-xl font-bold ">
                {data.title.length > 80 ? data.title.slice(0, 79) : data.title}
              </div>
            ) : (
              <div
                ref={titleRef}
                id={`title${index}-${data.id}`}
                className="bg-gray-50 py-3 text-xl font-bold "
              />
            )}
          </div>
        </div>
        <div className=" flex items-center">
          <div className="my-1 flex text-base text-almond-600">
            <span className="inline-flex text-base font-semibold text-almond-600">
              {data.rating}
            </span>
            <div className="ml-1 flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    data.rating > rating ? 'text-almond-400' : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0',
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="ml-1 inline-flex text-base text-gray-400 dark:text-dark-txt">
              ({data.rating_no})
            </span>
          </div>
        </div>
        <div className="w-full max-w-full  lg:flex">
          <div className="align-self-end flex items-center gap-x-4">
            <div className="text-sm">
              <span className=" mx-2 text-sm font-medium dark:text-dark-txt-secondary text-gray-800">
                $ {data.price}
              </span>{' '}
              <span className="text-gray-300">&middot;</span>
              <span className=" ml-2 mr-1 text-sm font-medium dark:text-dark-txt-secondary text-gray-800">
                {moment(data.published).format('LL')}
              </span>
            </div>
            <p className="text-grey-dark flex items-center text-sm ">
              <span
                className={`${
                  data.status === 'published'
                    ? 'bg-mughal-green-100 text-mughal-green-700'
                    : 'bg-gray-100 text-gray-700 '
                } mr-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium `}
              >
                {data.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </p>
          </div>
        </div>
        {data.status === 'draft' && (
          <div className="position-relative relative mt-2 h-6 w-full rounded-full">
            <div
              style={{ width: `${(data.progress / 15) * 100}%` }}
              className="absolute  h-6 rounded-full bg-forest-green-300 transition duration-300 ease-in-out"
            />

            <div className="absolute h-6 w-full rounded-full bg-gray-300 opacity-20" />
            <div className="top-50 absolute left-0 mt-1 w-full text-center text-xs text-dark">
              {data.progress} / {15} completed
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
