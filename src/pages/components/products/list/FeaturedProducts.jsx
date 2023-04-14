import React from 'react';
// eslint-disable-next-line
import LoadingMoon from '@/components/loaders/LoadingMoon';
import ProductCardHorizontal from '../ProductCardHorizontal';

export default function FeaturedProducts({ data }) {
  return (
    <div>
      <div className="mb-4 ">
        <p className="text-2xl font-bold leading-6 text-gray-900 dark:text-dark-txt">
          Featured products
        </p>
      </div>

      {data ? (
        data.map((course, index) => (
          <ProductCardHorizontal key={course.id} index={index} data={course} />
        ))
      ) : (
        <LoadingMoon size={20} color="#1c1d1f" />
      )}
    </div>
  );
}
