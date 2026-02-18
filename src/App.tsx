import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from './MainLayout';
import { Home } from './Home';
import { AddStock } from './AddStock';
import { Billing } from './Billing';
import { History } from './History';
import { Login } from './Login';
import { Signup } from './Signup';
import { ProtectedRoute } from './ProtectedRoute';
import { PageTransition } from './PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={
              <PageTransition>
                <Home />
              </PageTransition>
            } />
            <Route path="add-stock" element={
              <PageTransition>
                <AddStock />
              </PageTransition>
            } />
            <Route path="billing" element={
              <PageTransition>
                <Billing />
              </PageTransition>
            } />
            <Route path="history" element={
              <PageTransition>
                <History />
              </PageTransition>
            } />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}

export default App;
