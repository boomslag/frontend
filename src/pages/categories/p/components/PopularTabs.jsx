import React from 'react';
import { Tab } from '@headlessui/react';
// eslint-disable-next-line
import LoadingMoon from '@/components/loaders/LoadingMoon';
import ProductCard from '@/components/ProductCard';
import ProductCardHorizontal from '@/pages/components/products/ProductCardHorizontal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PopularTabs({ productsBySold, products, productsByViews }) {
  return (
    <>
      <div className="mb-4 ">
        <p className="text-2xl font-bold leading-6 text-gray-900 dark:text-dark-txt">
          Products to get you started
        </p>
      </div>

      <div className="w-full max-w-full px-2 py-4 sm:px-0">
        <Tab.Group>
          <Tab.List className=" grid grid-cols-3 space-x-1 p-1 md:grid-cols-12">
            <Tab
              className={({ selected }) =>
                classNames(
                  'col-span-1 w-full py-2.5 text-lg leading-5 md:col-span-2',
                  '',
                  selected
                    ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-bold text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                    : 'flex items-center justify-center border-b-2 border-gray-50 p-1 font-semibold text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
                )
              }
            >
              Popular
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'col-span-1 w-full py-2.5 text-lg leading-5 md:col-span-2',
                  '',
                  selected
                    ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-bold text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                    : 'flex items-center justify-center border-b-2 border-gray-50 p-1 font-semibold text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
                )
              }
            >
              New
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'col-span-1 w-full py-2.5 text-lg leading-5 md:col-span-2',
                  '',
                  selected
                    ? 'flex items-center justify-center space-x-2 border-b-4 border-gray-900 p-1 font-bold text-black focus:outline-none dark:text-dark-txt dark:border-dark-primary'
                    : 'flex items-center justify-center border-b-2 border-gray-50 p-1 font-semibold text-gray-600 hover:border-gray-200 dark:border-dark-third dark:text-dark-txt dark:hover:border-dark-border md:space-x-2',
                )
              }
            >
              Trending
            </Tab>
          </Tab.List>

          <Tab.Panels className="">
            <Tab.Panel className={classNames('rounded-xl  p-3', '')}>
              {productsBySold ? (
                <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                  <div className="relative inline-flex  rounded-md p-3 ">
                    {productsBySold.map((data) => (
                      <div key={data.id} className="group relative">
                        <ProductCardHorizontal key={data.id} data={data} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <LoadingMoon size={20} color="#1c1d1f" />
              )}
            </Tab.Panel>
            <Tab.Panel className={classNames('rounded-xl  p-3', '')}>
              {products ? (
                <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                  <div className="relative inline-flex  rounded-md p-3 ">
                    {products.map((data) => (
                      <div key={data.id} className="group relative">
                        <ProductCardHorizontal key={data.id} data={data} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <LoadingMoon size={20} color="#1c1d1f" />
              )}
            </Tab.Panel>
            <Tab.Panel className={classNames('rounded-xl  p-3', '')}>
              {productsByViews ? (
                <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                  <div className="relative inline-flex  rounded-md p-3 ">
                    {productsByViews.map((data) => (
                      <div key={data.id} className="group relative">
                        <ProductCardHorizontal key={data.id} data={data} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <LoadingMoon size={20} color="#1c1d1f" />
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
