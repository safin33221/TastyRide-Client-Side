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
import SellerDashboard from '../Dashboard/seller/SellerDashboard';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="all-food" element={<AllFood />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<ContactUs/>} />
        </Route>

        <Route path='/dashboard' element ={<Dashboard/>}>
          <Route path='seller' element={<SellerDashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
