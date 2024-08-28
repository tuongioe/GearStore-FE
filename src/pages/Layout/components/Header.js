import React from 'react';
import ThemeToggle from '../../../components/ThemeToggle';
import Dropdown from '../../../components/Dropdown';
import ActionDropdown from './ActionDropdown';
import { useState, useEffect } from 'react';
import * as ROUTES from '../../../constants/routes';
import { Link, NavLink } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';
import getAuthToken from '../../../services/getToken';
import SearchDropdown from '../../../components/SearchDropdown';
import useDebounce from '../../../hooks/useDebounce';

const Header = () => {
  const token = getAuthToken();
  const [searchIsVisible, setSearchIsVisible] = useState(false);
  const [sideBarIsVisible, setSideBarIsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchValueDebounce = useDebounce(searchValue, 1000);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  // const docEl = document.documentElement;
  // const [isEnabled, setIsEnabled] = useState(docEl.classList.contains('dark'));
  const [isEnabled, setIsEnabled] = useState(localStorage.getItem('dark'));
  return (
    <header className=" bg-header-bg dark:bg-dark-header-bg fixed top-0 left-0 right-0 z-50 select-none">
      <div className="relative container flex items-center py-[30px] md:justify-between lg:py-[16px]">
        {/* More */}
        <button
          className="icon hidden lg:block mr-[30px] md:mr-0"
          onClick={() => {
            setSideBarIsVisible(true);
          }}
        >
          <img src="/icon/more.svg" alt="" />
        </button>
        {/* Logo */}

        <Link
          href={ROUTES.HOME}
          className=" flex items-center justify-between select-none"
        >
          <figure className="flex items-center gap-[10px] ">
            <img
              className="w-[50px] h-[50px]  object-cover"
              src="/image/logo.png"
              alt=""
            />
          </figure>
        </Link>

        {/* Navbar */}
        <nav
          className={
            'lg:overflow-auto transition-transform duration-500  ml-[129px] lg:fixed md:right-1/2 lg:right-1/2 lg:top-0 lg:bottom-0 lg:left-0 lg:ml-0 lg:bg-dropdown lg:dark:bg-dark-dropdown-bg lg:z-30 lg:p-[20px]' +
            (sideBarIsVisible ? ' lg:translate-x-0' : ' lg:translate-x-[-100%]')
          }
        >
          <ThemeToggle
            className="hidden md:inline-block md:mx-auto"
            isEnabled={isEnabled}
            setIsEnabled={setIsEnabled}
          />
          <button
            onClick={() => {
              setSideBarIsVisible(false);
            }}
            className="icon hidden lg:block"
          >
            <img src="/icon/arrow-left.svg" alt="" />
          </button>

          <ul className="flex items-center font-medium text-2xl lg:flex-col lg:items-start lg:mt-[20px]">
            <Link to={ROUTES.CART} className="block w-full">
              <li className="hidden lg:flex h-[50px] px-[15px] items-center gap-[6px] cursor-pointer lg:px-0 justify-between w-full">
                <div className="flex items-center gap-[16px]">
                  <img src="/icon/cart.svg" alt="" className="icon" />
                  <a href="#!">Cart</a>
                </div>
                <span>{cart.products.length}</span>
              </li>
            </Link>

            <li className="flex h-[50px] px-[15px] items-center gap-[6px] cursor-pointer lg:px-0 lg:w-full">
              <Link to="./keyboard">Keyboard</Link>
            </li>
            <li className="flex h-[50px] px-[15px] items-center gap-[6px] cursor-pointer lg:px-0 lg:w-full">
              <Link to="./mouse">Mouse</Link>
            </li>
            <li className="flex h-[50px] px-[15px] items-center gap-[6px] cursor-pointer lg:px-0 lg:w-full">
              <Link to="./headphone">Headphone</Link>
            </li>
            {/* <li className="group flex px-[15px] cursor-pointer lg:px-0 lg:flex lg:flex-col lg:w-full lg:gap-10">
              <div className="flex h-[50px] items-center lg:w-full lg:justify-between gap-[6px] lg:">
                <a href="#!">Menu</a>
                <img src="/icon/arrow-down.svg" alt="" className="icon" />
              </div>
              <Dropdown />
            </li> */}
          </ul>
        </nav>
        <div
          className={
            'opacity-0 invisible transition-opacity transition-visibility duration-500 lg:fixed inset-0 lg:bg-[rgba(0,0,0,0.4)] lg:z-20' +
            (sideBarIsVisible ? ' lg:opacity-100 lg:visible' : '')
          }
        ></div>

        <div className="ml-auto flex items-center gap-[20px] md:ml-0 md:gap-0 ">
          <div className="relative flex items-center cursor-pointer bg-top-act-group dark:bg-dark-top-act-group p-[13px]  rounded-lg text-2xl font-medium shadow-[0px_20px_60px_10px_rgba(237,237,246,0.20)] dark:shadow-[0px_20px_60px_10px_rgba(0,0,0,0.20)] md:hidden">
            {searchIsVisible && (
              <div className="lg:max-w-[140px]">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Search"
                />
              </div>
            )}
            <img
              src="/icon/search.svg"
              alt=""
              className="icon "
              onClick={() => {
                setSearchIsVisible((prevState) => !prevState);
              }}
            />
            {searchIsVisible && (
              <SearchDropdown searchTerm={searchValueDebounce} />
            )}
          </div>
          <div className="relative group flex items-center  gap-[20px] bg-top-act-group dark:bg-dark-top-act-group px-[20px] py-[10px] rounded-lg text-2xl font-medium shadow-[0px_20px_60px_10px_rgba(237,237,246,0.20)] dark:shadow-[0px_20px_60px_10px_rgba(0,0,0,0.20)] md:hidden">
            <div className="flex items-center gap-[10px] cursor-pointer">
              <img src="/icon/cart.svg" alt="" className="icon" />
              <p className="mt-[3px] w-[80px] text-center">
                ${cart.totalPrice}
              </p>
            </div>
            <ActionDropdown />
          </div>
          {!token && (
            <div className="relative group select-none">
              <figure>
                <img src="/icon/account.svg" className="dark-icon" />
              </figure>
              <div className="hidden  absolute w-[150px] top-[100%]  group-hover:block dark:text-[#B9BABE] right-0 z-30 bg-white dark:bg-dark-dropdown-bg p-[30px] shadow-[0px_40px_90px_20px_rgba(200,200,200,0.40)] dark:shadow-[0px_40px_90px_20px_rgba(23,28,40,0.40)] rounded-3xl md:hidden ">
                <div className="relative ">
                  <img
                    src="/icon/arrow-top.svg"
                    alt=""
                    className="dropdown-arrow absolute top-[-45px] right-[-10px]"
                  />
                  <ul className="text-center">
                    <Link
                      to={ROUTES.LOGIN}
                      className="hover:text-active-sidebar  font-medium "
                    >
                      <li>Login</li>
                    </Link>
                    <div className="w-full h-[1px] bg-login-text my-[10px]"></div>
                    <li>
                      <Link
                        to={ROUTES.SIGNUP}
                        className="hover:text-active-sidebar font-medium"
                      >
                        <li>Sign up</li>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {token && (
            <div className="relative group">
              <figure>
                <img
                  src="/image/avatar.jpg"
                  alt=""
                  className="w-[50px] h-[50px] shadow-[0px_4px_14px_2px_rgba(0,0,0,0.08)] rounded-[8px] select-none"
                />
              </figure>
              <div className="hidden  absolute w-[200px] top-[100%]  group-hover:block dark:text-[#B9BABE] right-0 z-30 bg-white dark:bg-dark-dropdown-bg p-[30px] shadow-[0px_40px_90px_20px_rgba(200,200,200,0.40)] dark:shadow-[0px_40px_90px_20px_rgba(23,28,40,0.40)] rounded-3xl md:hidden ">
                <div className="relative ">
                  <img
                    src="/icon/arrow-top.svg"
                    alt=""
                    className="dropdown-arrow absolute top-[-45px] right-[-10px]"
                  />
                  <ul className="text-center">
                    {user.user.role === 'admin' && (
                      <>
                        <Link
                          to="./admin"
                          className="hover:text-active-sidebar"
                        >
                          <li>Admin Panel</li>
                        </Link>
                        <div className="w-full h-[1px] bg-login-text my-[10px]"></div>
                      </>
                    )}

                    <Link
                      to={ROUTES.PROFILE}
                      className="hover:text-active-sidebar"
                    >
                      <li>Profile</li>
                    </Link>
                    <div className="w-full h-[1px] bg-login-text my-[10px]"></div>
                    <li>
                      <button
                        className="text-[#de1f27] font-medium"
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <ThemeToggle
            className="block md:hidden"
            isEnabled={isEnabled}
            setIsEnabled={setIsEnabled}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
