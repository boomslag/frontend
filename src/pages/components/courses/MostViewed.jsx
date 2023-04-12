import React from 'react';
import CourseCard from './CourseCard';

export default function MostViewed({ courses }) {
  return (
    <div className="relative mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8 ">
      {/* Heading */}
      <div className=" ">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4">
            <h3 className="font-recife-bold text-3xl tracking-tight text-gray-900 dark:text-dark-txt">
              Students are viewing
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        {courses && courses.map((course) => <CourseCard key={course.id} data={course} />)}
      </div>
    </div>
  );
}
