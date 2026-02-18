import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from './authStore';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle, ShieldCheck, Zap } from 'lucide-react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const authStore = useAuthStore();
    const login = authStore.login;
    const navigate = useNavigate();

    // 3D Tilt Effect logic - Simplified and bounded
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [0, 1], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [0, 1], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    useEffect(() => {
        if (authStore.isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [authStore.isAuthenticated, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('ACCESS DENIED: INVALID UNIT CREDENTIALS');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-20 relative overflow-hidden">
            {/* Elite Background Blobs - matches MainLayout */}
            <div className="mesh-gradient">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full animate-float" style={{ animationDelay: '-4s' }}></div>
                <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full animate-float" style={{ animationDelay: '-8s' }}></div>
            </div>

            <div className="scanline"></div>

            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md w-full glass-card rounded-[4rem] p-16 relative z-10 border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
            >
                <div className="text-center mb-12" style={{ transform: "translateZ(60px)" }}>
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-500/30 transform rotate-6 border border-white/20 relative group">
                        <LogIn size={40} className="text-white" strokeWidth={2.5} />
                        <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] scale-110 blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-5xl font-black text-white tracking-tighter mb-4">PAINTIFY</h2>
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-px bg-indigo-500/30"></span>
                            <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-[10px]">Portal Access</p>
                            <span className="w-8 h-px bg-indigo-500/30"></span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10" style={{ transform: "translateZ(40px)" }}>
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-500/10 border border-red-500/20 p-5 rounded-3xl flex items-center gap-4 text-red-500 text-[10px] font-black uppercase tracking-widest"
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-5 flex items-center gap-2">
                            <Mail size={12} className="text-indigo-400" />
                            Unit Identity
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="elite-input"
                            placeholder="OPERATOR@CORE.SYSTEM"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-5 flex items-center gap-2">
                            <Lock size={12} className="text-indigo-400" />
                            Access Hash
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="elite-input"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="elite-button-primary h-[80px] text-lg tracking-widest uppercase shadow-[0_20px_50px_-10px_rgba(99,102,241,0.5)]"
                    >
                        <Zap size={24} />
                        Establish Link
                    </button>
                </form>

                <div className="mt-16 text-center" style={{ transform: "translateZ(20px)" }}>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                        <p className="text-slate-600 font-bold text-xs uppercase tracking-widest">
                            New Authorized Unit?
                        </p>
                        <Link to="/signup" className="inline-block mt-4 text-white hover:text-indigo-400 transition-colors uppercase tracking-[0.4em] text-[10px] font-black border-b border-white/10 pb-1">
                            Initialize Registration
                        </Link>
                    </div>
                </div>

                <div className="mt-12 flex justify-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 rounded-full border border-white/5">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">RSA 4096 Secure</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
