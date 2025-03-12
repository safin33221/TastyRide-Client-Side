
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import AllFood from '../Pages/AllFood/AllFood';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="all-food" element={<AllFood />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
