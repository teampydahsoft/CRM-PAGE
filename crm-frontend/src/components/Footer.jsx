import { motion } from 'framer-motion';
import {
    Facebook, Twitter, Instagram, Linkedin,
    Mail, Phone, MapPin, ExternalLink,
    ArrowRight, Github
} from 'lucide-react';

const Footer = () => {
    const portalLinks = [
        { name: 'Admission Portal', id: 'admissions-crm' },
        { name: 'Student Portal', id: 'student-portal' },
        { name: 'Fee Management', id: 'fee-management' },
        { name: 'Transport Hub', id: 'transport-management' },
        { name: 'HRMS & Payroll', id: 'hrms' }
    ];

    const companyLinks = [
        { name: 'About Us', href: '#' },
        { name: 'Features', href: '#' },
        { name: 'Success Stories', href: '#' },
        { name: 'Support', href: '#' },
        { name: 'Privacy Policy', href: '#' }
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Github, href: '#', label: 'GitHub' }
    ];

    return (
        <footer className="w-full h-40 relative overflow-hidden bg-[#0A0C10] text-white pt-12 pb-8 border-t border-white/5">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="section-container relative z-10 px-6 sm:px-12 h-full flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6">

                    {/* Brand Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">
                                P
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Pydah<span className="text-indigo-400">Soft</span>
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-sm text-[0.85rem]">
                            Empowering educational institutions with next-generation smart ERP solutions.
                            Automate operations and drive excellence.
                        </p>
                        <div className="flex gap-2 pt-2">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-white/10 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Portals Column */}
                    <div>
                        <h4 className="text-[0.95rem] font-semibold mb-4 text-white tracking-wide">Cloud Portals</h4>
                        <ul className="space-y-2">
                            {portalLinks.map((link, idx) => (
                                <li key={idx}>
                                    <button className="text-gray-400 hover:text-indigo-400 transition-all duration-300 flex items-center group text-[0.85rem]">
                                        <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-[0.95rem] font-semibold mb-4 text-white tracking-wide">Company</h4>
                        <ul className="space-y-2">
                            {companyLinks.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-gray-400 hover:text-indigo-400 transition-all duration-300 flex items-center group text-[0.85rem]">
                                        <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-[0.95rem] font-semibold mb-4 text-white tracking-wide">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex gap-3">
                                <MapPin className="text-indigo-400 shrink-0 mt-1" size={16} />
                                <span className="text-gray-400 leading-tight text-[0.85rem]">
                                    Pydah Group of Institutions,<br />
                                    Kakinada, AP, India
                                </span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail className="text-indigo-400 shrink-0" size={16} />
                                <a href="mailto:support@pydahsoft.com" className="text-gray-400 hover:text-white transition-colors text-[0.85rem]">
                                    support@pydahsoft.com
                                </a>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone className="text-indigo-400 shrink-0" size={16} />
                                <span className="text-gray-400 text-[0.85rem]">+91 1800-425-6789</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[0.75rem] text-gray-500 font-medium relative z-20">
                    <p>© {new Date().getFullYear()} PydahSoft Educational Systems.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>

            {/* Subtle Watermark BG */}
            <div className="absolute bottom-0 left-0 right-0 opacity-[0.012] pointer-events-none select-none overflow-hidden z-0">
                <span className="text-[15vw] font-[900] whitespace-nowrap leading-none tracking-tighter block text-center uppercase text-white/50">
                    PYDAHSOFT
                </span>
            </div>
        </footer>
    );
};

export default Footer;

