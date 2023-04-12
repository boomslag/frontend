import { StarIcon } from '@heroicons/react/20/solid';
import DOMPurify from 'dompurify';
import React from 'react';
import slugify from 'react-slugify';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
// import moment from 'moment'
// import { useSelector } from 'react-redux'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CourseCardHorizontalSearch({ data }) {
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // const user = useSelector(state => state.auth.user)
  // const my_follows = useSelector(state => state.tier.my_follows)
  // const details = useSelector(state => state.courses.details)
  // const courses = useSelector(state => state.courses.wishlist)
  // const paid_courses_library = useSelector(state => state.courses.paid_courses_library)
  // const cart_items = useSelector(state => state.cart.items)
  // const total_price = useSelector(state => state.coupons.price)

  // const [showShadow, setShowShadow]=useState(false)
  // const [loadingWishlist, setLoadingWishlist] = useState(false)
  // const [cartLoading, setCartLoading] = useState(false)

  const handleImageShowShadow = () => {
    const imageShadow = document.getElementById(`img-shadow${data.id}`);
    imageShadow.classList.add('bg-gray-350');
  };
  const handleImageRemoveShadow = () => {
    const imageShadow = document.getElementById(`img-shadow${data.id}`);
    imageShadow.classList.remove('bg-gray-350');
  };

  return (
    <Tippy
      animation="scale"
      theme="light"
      interactive
      placement="top"
      duration={[75, 50]}
      offset={[0, 10]}
      className="hidden md:flex"
      content={
        <div className="relative w-96 space-y-2 p-4">
          <p className="text-lg font-semibold  text-gray-900">What you&apos;ll learn</p>
          <ul className="list-disc space-y-1 py-1 px-4 text-base text-gray-700">
            {data.get_whatlearnt.map((whatlearnt) => (
              <li key={whatlearnt.id}>{whatlearnt.title}</li>
            ))}
          </ul>
          {/* Cart */}
          <p>Cart HEre</p>
          {/* {
                    cartLoading === false && isAuthenticated && paid_courses_library && paid_courses_library[0].courses.some(u=>u.course_uuid.includes(details && details.course_uuid)) ||
                    details && details.author.email === (user && user.email) ||
                    my_follows && my_follows.some(u=>u.tier.name)===(details&&details.tiers&&details.tiers.some(u=>u.name)) ||
                    details && details.payment === "free" ?
                    <Link
                        href={`/courses/study/${details.course_uuid}`}
                        className="col-span-4 w-[300px] mt-2 justify-center font-bold inline-flex items-center px-3 py-4 border border-transparent text-md leading-4  shadow-sm text-white bg-black hover:bg-gray-900"
                    >
                        Watch Course
                    </Link>
                    :cart_items&&cart_items.some(u=>(u.course)) && cart_items.some(u=>(u.course.course_uuid.includes(details&&details.course_uuid))) ?
                    <Link
                        href={`/cart`}
                        className="col-span-3 w-[300px] mt-2 justify-center font-bold inline-flex items-center px-3 py-4 text-md leading-4  transition duration-300 ease-in-out shadow-sm hover:shadow-button text-white hover:text-purple-100 bg-morado hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300"
                    >
                        Go to cart
                    </Link>
                    : cartLoading === false  && isAuthenticated?
                    <button
                    onClick={(e)=>{handleAddToCart(e)}}
                    className="col-span-3 w-[300px] mt-2 justify-center font-bold inline-flex items-center px-3 py-4 text-md leading-4  transition duration-300 ease-in-out shadow-sm hover:shadow-button text-white hover:text-purple-100 bg-morado hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300">
                        Add to cart
                    </button>
                    : cartLoading === true  && isAuthenticated?
                    <div
                    className="cursor-default col-span-3 w-full mt-2 justify-center font-bold inline-flex items-center px-3 py-4 text-md leading-4  transition duration-300 ease-in-out shadow-sm hover:text-purple-600 hover:bg-purple-100 text-purple-700 bg-purple-200  ">
                        <CircleLoader loading={cartLoading} size={20} color="#ffffff"/>
                    </div>
                    :
                    <>
                    <button
                    onClick={(e)=>{handleAddToCart(e)}}
                    className="col-span-4 w-[300px] mt-1 mr-4 justify-center font-bold inline-flex items-center px-3 py-4 border border-purple-100 bg-morado hover:bg-purple-800 text-white hover:text-purple-50 hover:border-purple-200 border-transparent text-md leading-4">
                        Add to cart
                    </button>
                    </>
                } */}
        </div>
      }
    >
      <Link
        href={`/course/${slugify(data.slug)}`}
        onMouseEnter={handleImageShowShadow}
        onMouseLeave={handleImageRemoveShadow}
        className="flex flex-col justify-center "
      >
        <div className="relative mx-auto flex max-w-xs flex-col space-y-3 border border-white bg-white transition  duration-100 ease-in-out md:max-w-full md:flex-row md:space-x-5 md:space-y-0">
          <div className="relative grid w-full place-items-center bg-gray-50 md:w-5/12">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt={data.title.length > 46 ? data.title.slice(0, 45) : data.title}
              className="h-full object-cover"
            />

            <div
              id={`img-shadow${data.id}`}
              className="bg-gray-350 absolute inset-0 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>
          <div className="flex  w-full flex-col bg-white  ">
            <div className="item-center flex justify-between">
              <p className="text-md font-bold  text-gray-800">
                {data.title.length > 60 ? data.title.slice(0, 59) : data.title}
              </p>

              <div className="flex items-center">
                <p className="text-md select-none font-bold text-gray-800">
                  ${parseFloat(data.price)}
                  {/* <span className="font-normal text-gray-600 text-base">/night</span> */}
                </p>
              </div>
            </div>
            <div className="item-center flex justify-between">
              <p
                className=" select-none text-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data && data.short_description),
                }}
              />

              <div className="flex items-center">
                {data.compare_price && (
                  <p className="text-md select-none font-bold text-gray-800">
                    ${parseFloat(data.price)}
                    {/* <span className="font-normal text-gray-600 text-base">/night</span> */}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-1 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="">
                <p className="text-xs text-gray-500">{data.author.username}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="flex gap-x-2" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="">
                <h3 className="flex space-x-2">
                  <span className="text-yellow-600 text-md inline-flex font-semibold">
                    {data.student_rating}
                  </span>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          data.student_rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0',
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="inline-flex text-xs text-gray-400 dark:text-dark-txt">
                    ({data.student_rating_no})
                  </span>
                </h3>
              </div>
              <div className="ml-4  flex-shrink-0">
                <div className="flex gap-x-2" />
              </div>
            </div>
            <div className="mt-1 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <p className="inline-flex text-xs text-gray-500">
                {data.total_duration} total hours &middot; {data.total_lectures} lectures &middot;{' '}
                {data.level}
              </p>
              <div className="ml-4  flex-shrink-0">
                <div className="flex gap-x-2" />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              {data.best_seller && (
                <span className="relative inline-flex items-center bg-[#eceb98] px-2.5 py-0.5 text-xs font-bold text-[#314d22]">
                  Bestseller
                </span>
              )}
              <div className="ml-4  flex-shrink-0">
                <div className="flex gap-x-2" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Tippy>
  );
}
