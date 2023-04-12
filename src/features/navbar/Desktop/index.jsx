import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoImg from '@/components/LogoImg';
import {
  Logo,
  LogoContainer,
  SearchContainer,
  RightMenuContainer,
  NavbarLink,
  Header,
  Container,
} from './Elements';
import AnimatedTippy from '@/components/tooltip';
import AuthLinks from '../Auth';
import GuestLinks from '../Guest';
import { useSelector } from 'react-redux';

export default function DesktopNavbar() {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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
        <SearchContainer>Search Bar</SearchContainer>
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
                  Category 1
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
          {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
        </RightMenuContainer>
      </Header>
    </Container>
  );
}
