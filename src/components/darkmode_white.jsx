import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function DarkModeSwitch() {
  // System Theme
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <button
          type="button"
          onClick={() => {
            setTheme('light');
          }}
          className="rounded-full ml-2 md:inline-flex items-center text-yellow-500  ring-none border-none justify-center dark:hover:text-yellow-600 hover:text-purple-500"
        >
          <MoonIcon className="md:h-6 h-5 md:w-6 w-5" aria-hidden="true" />
        </button>
      );
      // eslint-disable-next-line
    } else {
      return (
        <button
          type="button"
          onClick={() => {
            setTheme('dark');
          }}
          className="rounded-full ml-2 md:inline-flex items-center text-gray-200 ring-none border-none  dark:text-dark-txt justify-center dark:hover:text-blue-200 hover:text-blue-300"
        >
          <SunIcon className="md:h-6 h-5 md:w-6 w-5" aria-hidden="true" />
        </button>
      );
    }
  };

  return renderThemeChanger();
}
export default DarkModeSwitch;
