import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    ArrowLeft, ExternalLink, CheckCircle2
} from 'lucide-react';
import { authAPI } from '../services/api';

const portalDetails = [
    {
        title: 'Admissions CRM',
        category: 'Enrollment Management',
        desc: 'A comprehensive lead management system designed to streamline the entire student enrollment funnel. From inquiry tracking to final registration, our CRM ensures no lead is left behind.',
        features: ['Automated Lead Scoring', 'Bulk Communication Tools', 'Document Verification Hub', 'Real-time Conversion Analytics'],
        color: '#0ea5e9',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/sb-admin-2-free-dashboard-template-1.jpg',
        url: 'https://pydah-admissions.vercel.app/auth/login',
        portalId: 'admissions-crm'
    },
    {
        title: 'Student Academic Portal',
        category: 'Learning & Lifestyle',
        desc: 'The central hub for student life. Access grades, schedules, course materials, and institutional announcements in one unified, mobile-responsive dashboard.',
        features: ['Personalized Course Timetable', 'Attendance & Grade Tracking', 'Digital Library Access', 'Campus Event Calendar'],
        color: '#f59e0b',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/free-dashboard-templates.jpg',
        url: 'https://pydahsdms.vercel.app/student/login',
        portalId: 'student-portal'
    },
    {
        title: 'Fee Management',
        category: 'Financial Systems',
        desc: 'Streamline institutional finance with automated fee collection, scholarship management, and transparent financial reporting for parents and administrators.',
        features: ['Online Fee Payment', 'Automated Invoicing', 'Scholarship Tracking', 'Financial Defaulter Alerts'],
        color: '#8b5cf6',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/free-dashboard-templates.jpg',
        url: 'http://localhost:3000/fee-management/login',
        portalId: 'fee-management'
    },
    {
        title: 'Transport Management',
        category: 'Logistics Hub',
        desc: 'Optimize campus logistics with real-time fleet tracking, route management, and automated transport billing, ensuring student safety and operational efficiency.',
        features: ['Real-time GPS Tracking', 'Route Optimization', 'Transport Fee Billing', 'Driver & Vehicle Records'],
        color: '#14b8a6',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/sb-admin-2-free-dashboard-template-1.jpg',
        url: 'http://localhost:5175/login',
        portalId: 'transport-management'
    },
    {
        title: 'Hostel Automation',
        category: 'Facility Management',
        desc: 'Transform residency management with smart room allocation, security protocols, and automated mess billing systems designed for modern campus living.',
        features: ['Smart Room Allocation', 'Security & Visitor Logs', 'Automated Mess Management', 'Student Safety Dashboard'],
        color: '#6366f1',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/sb-admin-2-free-dashboard-template-1.jpg',
        url: 'https://hms.pydahsoft.in/login',
        portalId: 'hostel-automation'
    },
    {
        title: 'HRMS & Payroll',
        category: 'Staff Operations',
        desc: 'Empower your workforce with automated attendance, performance tracking, and a seamless payroll system that handles compliance and reporting automatically.',
        features: ['Automated Payroll Processing', 'Leave & Attendance Mapping', 'Performance Appraisal Hub', 'Staff Self-Service Portal'],
        color: '#ec4899',
        image: 'https://colorlib.com/wp/wp-content/uploads/sites/2/sb-admin-2-free-dashboard-template-1.jpg',
        url: 'https://li-hrms.vercel.app/login',
        portalId: 'hrms'
    }
];

