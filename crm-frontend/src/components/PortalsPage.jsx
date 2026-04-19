import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    ArrowLeft, ExternalLink, CheckCircle2
} from 'lucide-react';
import { authAPI } from '../services/api';

const portalDetails = [
    {
        title: 'Admission Portal',
        titleMain: 'Admission',
        titleAccent: 'Portal',
        category: 'Enrollment Management',
        desc: 'A comprehensive lead management system designed to streamline the entire student enrollment funnel. From inquiry tracking to final registration, our CRM ensures no lead is left behind.',
        features: ['Automated Lead Scoring', 'Bulk Communication Tools', 'Document Verification Hub', 'Real-time Conversion Analytics'],
        color: '#0ea5e9',
        image: 'https://i.pinimg.com/736x/4e/04/c9/4e04c9e0dd9b0a5360fe5c9a5784b862.jpg',
        url: 'https://admissions.pydah.edu.in/auth/login',
        portalId: 'admissions-crm'
    },
    {
        title: 'Student Portal',
        titleMain: 'Student Academic',
        titleAccent: 'Portal',
        category: 'Learning & Lifestyle',
        desc: 'The central hub for student life. Access grades, schedules, course materials, and institutional announcements in one unified, mobile-responsive dashboard.',
        features: ['Personalized Course Timetable', 'Attendance & Grade Tracking', 'Digital Library Access', 'Campus Event Calendar'],
        color: '#f59e0b',
        image: 'https://i.pinimg.com/736x/5a/2e/2b/5a2e2b1a96243304c98937fb2b0444d5.jpg',
        url: 'https://pydahsdms.vercel.app/student/login',
        portalId: 'student-portal'
    },
    {
        title: 'Fee Management',
        titleMain: 'Fee',
        titleAccent: 'Management',
        category: 'Financial Systems',
        desc: 'Streamline institutional finance with automated fee collection, scholarship management, and transparent financial reporting for parents and administrators.',
        features: ['Online Fee Payment', 'Automated Invoicing', 'Scholarship Tracking', 'Financial Defaulter Alerts'],
        color: '#00a6ffff',
        image: '/931962fb2d5f2bf75f94b526891c3f43.jpg',
        url: 'https://pydah-fee-management.vercel.app/login',
        portalId: 'fee-management'
    },
    {
        title: 'Transport Management',
        titleMain: 'Transport',
        titleAccent: 'Management',
        category: 'Logistics Hub',
        desc: 'Optimize campus logistics with real-time fleet tracking, route management, and automated transport billing, ensuring student safety and operational efficiency.',
        features: ['Real-time GPS Tracking', 'Route Optimization', 'Transport Fee Billing', 'Driver & Vehicle Records'],
        color: '#0f73ffff',
        image: '/Gemini_Generated_Image_xuaavlxuaavlxuaa.png',
        url: 'https://pydah-transport.vercel.app/login',
        portalId: 'transport-management'
    },
    {
        title: 'Hostel Automation',
        titleMain: 'Hostel',
        titleAccent: 'Automation',
        category: 'Facility Management',
        desc: 'Transform residency management with smart room allocation, security protocols, and automated mess billing systems designed for modern campus living.',
        features: ['Smart Room Allocation', 'Security & Visitor Logs', 'Automated Mess Management', 'Student Safety Dashboard'],
        color: '#fed074ff',
        image: 'https://i.pinimg.com/736x/be/5b/59/be5b597fc3fce8fb5502c228cafa87f1.jpg',
        url: 'https://hms.pydahsoft.in/login',
        portalId: 'hostel-automation'
    },
    {
        title: 'HRMS & Payroll',
        titleMain: 'HRMS &',
        titleAccent: 'Payroll',
        category: 'Staff Operations',
        desc: 'Empower your workforce with automated attendance, performance tracking, and a seamless payroll system that handles compliance and reporting automatically.',
        features: ['Automated Payroll Processing', 'Leave & Attendance Mapping', 'Performance Appraisal Hub', 'Staff Self-Service Portal'],
        color: '#5372ffff',
        image: 'https://i.pinimg.com/736x/7a/41/f4/7a41f43d70ae2960e8bead5fa240591f.jpg',
        url: 'https://hrms.pydah.edu.in/login',
        portalId: 'hrms'
    },
    {
        title: 'Pharmacy Inventory',
        titleMain: 'Pharmacy',
        titleAccent: 'Inventory',
        category: 'Lab Management',
        desc: 'Specially crafted stock management for college labs. Track chemical inventory, equipment usage, and procurement cycles with precision.',
        features: ['Stock Level Monitoring', 'Procurement Tracking', 'Lab Equipment Logs', 'Safety Compliance Reports'],
        color: '#10b981',
        image: 'https://i.pinimg.com/736x/7e/d9/c0/7ed9c062347ff8055058abcada763a36.jpg',
        url: 'https://pydah-pharmacy-labs.vercel.app',
        portalId: 'pharmacy'
    }
];

