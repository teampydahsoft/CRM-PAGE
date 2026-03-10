import { motion } from 'framer-motion';
import {
    Users, BookOpen, CreditCard, ClipboardCheck,
    UserRound, Home, Brain, Activity, ArrowRight
} from 'lucide-react';

const modules = [
    {
        id: 'intel',
        title: 'Intelligence',
        desc: 'Harness AI-driven insights for data-backed institutional decisions.',
        icon: Brain,
        color: '#8b5cf6',
        spanX: 4,
        spanY: 2,
        light: true
    },
    {
        id: 'admit',
        title: 'Admission Portal',
        desc: 'Streamline enrollment and lead pipeline.',
        icon: Users,
        color: '#0ea5e9',
        spanX: 2,
        spanY: 2
    },
    {
        id: 'academic',
        title: 'Academics',
        desc: 'Complete curriculum planning and digital student records.',
        icon: BookOpen,
        color: '#f59e0b',
        spanX: 2,
        spanY: 1
    },
    {
        id: 'finance',
        title: 'Finance',
        desc: 'Automated fee collection and financial reporting.',
        icon: CreditCard,
        color: '#10b981',
        spanX: 2,
        spanY: 1
    },
    {
        id: 'exams',
        title: 'Exams',
        desc: 'Automated assessment and result management.',
        icon: ClipboardCheck,
        color: '#f97316',
        spanX: 2,
        spanY: 1
    },
    {
        id: 'hostel',
        title: 'Hostel CRM',
        desc: 'Integrated residency management and student safety tracking.',
        icon: Home,
        color: '#6366f1',
        spanX: 3,
        spanY: 2
    },
    {
        id: 'hr',
        title: 'HR & Payroll',
        desc: 'Automated staff records and payroll cycles.',
        icon: UserRound,
        color: '#ec4899',
        spanX: 3,
        spanY: 2
    },
    {
        id: 'engage',
        title: 'Engagement',
        desc: 'Unified dashboard for student life and activities.',
        icon: Activity,
        color: '#64748b',
        spanX: 6,
        spanY: 1
    }
];

const ModuleShowcase = () => {
    const getGridClasses = (spanX, spanY) => {
        const baseClasses = 'col-span-1';
        const lgClasses = {
            4: 'lg:col-span-4',
            3: 'lg:col-span-3',
            2: 'lg:col-span-2',
            6: 'lg:col-span-6',
        };
        const rowClasses = {
            3: 'lg:row-span-3',
            2: 'lg:row-span-2',
            1: 'lg:row-span-1',
        };

        return `${baseClasses} ${lgClasses[spanX] || 'lg:col-span-2'} ${rowClasses[spanY] || 'lg:row-span-1'}`;
    };

    const getMinHeight = (spanX, spanY) => {
        if (spanY >= 3) return 'lg:min-h-[420px]';
        if (spanY === 2) return 'lg:min-h-[340px]';
        if (spanX === 6) return 'lg:min-h-[180px]';
        return 'min-h-[250px] sm:min-h-[280px] lg:min-h-[200px]';
    };

    return (
        <section className="relative overflow-hidden bg-white" style={{
            paddingTop: 'clamp(4rem, 8vw, 8rem)',
            paddingBottom: 'clamp(4rem, 8vw, 8rem)'
        }}>
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.4]"
                style={{
                    backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="section-container relative z-10">
                <div className="text-center" style={{
                    marginBottom: 'clamp(3rem, 8vw, 6rem)'
                }}>
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="font-extrabold uppercase tracking-tight block"
                        style={{
                            color: 'var(--color-primary)',
                            fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
                            letterSpacing: 'clamp(0.2rem, 0.5vw, 0.3125rem)',
                            marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)'
                        }}
                    >
                        Digital Ecosystem
                    </motion.span>
                    <h2 className="font-extrabold text-slate-900 leading-tight tracking-tight" style={{
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        lineHeight: '1.1'
                    }}>
                        Unified Institutional <br />
                        <span className="text-slate-400">Intelligence Core.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 auto-rows-auto" style={{
                    gap: 'clamp(1rem, 2.5vw, 1.5rem)'
                }}>
                    {modules.map((mod, i) => (
                        <motion.div
                            key={mod.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className={`
                                ${getGridClasses(mod.spanX, mod.spanY)}
                                ${getMinHeight(mod.spanX, mod.spanY)}
                                group relative overflow-hidden rounded-[2.5rem]
                                backdrop-blur-xl transition-all duration-500
                                hover:-translate-y-2 hover:shadow-2xl
                            `}
                            style={{
                                backgroundColor: 'white',
                                border: '1px solid rgba(0, 0, 0, 0.06)',
                                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.color}10 0%, transparent 40%, transparent 100%)`
                                }}
                            />

                            {/* Tech Grid overlay on card */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    backgroundImage: `radial-gradient(${mod.color} 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px'
                                }}
                            />

                            {/* Decorative Colored Blur Blob */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-all duration-700"
                                style={{ backgroundColor: mod.color }}
                            />

                            {/* Large Watermark Icon Art */}
                            <div className="absolute -bottom-6 -right-6 opacity-[0.06] group-hover:opacity-[0.12] transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                                <mod.icon size={180} strokeWidth={1} color={mod.color} />
                            </div>

                            {/* Corner Tech Ornament */}
                            <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <path d="M 60 0 L 60 20 M 60 0 L 40 0" stroke={mod.color} strokeWidth="2" strokeOpacity="0.3" />
                                    <circle cx="60" cy="0" r="3" fill={mod.color} fillOpacity="0.5" />
                                </svg>
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-between" style={{
                                padding: 'clamp(1.5rem, 3.5vw, 2.5rem)'
                            }}>
                                <div>
                                    {/* Icon Container */}
                                    <div
                                        className="rounded-2xl flex justify-center items-center flex-shrink-0 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                                        style={{
                                            width: 'clamp(3rem, 4vw, 3.5rem)',
                                            height: 'clamp(3rem, 4vw, 3.5rem)',
                                            backgroundColor: 'white',
                                            color: mod.color,
                                            boxShadow: `0 8px 16px -4px ${mod.color}20`
                                        }}
                                    >
                                        <mod.icon size={28} strokeWidth={1.5} />
                                    </div>

                                    <h3 className="font-extrabold tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors" style={{
                                        fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                                        marginBottom: '0.75rem',
                                        lineHeight: '1.2'
                                    }}>
                                        {mod.title}
                                    </h3>
                                    <p className="font-medium text-slate-500 group-hover:text-slate-600 transition-colors" style={{
                                        fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
                                        lineHeight: '1.6'
                                    }}>
                                        {mod.desc}
                                    </p>
                                </div>

                                <div
                                    className="flex items-center font-bold mt-6"
                                    style={{
                                        color: mod.color,
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <div className="relative overflow-hidden">
                                        {/* Ghost element for sizing */}
                                        <span className="opacity-0">View Module</span>

                                        {/* Visible Elements */}
                                        <span className="absolute top-0 left-0 transform translate-y-0 group-hover:-translate-y-[150%] transition-transform duration-300 block">
                                            Explore
                                        </span>
                                        <span className="absolute top-0 left-0 transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300 block">
                                            View Module
                                        </span>
                                    </div>
                                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ModuleShowcase;
