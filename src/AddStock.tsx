import React, { useState } from 'react';
import { usePaintStore, Product } from './paintStore';
import { Plus, Pencil, Package, Database, Info, Trash2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export const AddStock = () => {
  const products = usePaintStore((state) => state.products) ?? [];
  const { addProduct, deleteProduct, updateProduct } = usePaintStore();
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    litersPerCan: 0,
    quantity: 0,
    dp: 0,
    billPercent: 0,
    cdPercent: 0,
    gstPercent: 18,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
      setEditingId(null);
    } else {
      addProduct(formData);
    }
    setFormData({
      name: '',
      litersPerCan: 0,
      quantity: 0,
      dp: 0,
      billPercent: 0,
      cdPercent: 0,
      gstPercent: 18,
    });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    const { id, ...rest } = product;
    setFormData(rest);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/20">
            <Package className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Inventory <span className="text-indigo-500 font-serif italic italic lowercase tracking-tight">Deployment</span></h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">Registration & Asset Management Hub</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-1"
        >
          <div className="glass-card p-10 rounded-[3rem] sticky top-32 border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <Zap size={20} className="text-indigo-500/20" />
            </div>
            <h3 className="text-xl font-black text-white mb-10 flex items-center gap-4">
              {editingId ? 'Modify Unit' : 'Initialize New Unit'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset Identity</label>
                <input
                  type="text"
                  required
                  className="elite-input"
                  placeholder="e.g. Premium White Gloss"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Volume (L)</label>
                  <input
                    type="number"
                    required
                    step="0.1"
                    className="elite-input"
                    value={formData.litersPerCan || ''}
                    onChange={(e) => setFormData({ ...formData, litersPerCan: e.target.value === '' ? 0 : Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Unit Count</label>
                  <input
                    type="number"
                    required
                    className="elite-input"
                    value={formData.quantity || ''}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value === '' ? 0 : Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Dealer Price (DP)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-black">₹</span>
                  <input
                    type="number"
                    required
                    className="elite-input pl-14"
                    value={formData.dp || ''}
                    onChange={(e) => setFormData({ ...formData, dp: e.target.value === '' ? 0 : Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Bill (%)</label>
                  <input
                    type="number"
                    className="elite-input text-center px-2"
                    value={formData.billPercent || ''}
                    onChange={(e) => setFormData({ ...formData, billPercent: e.target.value === '' ? 0 : Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">CD (%)</label>
                  <input
                    type="number"
                    className="elite-input text-center px-2"
                    value={formData.cdPercent || ''}
                    onChange={(e) => setFormData({ ...formData, cdPercent: e.target.value === '' ? 0 : Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">GST (%)</label>
                  <input
                    type="number"
                    className="elite-input text-center px-2 border-emerald-500/20"
                    value={formData.gstPercent || ''}
                    onChange={(e) => setFormData({ ...formData, gstPercent: e.target.value === '' ? 0 : Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="elite-button-primary w-full">
                  {editingId ? (
                    <>
                      <Zap size={20} />
                      Update Protocol
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      Register Assets
                    </>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ name: '', litersPerCan: 0, quantity: 0, dp: 0, billPercent: 0, cdPercent: 0, gstPercent: 18 });
                    }}
                    className="w-full mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Abort Revision
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2"
        >
          <div className="glass-card rounded-[3.5rem] bg-slate-900/60 overflow-hidden border-white/10">
            <div className="p-8 bg-slate-950 flex justify-between items-center text-white border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600/20 p-2.5 rounded-xl border border-indigo-500/30">
                  <Database size={20} className="text-indigo-400" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em]">Deployment Ledger</h3>
              </div>
              <div className="px-5 py-2.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{products.length} Units Online</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5">
                    <th className="p-8">Unit Meta</th>
                    <th className="p-8">Stock Analysis</th>
                    <th className="p-8">Financials</th>
                    <th className="p-8 text-right">Ops</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="divide-y divide-white/5"
                >
                  {products.map((product, idx) => (
                    <motion.tr
                      key={product.id}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                      className="hover:bg-white/5 transition-all duration-300 group"
                    >
                      <td className="p-8">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-slate-950 rounded-2xl border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {product.name?.charAt(0) || 'Ø'}
                          </div>
                          <div>
                            <div className="font-black text-white text-lg tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{product.name}</div>
                            <div className="flex items-center gap-3 mt-1.5 opacity-60">
                              <div className="bg-white/10 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">ID: {product.id?.slice(0, 8) ?? '-'}</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={clsx(
                              "px-4 py-2 rounded-xl border font-black text-sm",
                              (product.quantity ?? 0) < 10 ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                            )}>
                              {product.quantity ?? 0} Units
                            </div>
                            <ArrowRight size={14} className="text-slate-700" />
                            <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 font-black text-sm text-slate-300">
                              {product.litersPerCan ?? 0}L
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{(product.quantity ?? 0) < 10 ? 'LOW STOCK ALERT' : 'OPTIMAL LOAD'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="space-y-1">
                          <div className="text-2xl font-black text-white tracking-tighter">₹{(product.dp ?? 0).toLocaleString()}</div>
                          <div className="flex gap-2">
                            <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">B: {product.billPercent ?? 0}%</span>
                            <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">C: {product.cdPercent ?? 0}%</span>
                            <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">G: {product.gstPercent ?? 0}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all border border-white/5"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-3 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/10"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>

            {products.length === 0 && (
              <div className="p-32 text-center bg-slate-900/40">
                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-white/10">
                  <Info size={48} className="text-slate-700" />
                </div>
                <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">Database Silent</h4>
                <p className="text-slate-500 font-extrabold uppercase tracking-[0.3em] text-[10px]">No operational units detected in current sector</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/30">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h4 className="text-xl font-black text-white">Security Protocol</h4>
            <p className="text-slate-500 text-sm font-bold mt-1">All changes are logged in the persistent system ledger.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Encrypted Payload</p>
            <p className="text-indigo-400 font-black tracking-widest uppercase text-xs">READY FOR TRANSMISSION</p>
          </div>
        </div>
      </div>
    </div>
  );
};
