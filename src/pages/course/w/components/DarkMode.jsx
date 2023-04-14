import { Switch } from '@headlessui/react';
import React, { useState } from 'react';
import useDarkMode from '@/hooks/useDarkMode';

function DarkModeSwitch() {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const [enabled, setEnabled] = useState(darkTheme);
  const ThemeIcon = () => {
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
      <span onClick={handleMode}>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? 'bg-dark-bg' : 'bg-dark-bg'}
              relative inline-flex h-[36px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-500 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                pointer-events-none inline-block h-[32px] w-[34px] transform rounded-full bg-dark-third shadow-lg ring-0 transition duration-200 ease-in-out`}
          >
            {darkTheme ? (
              <>
                <i className="bx bx-sun mt-1.5 inline-flex text-xl font-black text-almond-700 dark:hover:text-almond-700" />
              </>
            ) : (
              <i className="bx bx-moon mt-1.5 inline-flex text-xl font-black text-gray-400"></i>
            )}
          </span>
        </Switch>
      </span>
    );
  };

  return ThemeIcon();
}
export default DarkModeSwitch;
