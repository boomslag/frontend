import React, { useState, useEffect } from 'react';
import slugify from 'react-slugify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Logo,
  LogoContainer,
  SearchContainer,
  RightMenuContainer,
  NavbarLink,
  Header,
  Container,
} from './DesktopNavbarElements';
import NavSearchBar from './NavSearchBar';
import LogoImg from '@/components/LogoImg';
import GuestLinks from './GuestLinks';
import AuthLinks from './AuthLinks';
import FetchPrimaryCategories from '@/api/GetPrimaryCategories';
import AnimatedTippy from '@/components/tooltip';

export default function DesktopNavbar({
  isAuthenticated,
  myUser,
  myProfile,
  wallet,
  cartItems,
  cartTotalItems,
  setOpenI18n,
}) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await FetchPrimaryCategories();
      setCategories(res.data.results);
    };
    fetchCategories();
  }, []);

  return (
    <Container>
      <Header>
        <LogoContainer>
          <Logo>
            <Link href="/">
              <LogoImg />
            </Link>
          </Logo>
        </LogoContainer>
        <NavbarLink>
          <Link
            className={`${
              router.pathname === '/marketplace' ? 'text-iris-500 dark:text-dark-primary' : ''
            }`}
            href="/marketplace"
          >
            Market
          </Link>
        </NavbarLink>
        <SearchContainer>
          <NavSearchBar />
        </SearchContainer>
        <RightMenuContainer>
          <NavbarLink>
            <Link
              className={`${
                router.pathname === '/games' ? 'text-iris-500 dark:text-dark-primary' : ''
              }`}
              href="/games"
            >
              Games
            </Link>
          </NavbarLink>

          <NavbarLink>
            <Link
              className={`${
                router.pathname === '/products' ? 'text-iris-500 dark:text-dark-primary' : ''
              }`}
              href="/products"
            >
              Products
            </Link>
          </NavbarLink>
          <AnimatedTippy
            offsetY={23}
            content={
              <div className="w-72 dark:bg-dark-second shadow bg-white space-y-2 justify-center rounded-2xl py-2 text-center text-lg font-medium leading-6 ">
                <div className="flex flex-wrap justify-center gap-2 px-4">
                  <div className="my-2 cursor-default select-none">Categories:</div>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/c/${slugify(category)}`}
                      className="my-2 dark:hover:text-dark-primary hover:text-iris-500 cursor-pointer"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            }
          >
            <div className="hidden lg:inline-flex items-center mr-1 px-1  text-base font-medium text-gray-900 dark:text-dark-txt  hover:text-iris-500">
              <Link
                className={`${
                  router.pathname === '/courses' ? 'text-iris-500 dark:text-dark-primary' : ''
                }`}
                href="/courses"
              >
                Courses
              </Link>
            </div>
          </AnimatedTippy>
          {isAuthenticated ? (
            <AuthLinks
              myUser={myUser}
              wallet={wallet}
              isAuthenticated={isAuthenticated}
              cart_total_items={cartTotalItems}
              setOpenI18n={setOpenI18n}
              cartItems={cartItems}
              myProfile={myProfile}
            />
          ) : (
            <GuestLinks
              isAuthenticated={isAuthenticated}
              cartTotalItems={cartTotalItems}
              setOpenI18n={setOpenI18n}
              cartItems={cartItems}
            />
          )}
        </RightMenuContainer>
      </Header>
    </Container>
  );
}