const Typewriter = ({ texts, speed = 100, delay = 2000, mainColor = "inherit", accentColor = "inherit" }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const item = texts[currentTextIndex];
            const fullText = typeof item === 'string' ? item : `${item.main} ${item.accent}`;

            if (!isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length + 1));
                if (currentText === fullText) {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length - 1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTextIndex, texts, speed, delay]);

    const item = texts[currentTextIndex];
    if (typeof item === 'string') {
        return (
            <span className="relative">
                {currentText}
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[2px] h-[0.8em] bg-current ml-1 mb-[-0.1em]"
                />
            </span>
        );
    }

    const mainPart = currentText.substring(0, item.main.length);
    const accentPart = currentText.substring(item.main.length);

    return (
        <span className="relative">
            <span style={{ color: mainColor }}>{mainPart}</span>
            <span style={{ color: accentColor === "auto" ? item.color : accentColor }}>{accentPart}</span>
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[3px] h-[0.8em] bg-indigo-600 ml-1 mb-[-0.1em]"
            />
        </span>
    );
};

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
            paddingTop: 'clamp(60px, 10vw, 80px)',
            paddingBottom: 'clamp(3rem, 8vw, 6rem)'
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
            <div className="mb-12 lg:mb-20 px-4 sm:px-8 lg:px-12 relative z-10">
                <div className="section-container" style={{ padding: 'clamp(1rem, 3vw, 2rem) 1rem' }}>
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter leading-[1.1] [text-shadow:0_10px_30px_rgba(0,0,0,0.05)]"
                        >
                            {/* <span className="text-indigo-600" style={{ display: 'inline-block', minWidth: '400px' }}>
                                <Typewriter texts={['Admission Portal.', 'Student Academic Portal.', 'Fee Management.', 'Transport Management.', 'Hostel Automation.', 'HRMS & Payroll.', 'Pharmacy Inventory.']} />
                            </span> */}
                        </motion.h1>
                    </div>
                </div>
            </div>

            {/* Portal Cards Section */}
            <div className="section-container px-6 sm:px-10 lg:px-12 relative z-10">
                <div className="flex flex-col gap-16 lg:gap-32">
                    {portalDetails.map((portal, idx) => (
                        <PortalSection
                            key={portal.portalId}
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

    // Simplified transforms - removed parallax Y movement
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
            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-10 lg:gap-24 min-h-auto lg:min-h-[40vh]`}
        >
            {/* Image Visual - Clickable with 3D Tilt */}
            <div
                onClick={handlePortalClick}
                className="w-full lg:w-[42%] relative group block [perspective:2000px] cursor-pointer"
            >
                <motion.div
                    className="relative"
                >
                    <div
                        className="absolute inset-0 rounded-[2rem] lg:rounded-[3.5rem] blur-2xl lg:blur-3xl opacity-20 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: portal.color }}
                    />
                    <motion.div
                        whileHover={{
                            boxShadow: isMobile ? '0 30px 60px rgba(0,0,0,0.08)' : `0 25px 50px -12px ${portal.color}30`,
                            borderColor: portal.color + '30'
                        }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] border border-white/60 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] lg:shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-all duration-700 aspect-[16/9] w-full"
                    >
                        <img
                            src={portal.image}
                            alt={portal.title}
                            className="w-full h-full object-cover transition-transform duration-1000"
                        />
                        <div className="absolute mr-1 inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileInView={isMobile ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                                className="bg-white px-10 py-3 lg:px-16 lg:py-5 rounded-sm text-xs lg:text-base font-black text-slate-900 flex items-center gap-3 shadow-2xl"
                            >
                                Visit Portal <ExternalLink size={isMobile ? 16 : 18} />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Floating Micro-badge */}
                    {/* <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 lg:-top-6 -right-2 lg:-right-4 flex bg-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl lg:rounded-2xl shadow-xl border border-slate-50 items-center gap-2 z-20 scale-90 lg:scale-100"
                    >
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full animate-pulse" style={{ backgroundColor: portal.color }} />
                        <span className="text-[9px] lg:text-[10px] font-black text-slate-500 uppercase tracking-wider">Live Status</span>
                    </motion.div> */}
                </motion.div>
            </div>

            {/* Info Content - Parallax Text */}
            <motion.div
                className="w-full lg:w-[52%] flex flex-col justify-center gap-4 lg:gap-6 py-2 text-left"
            >
                <div className="">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-[10px] lg:text-sm font-black text-slate-400 uppercase tracking-wider leading-none mb-3 lg:mb-2 flex items-center gap-1"
                    >
                        <span className="w-8 lg:w-12 h-[2px]" style={{ backgroundColor: portal.color }} />
                        {portal.category}
                    </motion.div>
                    <h2 className="text-2xl lg:text-4xl font-extrabold mb-1">
                        <Typewriter
                            texts={[{ main: portal.titleMain, accent: portal.titleAccent + '.', color: portal.color }]}
                            mainColor="#0f172a"
                            accentColor="auto"
                            speed={100}
                            delay={3000}
                        />
                    </h2>
                </div>

                <p className="text-base lg:text-lg text-slate-500 leading-relaxed font-medium">
                    {portal.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                    {portal.features.map((f, i) => (
                        <motion.div
                            key={f}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 lg:gap-5 text-slate-800"
                        >
                            <div className="mt-1 bg-emerald-50 p-1 rounded-full shadow-inner">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                            </div>
                            <span className="text-sm lg:text-base font-bold leading-tight">{f}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PortalsPage;
