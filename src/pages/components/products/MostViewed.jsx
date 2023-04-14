import React from 'react';
import ProductCard from './ProductCard';

export default function MostViewedProducts({ products }) {
  return (
    <div className="relative mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8 ">
      {/* Heading */}
      <div className=" ">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4">
            <h3 className="font-recife-bold text-3xl tracking-tight text-gray-900 dark:text-dark-txt">
              Most Viewed Products
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        {products && products.map((product) => <ProductCard key={product.id} data={product} />)}
      </div>
    </div>
  );
}
