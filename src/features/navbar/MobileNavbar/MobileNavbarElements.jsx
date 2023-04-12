// eslint-disable-next-line
export const Container = ({ children }) => (
  <nav className="bg-white py-[6px] border-b dark:border-dark-second border-gray-300 dark:bg-dark-main shadow-navbar md:hidden block">
    {children}
  </nav>
);
// eslint-disable-next-line
export const Nav = ({ children }) => <nav className="mx-auto max-w-7xl px-2">{children}</nav>;
// eslint-disable-next-line
export const LeftMenu = ({ children }) => (
  <div className="absolute inset-y-0 left-0 flex items-center">{children}</div>
);
// eslint-disable-next-line
export const LeftMenuButton = ({ children }) => (
  <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-gray-500">
    {children}
  </button>
);
// eslint-disable-next-line
export const MiddleMenu = ({ children }) => (
  <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
    {children}
  </div>
);
// eslint-disable-next-line
export const MiddleLogo = ({ children }) => <div className="flex items-center">{children}</div>;
// eslint-disable-next-line
export const RightMenu = ({ children }) => (
  <ul className="absolute inset-y-0 right-0 flex items-center mr-2 space-x-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    {children}
  </ul>
);
