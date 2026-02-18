import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface PageTransitionProps {
    children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="relative min-h-[60vh]"
        >
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center min-h-[60vh]"
                    >
                        <div className="flex flex-col items-center gap-8">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                                <Loader2
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500"
                                    size={32}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">
                                    Loading Protocol
                                </p>
                                <div className="flex gap-1.5">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
