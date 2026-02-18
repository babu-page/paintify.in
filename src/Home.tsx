import React from 'react';
import { usePaintStore } from './paintStore';
import { Package, TrendingUp, ShoppingCart, AlertTriangle, ArrowUpRight, ArrowDownRight, Layers, Target, Activity, ShieldCheck, Calculator, History as HistoryIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const Home = () => {
  const products = usePaintStore((state) => state.products) || [];
  const sales = usePaintStore((state) => state.sales) || [];

  const totalStock = products.reduce((acc, p) => acc + (p.quantity || 0), 0);
  const totalSalesCount = sales.length;
  const totalRevenue = sales.reduce((acc, s) => acc + (s.totalAmount || 0), 0);
  const lowStockProducts = products.filter((p) => (p.quantity || 0) < 10);

  const stats = [
    {
      label: 'Inventory Assets',
      value: totalStock,
      sub: `${products.length} Class A Units`,
      icon: Layers,
      color: 'indigo',
      trend: '+12%',
      isPositive: true
    },
    {
      label: 'Total Revenue',
      value: `₹${Math.round(totalRevenue || 0).toLocaleString()}`,
      sub: `${totalSalesCount} Successful Orders`,
      icon: TrendingUp,
      color: 'emerald',
      trend: '+24%',
      isPositive: true
    },
    {
      label: 'System Load',
      value: 'NOMINAL',
      sub: 'All Units Functional',
      icon: Activity,
      color: 'purple',
      trend: 'STABLE',
      isPositive: true
    },
    {
      label: 'Critical Alerts',
      value: lowStockProducts.length,
      sub: 'Attention Required',
      icon: AlertTriangle,
      color: 'red',
      trend: lowStockProducts.length > 0 ? 'LEVEL 1' : 'NONE',
      isPositive: lowStockProducts.length === 0
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-2"
            >
              <Target size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Operational Console</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-2"
            >
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Secured</span>
            </motion.div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-black text-white tracking-tighter"
          >
            Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 font-serif italic">Intelligence</span>
          </motion.h1>
          <p className="text-slate-500 font-black mt-4 uppercase tracking-[0.6em] text-[10px] pl-1">Quantum Inventory Protocol • ACTIVE</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 p-2 rounded-[2rem] flex gap-2 backdrop-blur-xl"
        >
          <div className="bg-white/5 px-6 py-4 rounded-[1.5rem] border border-white/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Local Identity</p>
            <p className="text-sm font-black text-white uppercase tracking-widest">PAINT-SHOP-CMD</p>
          </div>
        </motion.div>
      </header>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className={clsx(
                "glass-card p-10 rounded-[3rem] group relative overflow-hidden transition-all duration-500",
                stat.color === 'red' && typeof stat.value === 'number' && stat.value > 0 ? "border-red-500/50 shadow-[0_0_60px_rgba(239,68,68,0.15)] bg-red-500/5" : "hover:border-white/20"
              )}
            >
              <div className={clsx(
                "absolute -right-6 -top-6 w-32 h-32 rounded-full blur-[80px] opacity-10 transition-opacity group-hover:opacity-30",
                stat.color === 'indigo' ? 'bg-indigo-600' :
                  stat.color === 'emerald' ? 'bg-emerald-600' :
                    stat.color === 'purple' ? 'bg-purple-600' : 'bg-red-600'
              )}></div>

              <div className="flex justify-between items-start mb-8">
                <div className={clsx(
                  "p-5 rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-110",
                  stat.color === 'indigo' ? 'bg-indigo-600 shadow-indigo-500/20' :
                    stat.color === 'emerald' ? 'bg-emerald-600 shadow-emerald-500/20' :
                      stat.color === 'purple' ? 'bg-purple-600 shadow-purple-500/20' : 'bg-red-600 shadow-red-500/20'
                )}>
                  <Icon size={28} strokeWidth={2.5} className="text-white" />
                </div>
                <div className={clsx(
                  "flex items-center gap-1.5 text-[10px] font-black px-4 py-2 rounded-full backdrop-blur-md border",
                  stat.isPositive ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                )}>
                  {stat.trend}
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <AlertTriangle size={14} />}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-4xl font-black text-white tracking-tighter tabular-nums">{stat.value}</h3>
                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">{stat.label}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.sub}</span>
                <div className="w-10 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 1, delay: 1 }}
                    className={clsx(
                      "h-full",
                      stat.color === 'indigo' ? 'bg-indigo-500' :
                        stat.color === 'emerald' ? 'bg-emerald-500' :
                          stat.color === 'purple' ? 'bg-purple-500' : 'bg-red-500'
                    )}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass-card p-12 rounded-[3.5rem] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-4">
                <Package className="text-indigo-400" size={24} />
                Asset Manifest
              </h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mt-2">Inventory Deployment Breakdown</p>
            </div>
            <Link to="/add-stock" className="text-[10px] font-black text-indigo-400 hover:text-white transition-colors border border-indigo-500/30 px-6 py-3 rounded-2xl hover:bg-indigo-500/20 uppercase tracking-widest">
              Manager Terminal
            </Link>
          </div>

          <div className="space-y-5">
            {products.slice(0, 5).map((p, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={p.id}
                className="flex items-center justify-between p-7 bg-white/5 rounded-3xl hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 group/row"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-slate-950 rounded-2xl border border-white/10 flex items-center justify-center text-indigo-400 font-black text-xl group-hover/row:scale-110 transition-transform">
                    {p.name?.charAt(0) || 'Ø'}
                  </div>
                  <div>
                    <p className="font-black text-white text-lg tracking-tight group-hover/row:text-indigo-400 transition-colors uppercase">{p.name || 'Undefined Unit'}</p>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">V: {p.litersPerCan}L / Can</span>
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">ID: {p.id?.slice(0, 8)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3 justify-end">
                    <p className={clsx(
                      "font-black text-3xl tabular-nums tracking-tighter",
                      (p.quantity || 0) < 10 ? "text-red-500" : "text-white"
                    )}>{p.quantity || 0}</p>
                    {(p.quantity || 0) < 10 && <AlertTriangle size={16} className="text-red-500 animate-pulse" />}
                  </div>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Available Units</p>
                </div>
              </motion.div>
            ))}
            {products.length === 0 && (
              <div className="text-center py-24 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5">
                <Package size={64} className="mx-auto text-slate-800 mb-6" />
                <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-xs">Terminal Devoid of Data</p>
              </div>
            )}
          </div>
        </motion.div>

        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-[3.5rem] bg-indigo-600 text-white relative overflow-hidden group/actions shadow-[0_40px_80px_-20px_rgba(79,70,229,0.5)] border-indigo-400/30"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-[100px] -mr-32 -mt-32 transition-opacity group-hover/actions:opacity-40"></div>

            <h3 className="text-3xl font-black mb-10 tracking-tighter">CMD Center</h3>
            <div className="space-y-5 relative z-10">
              {[
                { label: 'Deploy Stock', path: '/add-stock', icon: Package },
                { label: 'Dispatch Terminal', path: '/billing', icon: Calculator },
                { label: 'System Archives', path: '/history', icon: HistoryIcon },
              ].map((action, i) => (
                <Link
                  key={i}
                  to={action.path}
                  className="flex items-center justify-between w-full p-7 bg-white/10 hover:bg-white text-white hover:text-indigo-950 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 border border-white/10 shadow-xl active:scale-[0.95] group/btn"
                >
                  <div className="flex items-center gap-4">
                    <action.icon size={18} />
                    {action.label}
                  </div>
                  <ArrowUpRight size={18} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[3rem] border-white/5"
          >
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 ring-1 ring-indigo-500/30">
                <Activity size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Network Latency</p>
                <p className="text-xl font-black text-white">0.02ms / OPTIMAL</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Signal Strength</span>
                <span>98%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '98%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
