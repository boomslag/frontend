import React from 'react';
// eslint-disable-next-line
import LoadingMoon from '@/components/loaders/LoadingMoon';
import CourseCardHorizontal from '@/components/CourseCardHorizontal';

export default function FeaturedCourses({ data }) {
  return (
    <div>
      <div className="mb-4 ">
        <p className="text-2xl font-bold leading-6 text-gray-900 dark:text-dark-txt">
          Featured courses
        </p>
      </div>

      {data ? (
        data.map((course, index) => (
          <CourseCardHorizontal key={course.id} index={index} data={course} />
        ))
      ) : (
        <LoadingMoon size={20} color="#1c1d1f" />
      )}
    </div>
  );
}
