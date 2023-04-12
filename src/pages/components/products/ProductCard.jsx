import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import UpdateProductClicks from '@/api/products/UpdateClicks';

export default function ProductCard({ data }) {
  let {
    id,
    slug,
    images,
    title,
    category,
    rating,
    rating_no,
    short_description,
    discount,
    price,
    compare_price,
    shipping,
    best_seller,
  } = data;

  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleUpdateClicks = () => {
    UpdateProductClicks(data && id);
  };

  const current = new Date();
  const deliveryDays = new Date(current.setDate(current.getDate() + Number(shipping[0].time)));

  if (data && data.weights && data.weights.length > 0) {
    price = data.weights[0].price;
  }

  return (
    <div className="flex justify-center">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto w-full flex-col space-y-0.5 border-2 border-dark-bg dark:border-dark-border dark:bg-dark-bg bg-white dark:shadow-none shadow-neubrutalism-md transition duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neubrutalism-xl"
      >
        {/* Image */}
        <Link
          onClick={() => {
            handleUpdateClicks();
          }}
          href={`/product/${slug}`}
          className="relative grid w-full place-items-center "
        >
          <img
            id={`img-shadow${id}`}
            src={images[0]}
            alt={title.length > 46 ? title.slice(0, 45) : title}
            className="object-cover"
          />
          <div
            id={`img-shadow${id}`}
            className="bg-gray-350 absolute inset-0 mix-blend-multiply"
            aria-hidden={true}
          />
        </Link>
        <div className="flex  w-full flex-col space-y-1  p-3">
          {/* Badges */}
          <div className="item-center -mt-1 flex justify-between">
            <Link
              href={`/categories/p/${category.slug}`}
              className="hidden font-medium dark:text-dark-txt-secondary text-gray-500 hover:underline hover:underline-offset-2 md:block"
            >
              {category.name}
            </Link>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-almond-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>

              <p className="ml-1 select-none text-sm font-bold dark:text-dark-txt-secondary text-gray-600">
                {rating}
                <span className="font-normal text-gray-500 dark:text-dark-txt">
                  {' '}
                  ({rating_no} reviews)
                </span>
              </p>
            </div>
          </div>
          {/* Description */}
          <Link
            onClick={() => {
              handleUpdateClicks();
            }}
            href={`/product/${slug}`}
            className={`text-md justify-start text-left font-bold  ${
              hover ? 'text-iris-500 dark:text-dark-primary' : 'text-gray-800 dark:text-dark-txt'
            }`}
          >
            {title}
          </Link>
          <p className="select-none justify-start text-left text-base dark:text-dark-txt-secondary text-gray-500">
            {short_description && short_description.length > 46
              ? short_description.slice(0, 60)
              : short_description}
          </p>
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4">
              <div className="select-none text-sm font-bold dark:text-dark-txt text-gray-800">
                <div className="">
                  {discount ? (
                    <p className="mt-2 text-gray-800 dark:text-dark-txt">
                      {' '}
                      <strong>${price}</strong> /{' '}
                      <span className="line-through">{compare_price}</span>
                      <span className="font-base"> + ${shipping[0].price} Shipping</span>
                    </p>
                  ) : (
                    <p className="mt-2 text-gray-800 dark:text-dark-txt">
                      <strong>
                        ${price}
                        <span className="font-base"> + ${shipping[0].price} Shipping</span>
                      </strong>
                    </p>
                  )}
                </div>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                {discount && (
                  <p className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                    {parseInt(((compare_price - price) / compare_price) * 100, 10)}% Off
                  </p>
                )}
              </div>
            </div>
            <div className="ml-4  flex-shrink-0">
              <div className="flex gap-x-2">
                {best_seller ? (
                  <div className="inline-flex rounded-full bg-almond-200 px-3 py-1 text-xs font-medium text-almond-800  ">
                    Bestseller
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
