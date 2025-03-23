import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import AllFood from '../Pages/AllFood/AllFood';
import Gallery from '../Pages/Gallery/Gallery';
import ContactUs from '../Pages/ContactUs/ContactUs';
import { Dashboard } from '../Dashboard/Dashboard';

import RestaurantDashboard from '../Dashboard/Restaurant/RestaurantDashboard';
import CustomerDashboard from '../Dashboard/Customer/CustomerDashboard';
import AddFood from '../Dashboard/Restaurant/AddFood';
import AdminDashboard from '../Dashboard/Admin Dashboard/AdminDashboard';
import ManageUsers from '../Dashboard/Admin Dashboard/ManageUsers';
import ManageFood from '../Dashboard/Restaurant/ManageFood';
import ManageAdvertisements from '../Dashboard/Admin Dashboard/ManageAdvertisements';
import RestaurantProfile from '../Dashboard/Restaurant/Profile/RestaurantProfile';
import Advertisement from '../Dashboard/Restaurant/Advertisement';
import PostAdvertisement from '../Dashboard/Restaurant/PostAdvertisement';
import CustomerProfile from '../Dashboard/Customer/Profile/CustomerProfile';
import SingleFood from '../Pages/SingleFood/SingleFood';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="all-food" element={<AllFood />} />
          <Route path="all-food/:id" element={<SingleFood />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path='userProfile' element={<CustomerProfile />} />
        </Route>

        <Route path='/dashboard' element={<Dashboard />}>
          {/* Admin Routes */}
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='manage-user' element={<ManageUsers />} />
          <Route path='manage-ad' element={<ManageAdvertisements/>}/>

          {/* Restaurant routes  */}
          <Route path='restaurantDashboard' element={<RestaurantDashboard />} />
          <Route path='add-foods' element={<AddFood />} />
          <Route path='manage-food' element={<ManageFood/>} />
          <Route path='restaurantProfile' element={<RestaurantProfile />} />
          <Route path='ad' element={<Advertisement />} />
          <Route path='ad/post' element={<PostAdvertisement />} />


          {/* Customer Routes */}
          <Route path='customerDashboard' element={<CustomerDashboard />} />
          

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
