import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, Target, Lightbulb } from 'lucide-react';
import { useRef } from 'react';

const AboutUsSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={containerRef} id="about" className="relative" style={{
            paddingTop: 'clamp(3rem, 10vw, 8rem)',
            paddingBottom: 'clamp(3rem, 10vw, 8rem)',
        }}>
            <div className="section-container">
                <div className="text-center sticky z-[100] bg-white/95 backdrop-blur-md py-4" style={{
                    top: '100px',
                    marginBottom: 'clamp(2rem, 5vw, 4rem)'
                }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-extrabold text-slate-900 tracking-tight"
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            lineHeight: '1.1',
                            margin: 0
                        }}
                    >
                        About <span style={{ color: 'var(--color-primary)' }}>Us</span>
                    </motion.h1>
                </div>

                {/* Branching Connection Container */}
                <div className="relative flex flex-col" style={{
                    maxWidth: '1100px',
                    margin: '0 auto'
                }}>
                    {/* Hand-Drawn Organic Curve - Connecting the Timeline */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-10">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="overflow-visible"
                        >
                            {/* Primary Animated Path */}
                            <motion.path
                                d="M 50 0 C 50 8, 41 8, 41 16 C 41 33, 59 33, 59 50 C 59 67, 41 67, 41 84 C 41 92, 50 92, 50 100"
                                fill="none"
                                stroke="var(--color-primary)"
                                strokeWidth="3"
                                vectorEffect="non-scaling-stroke"
                                style={{ pathLength }}
                            />
                            {/* Secondary Parallel Path (Ghost Line) */}
                            <motion.path
                                d="M 50 0 C 50 8, 41 8, 41 16 C 41 33, 59 33, 59 50 C 59 67, 41 67, 41 84 C 41 92, 50 92, 50 100"
                                fill="none"
                                stroke="var(--color-primary)"
                                strokeWidth="3"
                                strokeOpacity="0.4"
                                vectorEffect="non-scaling-stroke"
                                style={{
                                    pathLength,
                                    x: 3 // Small offset for the double-line effect
                                }}
                            />
                        </svg>
                    </div>

                    {/* Cards Content */}
                    <div className="relative z-20">
                        <BranchBlock
                            title="Our Vision"
                            icon={<Eye size={28} color="var(--color-primary)" />}
                            side="left"
                            content="We empower institutions with data-driven decision tools, streamlining the soil for institutional growth across India with minimal administrative effort."
                            delay={0.1}
                        />

                        <BranchBlock
                            title="Our Mission"
                            icon={<Target size={28} color="#ec4899" />}
                            side="right"
                            content="Revolutionizing legacy software into interconnected, intelligent interfaces that fuel productivity and collaboration for a new era in education."
                            delay={0.3}
                        />

                        <BranchBlock
                            title="Our Ideology"
                            icon={<Lightbulb size={28} color="#f59e0b" />}
                            side="left"
                            content="Removing the friction of administrative complexity, we allow educators to focus on learning and innovation by creating boundless institutional spaces."
                            delay={0.5}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const BranchBlock = ({ title, icon, content, side, delay }) => {
    return (
        <div className="relative w-full" style={{
            marginBottom: 'clamp(2rem, 5vw, 4rem)'
        }}>
            <motion.div
                initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay }}
                className={`flex items-center w-full ${side === 'left' ? 'justify-center md:justify-start' : 'justify-center md:justify-end'
                    }`}
            >
                <div className="branch-card bg-white border border-slate-100 relative flex flex-col md:w-[40%] md:max-w-none" style={{
                    maxWidth: '500px',
                    padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                    borderRadius: 'clamp(24px, 5vw, 40px)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
                    gap: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}>
                    {/* Linked Dot on Card Edge - visible on desktop to connect to curve */}
                    <div className={`branch-dot absolute top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)] z-30 hidden md:block ${side === 'left' ? '-right-2' : '-left-2'
                        }`} style={{
                            backgroundColor: 'var(--color-primary)',
                            width: '16px',
                            height: '16px',
                            border: '3px solid white'
                        }} />

                    <div className="rounded-2xl bg-slate-50 flex justify-center items-center border border-slate-100 flex-shrink-0" style={{
                        width: 'clamp(3rem, 5vw, 3.5rem)',
                        height: 'clamp(3rem, 5vw, 3.5rem)'
                    }}>
                        {icon}
                    </div>

                    <div>
                        <h3 className="font-extrabold tracking-tight" style={{
                            color: 'var(--color-text-main)',
                            fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
                            marginBottom: 'clamp(0.75rem, 1.8vw, 1rem)',
                            lineHeight: '1.3'
                        }}>
                            {title}
                        </h3>
                        <p className="leading-relaxed" style={{
                            color: 'var(--color-text-muted)',
                            fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                            lineHeight: '1.6'
                        }}>
                            {content}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutUsSection;
