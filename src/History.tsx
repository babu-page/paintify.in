import React from 'react';
import { usePaintStore } from './paintStore';
import { History as HistoryIcon, Download, Search, Database, Calendar, Package, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const History = () => {
  const sales = usePaintStore((state) => state.sales) ?? [];

  const escapeCSVValue = (val: string | number): string => {
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const exportToCSV = () => {
    const saleList = sales ?? [];
    if (saleList.length === 0) return;

    const headers = ['Date', 'Product', 'Quantity', 'Liters', 'Rate', 'Total Amount'];
    const rows = saleList.map(s => [
      s.date ? new Date(s.date).toLocaleDateString() : '',
      escapeCSVValue(s.productName ?? ''),
      s.quantitySold ?? 0,
      s.totalLiters ?? 0,
      s.ratePerCan ?? 0,
      s.totalAmount ?? 0
    ]);

    const headerRow = headers.map((h) => escapeCSVValue(h));
    const csvContent = [headerRow, ...rows].map(row => row.join(',')).join('\n');
    const BOM = '\uFEFF'; // UTF-8 BOM for Excel and proper Unicode handling
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const filename = `Paintify_Archive_${new Date().toISOString().slice(0, 10)}.csv`;

    try {
      const navAny = navigator as Navigator & { msSaveBlob?: (b: Blob, n: string) => void };
      if (typeof navAny.msSaveBlob === 'function') {
        navAny.msSaveBlob(blob, filename);
        return;
      }

      const link = document.createElement('a');
      link.download = filename;
      link.style.cssText = 'position:fixed;top:-9999px;left:-9999px;';
      document.body.appendChild(link);

      const url = URL.createObjectURL(blob);
      link.href = url;
      link.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
        if (link.parentNode) link.parentNode.removeChild(link);
      }, 500);
    } catch {
      // Very old browsers: fall back to data URL
      const dataUrl = 'data:text/csv;charset=utf-8,' + encodeURIComponent(BOM + csvContent);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/20">
            <HistoryIcon className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Sales <span className="text-indigo-500 font-serif italic italic lowercase tracking-tight">Archives</span></h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">Historical Payload Records & Ledger</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={exportToCSV}
            disabled={sales.length === 0}
            className="elite-button-primary disabled:opacity-50 disabled:cursor-not-allowed h-16"
          >
            <Download size={20} />
            EXPORT DATASET
          </button>
        </div>
      </header>

      <div className="glass-card rounded-[3.5rem] bg-slate-900/60 overflow-hidden border-white/10 shadow-2xl">
        <div className="p-8 bg-slate-950 flex justify-between items-center text-white border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600/20 p-2.5 rounded-xl border border-indigo-500/30">
              <Database size={20} className="text-indigo-400" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em]">Operational History Ledger</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <Search size={14} className="text-slate-500" />
              <input
                type="text"
                placeholder="QUERY ARCHIVE..."
                className="bg-transparent border-none outline-none text-[9px] font-black text-white placeholder:text-slate-700 w-32 tracking-widest"
              />
            </div>
            <div className="px-5 py-2.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{sales.length} Records Verified</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5">
                <th className="p-8">Timestamp</th>
                <th className="p-8">Asset Deployment</th>
                <th className="p-8">Volume Data</th>
                <th className="p-8 text-right">Fiscal Value</th>
              </tr>
            </thead>
            <motion.tbody
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y divide-white/5"
            >
              {sales.map((sale, idx) => (
                <motion.tr
                  key={sale.id}
                  variants={item}
                  className="hover:bg-white/5 transition-all duration-300 group"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 transition-colors">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <div className="font-black text-white text-sm tracking-widest">
                          {sale.date ? new Date(sale.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </div>
                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1">
                          {sale.date ? `UTC+05:30 • ${new Date(sale.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` : '-'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                        <Package size={16} />
                      </div>
                      <div>
                        <p className="font-black text-white uppercase tracking-tight text-lg group-hover:text-indigo-400 transition-colors">{sale.productName}</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Transaction Ref: {sale.id?.slice(0, 12) ?? '-'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-2xl font-black text-white tabular-nums tracking-tighter">{sale.quantitySold}</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Units</p>
                      </div>
                      <ArrowRight size={14} className="text-slate-800" />
                      <div>
                        <p className="text-2xl font-black text-emerald-500 tabular-nums tracking-tighter">{sale.totalLiters}L</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Total Mass</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <div className="inline-flex flex-col items-end">
                      <div className="text-3xl font-black text-white tracking-tighter tabular-nums flex items-center gap-3">
                        ₹{Math.round(sale.totalAmount).toLocaleString()}
                        <ArrowUpRight size={20} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <div className="flex gap-3 justify-end mt-2">
                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">NET VAL</span>
                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-white/5 text-slate-500 border border-white/5 uppercase tracking-widest">ID:{sale.productId?.slice(0, 4) ?? '-'}</span>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {sales.length === 0 && (
          <div className="p-32 text-center bg-slate-900/40">
            <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-white/10">
              <HistoryIcon size={48} className="text-slate-700" />
            </div>
            <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">Archival Void</h4>
            <p className="text-slate-500 font-extrabold uppercase tracking-[0.3em] text-[10px]">No historical deployment data recovered</p>
          </div>
        )}
      </div>

      <div className="glass-card p-10 rounded-[3rem] border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/30">
            <Database size={28} />
          </div>
          <div>
            <h4 className="text-lg font-black text-white uppercase tracking-tight">Ledger Redundancy</h4>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Data verified through local operative persistence protocol</p>
          </div>
        </div>
        <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ledger Integrity: High</span>
        </div>
      </div>
    </div>
  );
};
