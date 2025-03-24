import { FiLogIn } from "react-icons/fi";
import { Link, Links, NavLink, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import bd from "../assets/logo/bd.png";
import uk from "../assets/logo/uk.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { user, LogoutUser } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    LogoutUser();
    navigate("/");
  };

  // for MultiLaguge
  const [lang, setLang] = useState(true);
  const { t, i18n } = useTranslation();
  const changeLanguage = async (language) => {
    setLang(!lang);
    // localStorage.setItem("lang", language);
    await i18n.changeLanguage(language);
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>{t('navMenu.menu1')}</NavLink>
      </li>
      <li>
        <NavLink to={"/all-food"}>{t('navMenu.menu2')}</NavLink>
      </li>
      <li>
        <NavLink to={"/gallery"}>{t('navMenu.menu3')}</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>{t('navMenu.menu4')}</NavLink>
      </li>
    </>
  );
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">TastyRide</a>
        </div>

        <div className="flex-none navbar-end">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="dropdown dropdown-end">
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
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
          </div>
          {/* user Login& Logout */}
          {user ? (
            <div className="dropdown dropdown-end">
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
                  <Link to={'/userProfile'} className="justify-between">
                    {t('userMenu.profile')}
                    <span className="badge">{t('userMenu.span1')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">{t('userMenu.Dashboard')}</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>{t('userMenu.Logout')}</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="px-4">
              <Link to={"/login"}>
                <button className="border px-4 py-1 cursor-pointer flex items-center gap-2 rounded-md">
                  <span>
                    <FiLogIn />
                  </span>{" "}
                  {t('userMenu.Login')}
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* langues Menu */}
        <div className="cursor-pointer">
          {lang && (
            <div onClick={() => changeLanguage("bn")} className="">
              <img src={uk} alt="" className="w-12 h-12 rounded-full" />
            </div>
          )}
          {!lang && (
            <div onClick={() => changeLanguage("en")} className="">
              <img src={bd} alt="" className="w-12 h-12 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
