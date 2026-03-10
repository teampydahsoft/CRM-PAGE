import { motion } from 'framer-motion';
import CloudIllustrations from './CloudIllustrations';

const FeaturesSection = () => {
    return (
        <section id="features" className="relative bg-gradient-to-b from-white to-slate-50" style={{
            paddingTop: 'clamp(2rem, 8vw, 6rem)',
            paddingBottom: 'clamp(2rem, 8vw, 6rem)',
            overflowX: 'hidden'
        }}>
            <div className="section-container">
                {/* Header Text */}
                <div className="text-center" style={{
                    marginBottom: 'clamp(1rem, 5vw, 4rem)'
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-extrabold text-slate-900"
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                            lineHeight: '1.2',
                            marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
                        }}
                    >
                        An Integrated <span className="text-indigo-600">Institutional Core.</span>
                    </motion.h2>
                    <p className="leading-relaxed text-slate-600 text-lg md:text-xl" style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}>
                        Experience the power of a fully connected campus where every module—from admissions to examinations—talks to the central nervous system.
                        <span className="block mt-2 font-medium text-indigo-500">
                            One Source of Truth. Infinite Possibilities.
                        </span>
                    </p>
                </div>

                {/* Diagram Container */}
                <div className="relative w-full">
                    {/* The Diagram Component - Self-responsive now */}
                    <CloudIllustrations />
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
