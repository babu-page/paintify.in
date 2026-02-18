import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './authStore';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  // Failsafe: if hydration never reports as complete (e.g. localStorage issues),
  // fall back after a short delay so the app never gets stuck on a spinner.
  const [fallbackReady, setFallbackReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFallbackReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!hasHydrated && !fallbackReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
