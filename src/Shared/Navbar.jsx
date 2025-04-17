import { FiLogIn } from 'react-icons/fi';
import { Link, Links, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import bd from '../assets/logo/bd.png';
import uk from '../assets/logo/uk.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CountDown from '../EidFeatures/CountDown';
import { useCart } from '../Hooks/useCart';
import useNotification from '../Hooks/useNotification';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useUserData from '../Hooks/useUserData';

const Navbar = () => {
  const [notificationData, refetch] = useNotification();
  const { user, LogoutUser, isNotificationOpen, setIsNotificationOpen } =
    useAuth();
  const [userData] = useUserData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();


  const { cart } = useCart();
  const handleLogOut = () => {
    LogoutUser();
    navigate('/');
  };

  // for MultiLaguge
  const [lang, setLang] = useState(true);
  const { t, i18n } = useTranslation();
  const changeLanguage = async language => {
    setLang(!lang);
    // localStorage.setItem("lang", language);
    await i18n.changeLanguage(language);
  };

  const links = (
    <>
      <li className='mx-1'>
        <NavLink to={'/'}>{t('navMenu.menu1')}</NavLink>
      </li>
      <li className='mx-1'>
        <NavLink to={'/all-food'}>{t('navMenu.menu2')}</NavLink>
      </li>
      <li className='mx-1'>
        <NavLink to={'/gallery'}>{t('navMenu.menu3')}</NavLink>
      </li>
      <li className='mx-1'>
        <NavLink to={'/contact'}>{t('navMenu.menu4')}</NavLink>
      </li>
    </>
  );

  const handleClearNotification = async email => {
    await axiosPublic.delete(`/api/delete-notification/${email}`);
    refetch();
  };
  return (
    <div className="bg-base-100 shadow-2xl z-50">
      <div className="navbar container w-full mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
              <div className="cursor-pointer  ">
                {lang && (
                  <div onClick={() => changeLanguage("bn")} className="flex items-center mx-2 text-sm gap-2  ">
                    Language<img src={uk} alt="" className="w-9 h-9 rounded-full object-center bg-cover" />
                  </div>
                )}
                {!lang && (
                  <div onClick={() => changeLanguage("en")} className="flex items-center mx-2 text-sm gap-2  ">
                    Language<img src={bd} alt="" className="w-9 h-9 rounded-full object-center bg-cover" />
                  </div>
                )}
              </div>
            </ul>
          </div>
          <a className="text-xl">TastyRide</a>
        </div>
        <div className="hidden md:flex navbar-center mx-auto ">
          <CountDown />
        </div>

        <div className="flex-none navbar-end space-x-4 ">
          <div className=" navbar-end ">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {
              user && (
                <div className="flex">
                  <div className="dropdown dropdown-end ">
                    <Link to={"/cart"}>
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                      >
                        <div className="indicator">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            {" "}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />{" "}
                          </svg>
                          <span className="badge badge-sm indicator-item">{cart?.length}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <button className="btn btn-ghost btn-circle ">
                    {/* Notification Icon */}
                    <div className="relative">
                      <button
                        className="btn btn-ghost btn-circle"
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)} // Toggle dropdown
                      >
                        <div className="indicator">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                          <span className="badge badge-xs badge- indicator-item">
                            {notificationData?.length || 0}
                          </span>
                        </div>
                      </button>

                      {/* Notification Dropdown */}
                      {isNotificationOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50">
                          <div className="p-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-left">Notifications</h3>
                            <button onClick={() => handleClearNotification(user?.email)}
                              className="btn btn-sm">clear all</button>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {notificationData?.length > 0 ? (
                              notificationData.map((notification) => (
                                <div
                                  key={notification._id}
                                  className="p-4 border-b hover:bg-gray-100"
                                >
                                  <h4 className="font-medium">{notification.title}</h4>
                                  <p className="text-sm text-gray-600">
                                    {notification.type.replace("_", " ")}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 text-center text-gray-500">
                                No notifications
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              )
            }
            {/* user Login& Logout */}
            {user ? (
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="loading" src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow "
                >
                  <li>
                    <NavLink to={'/userProfile'} className="justify-between">
                      {t('userMenu.profile')}
                      <span className="badge">{t('userMenu.span1')}</span>
                    </NavLink>
                  </li>
                  {
                    userData?.role === 'customer' && (
                      <>
                        <li><NavLink to={"/my-order"}>{t("userMenu.My Order")}</NavLink></li>
                        <li><NavLink to={"/restaurant-register-form"}>{t("userMenu.Apply for Restaurant")}</NavLink></li>
                        <li><NavLink to={"/rider-register-form"}>{t("userMenu.Apply for Rider")}</NavLink></li>

                      </>
                    )}
                  {
                    userData?.role === 'admin' && (

                      <li><NavLink to={"/dashboard/admin"}>{t("userMenu.Dashboard")}</NavLink></li>
                    )
                  }
                  {
                    userData?.role === 'restaurant' && (

                      <li><NavLink to={"/dashboard/restaurantDashboard"}>{t("userMenu.Dashboard")}</NavLink></li>
                    )
                  }
                  {
                    userData?.role === 'rider' && (

                      <li><NavLink to={"/dashboard/rider-dashboard"}>{t("userMenu.Dashboard")}</NavLink></li>
                    )
                  }
                  <li>
                    <button onClick={handleLogOut}>
                      {t('userMenu.Logout')}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="px-4">
                <Link to={'/login'}>
                  <button className="border px-5 py-3 cursor-pointer flex items-center gap-2 bg-red-500 border-none text-white">
                    <span>
                      <FiLogIn />
                    </span>{' '}
                    {t('userMenu.Login')}
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* langues Menu */}
          <div className="cursor-pointer hidden md:flex ">
            {lang && (
              <div onClick={() => changeLanguage('bn')} className="">
                <img src={uk} alt="" className="w-12 h-12 rounded-full" />
              </div>
            )}
            {!lang && (
              <div onClick={() => changeLanguage('en')} className="">
                <img src={bd} alt="" className="w-12 h-12 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
