import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Calculator, History, LogOut, Menu, X, User, Zap } from 'lucide-react';
import { useAuthStore } from './authStore';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export const MainLayout = () => {
  const { logout, user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/add-stock', icon: Package, label: 'Inventory' },
    { path: '/billing', icon: Calculator, label: 'Generate Bill' },
    { path: '/history', icon: History, label: 'Sales Logs' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Elite Background Blobs */}
      <div className="mesh-gradient">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full animate-float" style={{ animationDelay: '-8s' }}></div>
      </div>

      <div className="scanline"></div>

      <header className="frosted-header z-50">
        <div className="container mx-auto px-6 flex justify-between items-center h-24">
          <Link to="/" className="flex items-center gap-5 group">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-3 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative">
              <Zap className="text-white" size={28} strokeWidth={2.5} />
              <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-[0.1em] text-white leading-none">PAINTIFY</span>
              <span className="text-[10px] font-black text-indigo-400 tracking-[0.4em] mt-1 uppercase">HQ Protocol</span>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced visibility check */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "flex items-center gap-3 px-6 py-3.5 rounded-xl font-black transition-all relative overflow-hidden group/nav",
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-indigo-600/10 shadow-[inset_0_0_12px_rgba(99,102,241,0.1)] rounded-xl border border-indigo-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon size={18} strokeWidth={isActive ? 3 : 2} className={clsx("relative z-10 transition-transform group-hover/nav:scale-110", isActive && "text-indigo-400")} />
                  <span className="relative z-10 uppercase tracking-[0.2em] text-[10px]">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-8">
            {/* Status Indicators */}
            <div className="hidden lg:flex items-center gap-6 pr-6 border-r border-white/10">
              <div className="flex flex-col items-end">
                <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] mb-1">System Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] mb-1">Authenticated</p>
                <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">{user?.name || 'Authorized Unit'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-12 h-12 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl border border-red-500/20 transition-all flex items-center justify-center group/btn shadow-[0_0_20px_rgba(239,68,68,0)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-90"
              >
                <LogOut size={20} className="group-hover/btn:-translate-x-0.5 transition-transform" />
              </button>
            </div>

            <button
              className="xl:hidden text-white w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-3xl xl:hidden"
          >
            <div className="p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <Zap className="text-indigo-500" size={32} />
                  <span className="text-xl font-black tracking-widest">PAINTIFY</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                  <X size={32} />
                </button>
              </div>

              <div className="space-y-4 flex-grow">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        "flex items-center gap-6 p-6 rounded-3xl font-black uppercase tracking-[0.3em] text-xs transition-all border",
                        isActive ? "bg-indigo-600/20 border-indigo-500/50 text-white shadow-[0_0_40px_rgba(99,102,241,0.2)]" : "text-slate-500 border-white/5 hover:bg-white/5"
                      )}
                    >
                      <Icon size={24} className={isActive ? "text-indigo-400" : ""} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-indigo-400">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operator Identity</p>
                    <p className="font-black text-white">{user?.name || 'Guest Unit'}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500/10 text-red-500 font-black py-5 rounded-3xl border border-red-500/20 flex items-center justify-center gap-3"
                >
                  <LogOut size={20} />
                  TERMINATE SESSION
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow container mx-auto px-6 py-4 xl:py-12 relative z-10">
        <Outlet />
      </main>

      <footer className="py-12 border-t border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[9px]">
            Paintify Core Protocol • v4.0 Elite Edition
          </p>
          <div className="flex gap-8">
            <span className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">Encryption: AES-256</span>
            <span className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">Status: Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
