import React, { useState } from 'react';
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { MdDeliveryDining } from "react-icons/md";

import { FaBuysellads } from 'react-icons/fa6';
import { GrRestaurant } from "react-icons/gr";
import { motion } from 'framer-motion';
import { Link, Outlet, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { IoIosAddCircleOutline } from 'react-icons/io';

import useUserData from '../Hooks/useUserData';

export const Dashboard = () => {
  return (
    <div className="flex bg-indigo-50">
      <Sidebar />
      <MainContent />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('Dashboard');
  const [userData, isPending] = useUserData();
  if (isPending) return;

  return (
    <motion.nav
      layout
      className={`sticky z-10 top-0 h-screen  shrink-0 border-r border-slate-300 bg-white p-2 w-full   `}
      style={{
        width: open ? '225px' : 'fit-content',
      }}
    >
      <TitleSection open={open} />

      {/* All type of Sidebar links goes here  */}
      <div className="space-y-1">
        {/* Admin Realted Links */}
        {userData?.role === 'admin' && (
          <>
            <Option
              Icon={FiHome}
              title="Dashboard"
              links="/dashboard/admin"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={FiUsers}
              title="Manage Users"
              links="/dashboard/manage-user"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={GrRestaurant }
              title="Riders Application"
              links="/dashboard/rider-application"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={FaBuysellads}
              title="Manage Ads"
              links="/dashboard/manage-ad"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
          </>
        )}

        {/* restaurant Related Links */}
        {userData?.role === 'restaurant' && (
          <>
            <Option
              Icon={FiHome}
              title="Dashboard"
              links="/dashboard/restaurantDashboard"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={FiDollarSign}
              title="Sales"
              links="/dashboard/restaurant"
              selected={selected}
              setSelected={setSelected}
              open={open}
              notifs={3}
            />

            <Option
              Icon={IoIosAddCircleOutline}
              title="Add Foods"
              links="/dashboard/add-foods"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={FiShoppingCart}
              title="Manage Foods"
              links="/dashboard/manage-food"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={FiShoppingCart}
              title="Manage Orders"
              links="/dashboard/manage-orders"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />

            <Option
              Icon={FiTag}
              title="Tags"
              links=""
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={FiBarChart}
              title="Analytics"
              links=""
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={FiUser}
              title="Restaurant Profile"
              links="/dashboard/restaurantProfile"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={FaBuysellads}
              title="Advertisements"
              links="/dashboard/ad"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
          </>
        )}

        {/* customers Realted Links */}

        {userData?.role === 'customer' && (
          <>
            <Option
              Icon={FiHome}
              title="Dashboard"
              links="/dashboard/customerDashboard"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={FiHome}
              title="My Order"
              links="/dashboard/my-order"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
          </>
        )}

        {/* rider related field  */}
        {userData?.role === 'rider' && (
          <>
            <Option
              Icon={FiHome}
              title="Dashboard"
              links="/dashboard/rider-dashboard"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
            <Option
              Icon={MdDeliveryDining }
              title="Delivery Request"
              links="/dashboard/delivery-request"
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
          </>
        )}

        <hr className="text-gray-200" />
        <Option
          Icon={FiMonitor}
          title="View Site"
          links="/"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  links,
}) => {
  const navigate = useNavigate();
  return (
    <motion.button
      layout
      onClick={() => {
        setSelected(title);
        navigate(links);
      }}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? 'bg-indigo-100 text-indigo-800'
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: '-50%' }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">
                {user?.displayName}
              </span>
              <span className="block text-xs text-slate-500">Pro Plan</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen(pv => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && 'rotate-180'}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const MainContent = () => (
  <div className=" w-full bg-indigo-50   ">
    <Outlet />
  </div>
);
