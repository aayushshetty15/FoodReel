import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserRegister from '../pages/auth/UserRegister';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/register" element={<ChooseRegister />} />
        <Route path="/choose-register" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/user/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;