const PortalsPage = ({ onBack, onPortalClick }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="min-h-screen bg-white relative overflow-hidden" style={{
            paddingTop: 'clamp(80px, 12vw, 100px)',
            paddingBottom: 'clamp(4rem, 10vw, 8rem)'
        }}>
            {/* 3D Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 5, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full blur-[80px] lg:blur-[120px] opacity-[0.05]"
                    style={{ backgroundColor: '#4f46e5' }}
                />
                <motion.div
                    animate={{
                        y: [0, 60, 0],
                        rotate: [0, -10, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[100px] lg:blur-[150px] opacity-[0.03]"
                    style={{ backgroundColor: '#0ea5e9' }}
                />
            </div>

            {/* Header Area */}
            <div className="mb-16 lg:mb-32 px-4 sm:px-8 lg:px-12 relative z-10">
                <div className="section-container" style={{ padding: 'clamp(2rem, 4vw, 4rem) 1rem' }}>
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl sm:text-5xl lg:text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold text-slate-900 tracking-tighter leading-[1.1] lg:leading-[0.9] [text-shadow:0_10px_30px_rgba(0,0,0,0.05)]"
                        >
                            Operational <span className="text-indigo-600">Portals.</span>
                        </motion.h1>
                    </div>
                </div>
            </div>

            {/* Portal Cards Section */}
            <div className="section-container px-6 sm:px-10 lg:px-12 relative z-10">
                <div className="flex flex-col gap-24 lg:gap-64 md:gap-80">
                    {portalDetails.map((portal, idx) => (
                        <PortalSection
                            key={portal.title}
                            portal={portal}
                            idx={idx}
                            isMobile={isMobile}
                            onPortalClick={onPortalClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const PortalSection = ({ portal, idx, isMobile, onPortalClick }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yImg = useTransform(scrollYProgress, [0, 1], isMobile ? [40, -40] : [120, -120]);
    const yTxt = useTransform(scrollYProgress, [0, 1], isMobile ? [-20, 20] : [-60, 60]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);

    const handlePortalClick = (e) => {
        e.preventDefault();
        if (onPortalClick) {
            onPortalClick(portal);
        }
    };

    return (
        <motion.div
            ref={sectionRef}
            style={{ opacity, scale }}
            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-32 min-h-auto lg:min-h-[70vh]`}
        >
            {/* Image Visual - Clickable with 3D Tilt */}
            <div
                onClick={handlePortalClick}
                className="w-full lg:w-1/2 relative group block [perspective:2000px] cursor-pointer"
            >
                <motion.div
                    style={{ y: yImg }}
                    className="relative"
                >
                    <div
                        className="absolute inset-0 rounded-[2rem] lg:rounded-[3.5rem] blur-2xl lg:blur-3xl opacity-20 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: portal.color }}
                    />
                    <motion.div
                        whileHover={isMobile ? {} : {
                            rotateX: idx % 2 === 0 ? 8 : -8,
                            rotateY: idx % 2 === 0 ? -12 : 12,
                            scale: 1.05,
                            z: 50
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="relative overflow-hidden rounded-[2rem] lg:rounded-[3.5rem] border border-white/60 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.1)] lg:shadow-[0_50px_120px_rgba(0,0,0,0.12)] transition-all duration-700"
                    >
                        <img
                            src={portal.image}
                            alt={portal.title}
                            className="w-full h-auto object-cover transform group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileInView={isMobile ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                                className="bg-white px-6 py-2.5 lg:px-10 lg:py-4 rounded-full text-sm lg:text-base font-black text-slate-900 flex items-center gap-3 shadow-2xl"
                            >
                                Visit Portal <ExternalLink size={isMobile ? 16 : 20} />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Floating Micro-badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-6 lg:-top-10 -right-2 lg:-right-6 flex bg-white px-4 py-2.5 lg:px-6 lg:py-4 rounded-2xl lg:rounded-3xl shadow-2xl border border-slate-50 items-center gap-2 lg:gap-3 z-20 scale-75 lg:scale-100"
                    >
                        <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full animate-pulse" style={{ backgroundColor: portal.color }} />
                        <span className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Live Status</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Info Content - Parallax Text */}
            <motion.div
                style={{ y: yTxt }}
                className="w-full lg:w-1/2"
            >
                <div className="mb-8 lg:mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-[10px] lg:text-sm font-black text-slate-400 uppercase tracking-[0.2em] lg:tracking-[0.3em] leading-none mb-4 lg:mb-6 flex items-center gap-3 lg:gap-4"
                    >
                        <span className="w-8 lg:w-12 h-[2px] lg:h-[3px]" style={{ backgroundColor: portal.color }} />
                        {portal.category}
                    </motion.div>
                    <h2 className="text-3xl lg:text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-slate-900 tracking-tighter leading-[1.1] lg:leading-[0.9] mb-4 lg:mb-8">
                        {portal.title}
                    </h2>
                </div>

                <p className="text-lg lg:text-2xl text-slate-500 mb-16 lg:mb-36 leading-relaxed font-medium max-w-xl">
                    {portal.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 max-w-xl">
                    {portal.features.map((f, i) => (
                        <motion.div
                            key={f}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 lg:gap-5 text-slate-800"
                        >
                            <div className="mt-1 bg-emerald-50 p-1 lg:p-1.5 rounded-full shadow-inner">
                                <CheckCircle2 size={18} className="lg:text-2xl text-emerald-500" />
                            </div>
                            <span className="text-base lg:text-xl font-bold leading-tight">{f}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PortalsPage;
