import React, { useState } from 'react';
import { Cog6ToothIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { CSSTransition } from 'react-transition-group';
import DropDown from '../DropDown';
import DropDownItem from '../DropDownItem';
import NavItem from '../NavItem';
import Image from 'next/image';

export default function ProfileDropdown({ myProfile }) {
  const [activeMenu, setActiveMenu] = useState('main');

  return (
    <NavItem
    // icon={
    //   <Image
    //     className="inline-flex h-8  w-8 rounded-full object-cover text-gray-600 dark:text-white"
    //     src={myProfile && myProfile.picture}
    //     alt=""
    //     width={256}
    //     height={256}
    //   />
    // }
    >
      <DropDown>
        <CSSTransition
          in={activeMenu === 'main'}
          unmountOnExit
          timeout={500}
          classNames="menu-primary"
        >
          <div className="menu">
            <DropDownItem setActiveMenu={setActiveMenu}>Profile</DropDownItem>
            <DropDownItem
              goToMenu="settings"
              setActiveMenu={setActiveMenu}
              leftIcon={<Cog6ToothIcon className="h-5 w-5 text-white" />}
              rightIcon={<ChevronRightIcon className="h-5 w-5 text-white" />}
            >
              Settings
            </DropDownItem>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'settings'}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
        >
          <div className="menu">
            <DropDownItem goToMenu="main" setActiveMenu={setActiveMenu}>
              Return
            </DropDownItem>
            <DropDownItem
              setActiveMenu={setActiveMenu}
              leftIcon={<Cog6ToothIcon className="h-5 w-5 text-white" />}
              rightIcon={<ChevronRightIcon className="h-5 w-5 text-white" />}
            >
              Item 1
            </DropDownItem>
          </div>
        </CSSTransition>
      </DropDown>
    </NavItem>
  );
}
