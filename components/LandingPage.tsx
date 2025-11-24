import React from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight, Eye, ShieldAlert, ChevronDown, ScanLine, BrainCircuit, FileSearch, Sparkles, FileText, CheckCircle2, MessageCircle, Rocket, Zap, Award, Disc } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const marqueeText = "KEYWORD GAP ANALYSIS  •  AI COVER LETTERS  •  INTERVIEW PREP  •  ATS SCORE OPTIMIZATION  •  ";
  const marqueeContent = Array(6).fill(marqueeText).join(""); // Sufficient duplication

  return (
    <div className="relative h-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-black text-white selection:bg-orange-500/30 font-sans custom-scrollbar">
      
      {/* Fixed Background Noise */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      
      {/* --- SECTION 1: HERO --- */}
      <section className="relative h-screen min-h-[700px] snap-start flex flex-col items-center justify-center p-6 overflow-hidden pt-16 md:pt-0">
        {/* Dynamic Background */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-600/20 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] opacity-40"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center flex flex-col items-center max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/50 backdrop-blur-md hover:border-orange-500/50 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300">
              Neural Engine v2.5 Online
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.85] select-none">
            CAREER<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-700">ARCHITECT</span>
          </h1>

          <p className="max-w-xl text-lg text-zinc-400 mb-8 leading-relaxed font-light">
            Deconstruct the hiring algorithm. <br />
            We reverse-engineer Job Descriptions to build the perfect applicant profile using advanced AI.
          </p>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={onStart}
              className="group relative px-10 py-4 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 hover:bg-orange-500 hover:text-white overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">Launch Interface <ArrowRight className="w-4 h-4" /></span>
              <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-orange-500/50 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </button>
            
            <div className="flex flex-col items-center animate-pulse">
                <div className="flex items-center gap-2 text-sm font-mono text-orange-500 font-bold tracking-widest border border-orange-500/30 px-4 py-2 rounded-full bg-orange-500/10 backdrop-blur-md">
                    <Rocket className="w-4 h-4" /> UNLOCK YOUR DREAM JOB FOR ONLY $1.00
                </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-zinc-600 pointer-events-none"
        >
            <ChevronDown className="w-6 h-6" />
        </motion.div>

        {/* NEWS TICKER - Absolute Bottom Seamless Loop */}
        <div className="absolute bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-900 z-30 overflow-hidden py-3">
            <div className="flex animate-marquee whitespace-nowrap w-[200%]">
                <span className="text-xs md:text-sm font-mono tracking-[0.15em] font-bold text-zinc-500 flex items-center w-1/2 justify-around">
                     {marqueeContent}
                </span>
                <span className="text-xs md:text-sm font-mono tracking-[0.15em] font-bold text-zinc-500 flex items-center w-1/2 justify-around">
                     {marqueeContent}
                </span>
            </div>
        </div>
      </section>

      {/* --- SECTION 2: THE PROCESS (Features) --- */}
      <section id="features" className="relative h-screen min-h-[700px] snap-start bg-black flex flex-col items-center justify-center p-6 border-t border-zinc-900">
         <div className="max-w-7xl w-full flex flex-col h-full justify-center">
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
                <p className="text-zinc-500 max-w-2xl mx-auto">Three steps to dominate the application process.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-stretch relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 z-0"></div>

                {/* Card 1 */}
                <FeatureCard 
                    step="01"
                    title="Diagnostic Scan"
                    desc="Our engine extracts structural data from your PDF and compares it against the target JD in real-time."
                    delay={0}
                >
                    <div className="relative w-full h-32 bg-zinc-900 rounded-lg border border-zinc-800 mb-6 overflow-hidden flex items-center justify-center group-hover:border-orange-500/30 transition-colors">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]"></div>
                        <div className="flex flex-col items-center gap-2 z-10">
                            <FileSearch className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
                            <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-2/3 animate-[scan_2s_ease-in-out_infinite]"></div>
                            </div>
                        </div>
                    </div>
                </FeatureCard>

                {/* Card 2 */}
                <FeatureCard 
                    step="02"
                    title="Identity Optimization"
                    desc="We identify missing keywords and rewrite your content to match the employer's language perfectly."
                    delay={0.2}
                >
                    <div className="relative w-full h-32 bg-zinc-900 rounded-lg border border-zinc-800 mb-6 overflow-hidden flex items-center justify-center group-hover:border-orange-500/30 transition-colors">
                        <div className="absolute top-4 right-4 text-xs font-mono text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">+25% Match</div>
                        <div className="flex items-center gap-4 z-10">
                            <div className="w-10 h-12 border border-zinc-700 bg-zinc-800 rounded flex items-center justify-center text-zinc-500 scale-90">
                                <span className="text-[8px] font-mono">OLD</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-zinc-600" />
                            <div className="w-10 h-12 border border-orange-500/50 bg-orange-500/10 rounded flex items-center justify-center text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)] scale-110">
                                <Sparkles className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </FeatureCard>

                {/* Card 3 */}
                <FeatureCard 
                    step="03"
                    title="Asset Generation"
                    desc="Instantly generate tailored resumes, persuasive cover letters, and interview Q&A kits."
                    delay={0.4}
                >
                    <div className="relative w-full h-32 bg-zinc-900 rounded-lg border border-zinc-800 mb-6 overflow-hidden flex items-center justify-center group-hover:border-orange-500/30 transition-colors">
                         <div className="grid grid-cols-2 gap-2 z-10">
                            <div className="p-2 bg-zinc-800 rounded border border-zinc-700 flex items-center gap-2">
                                <FileText className="w-3 h-3 text-blue-400" />
                                <div className="w-8 h-1 bg-zinc-600 rounded"></div>
                            </div>
                            <div className="p-2 bg-zinc-800 rounded border border-zinc-700 flex items-center gap-2">
                                <BrainCircuit className="w-3 h-3 text-purple-400" />
                                <div className="w-8 h-1 bg-zinc-600 rounded"></div>
                            </div>
                            <div className="col-span-2 p-2 bg-zinc-800 rounded border border-zinc-700 flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                <div className="w-12 h-1 bg-zinc-600 rounded"></div>
                            </div>
                         </div>
                    </div>
                </FeatureCard>
            </div>
         </div>
      </section>

      {/* --- SECTION 3: THE PROBLEM --- */}
      <section className="relative h-screen min-h-[700px] snap-start bg-zinc-950 flex items-center justify-center p-6 border-t border-zinc-900">
         <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
             >
                 <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20">
                     <ShieldAlert className="w-6 h-6 text-orange-500" />
                 </div>
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                     The <span className="text-orange-500">Black Hole</span>.
                 </h2>
                 <p className="text-zinc-400 text-lg leading-relaxed mb-8 border-l-2 border-orange-900/50 pl-6">
                     75% of resumes are rejected by ATS algorithms before a human ever sees them. Your skills aren't the problem—your formatting, keywords, and semantic matching are.
                 </p>
                 <div className="flex flex-col gap-3">
                     <div className="flex items-center gap-3 text-sm font-mono text-orange-400 bg-orange-950/20 p-3 rounded-lg border border-orange-900/20">
                        <ScanLine className="w-4 h-4" /> 01. PARSING ERRORS & INCOMPATIBILITY
                     </div>
                     <div className="flex items-center gap-3 text-sm font-mono text-orange-400 bg-orange-950/20 p-3 rounded-lg border border-orange-900/20">
                        <Target className="w-4 h-4" /> 02. MISSING KEYWORD DENSITY
                     </div>
                 </div>
             </motion.div>
             
             <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square rounded-full border border-zinc-800 bg-zinc-900/50 flex items-center justify-center overflow-hidden shadow-2xl shadow-orange-900/20"
             >
                 <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#f97316_100%)] opacity-20 animate-spin duration-[10s]"></div>
                 <div className="absolute inset-[2px] bg-zinc-950 rounded-full"></div>
                 <div className="text-center z-10 relative">
                     <div className="text-7xl font-bold text-white mb-2 tracking-tighter">75%</div>
                     <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Rejection Rate</div>
                 </div>
             </motion.div>
         </div>
      </section>

      {/* --- SECTION 4: SEE WHAT AI SEES --- */}
      <section className="relative h-screen min-h-[700px] snap-start bg-zinc-900 flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-7xl w-full relative z-10 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">
                    See What <br/><span className="text-orange-500">AI Sees</span>
                </h2>
                <p className="max-w-2xl mx-auto text-xl text-zinc-400 font-light">
                    We utilize advanced Large Language Models to mimic enterprise ATS logic. We scan your resume against the job description to reveal exactly why you're not getting called back.
                </p>
            </motion.div>

            {/* Neural Grid - Visual Refinement */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
            >
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-colors group">
                    <div className="text-xs font-mono text-orange-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Disc className="w-1.5 h-1.5" /> Analysis 01
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-100 transition-colors">Semantic Matching</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Ensures your experience contextually aligns with the JD requirements rather than just simple keyword stuffing.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-blue-500/50 transition-colors group">
                    <div className="text-xs font-mono text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Disc className="w-1.5 h-1.5" /> Analysis 02
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">Entity Extraction</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Verifies that key tools, skills, and certifications are correctly parsed and prioritized by the algorithms.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-colors group">
                    <div className="text-xs font-mono text-purple-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                         <Disc className="w-1.5 h-1.5" /> Analysis 03
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">Sentiment Scoring</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Evaluates the tone, confidence, and impact of your professional summary and bullet points.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-green-500/50 transition-colors group">
                    <div className="text-xs font-mono text-green-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                         <Disc className="w-1.5 h-1.5" /> Analysis 04
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-100 transition-colors">Format Validation</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Checks for layout issues, tables, or images that confuse standard parsing algorithms and result in rejection.</p>
                </div>
            </motion.div>
        </div>
      </section>

      {/* --- SECTION 5: STATS/TRUST (Mapped to "About") --- */}
      <section id="about" className="relative h-screen min-h-[700px] snap-start bg-zinc-950 flex items-center justify-center p-6 border-t border-zinc-900">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-12">
                  <StatItem value="300%" label="Increase in Callbacks" />
                  <StatItem value="15s" label="Average Analysis Time" />
                  <StatItem value="10k+" label="Resumes Optimized" />
              </div>
              <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-6 text-white">Proven Results.</h3>
                  <blockquote className="text-zinc-400 leading-relaxed mb-8 italic border-l-4 border-orange-500 pl-6 py-2 text-xl">
                      "I applied to 50 jobs with no response. After using MonuisHere to tailor my resume for a specific role at a FAANG company, I got an interview the next day."
                  </blockquote>
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 font-bold">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                          <p className="font-bold text-white">Alex Chen</p>
                          <p className="text-xs text-zinc-500 font-mono">Senior Software Engineer</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- SECTION 6: CTA (Mapped to "Pricing") --- */}
      <section id="pricing" className="relative h-screen min-h-[700px] snap-start flex flex-col">
          <div className="flex-1 bg-orange-600 flex items-center justify-center p-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
            
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center"
            >
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-lg leading-tight">
                    INVEST $1.<br/> LAND THE JOB.
                </h2>
                <p className="text-orange-100 text-lg max-w-2xl mx-auto mb-10 font-medium">
                    Stop getting rejected for free. <br/>
                    For just <span className="font-bold underline decoration-4 decoration-white/30">$1.00</span>, we deconstruct the hiring algorithm and hand you the keys to your dream career.
                </p>
                <button 
                    onClick={onStart}
                    className="bg-black text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-2xl border border-white/10"
                >
                    GET PREMIUM ACCESS - $1.00 <ArrowRight />
                </button>
                <p className="mt-8 text-orange-100 font-mono text-xs uppercase tracking-widest opacity-80">
                    Instant Access • Secure Payment • Satisfaction Guaranteed
                </p>
            </motion.div>
          </div>

          {/* FOOTER */}
          <footer className="bg-black border-t border-zinc-900 py-12 px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                      <Zap className="w-6 h-6 text-zinc-500" />
                      <span className="font-bold text-white tracking-tight">MONUisHERE</span>
                  </div>
                  
                  <div className="text-zinc-500 text-xs font-mono flex items-center gap-1.5">
                      Made within <span className="font-black text-orange-500 tracking-wider">Kok</span>
                  </div>

                  <div className="flex items-center gap-6">
                       <a href="https://www.linkedin.com/in/ranjit-kumar-ds/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-orange-500 transition-colors border-b border-dashed border-zinc-700 pb-0.5 hover:border-orange-500">
                          <MessageCircle className="w-3.5 h-3.5" />
                          CONTACT SUPPORT
                       </a>
                  </div>
              </div>
          </footer>
      </section>

    </div>
  );
};

const FeatureCard = ({ title, desc, delay, step, children }: { title: string, desc: string, delay: number, step: string, children?: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ delay, duration: 0.6 }}
    className="relative z-10 p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900/80 transition-all duration-300 group flex flex-col items-center text-center shadow-xl hover:shadow-orange-900/10 hover:border-zinc-700 hover:-translate-y-1"
  >
    <div className="absolute top-4 left-4 text-xs font-mono font-bold text-zinc-700 group-hover:text-orange-500/50 transition-colors">
       STEP {step}
    </div>
    
    <div className="mt-4 w-full">
        {children}
    </div>

    <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-orange-500 transition-colors">{title}</h3>
    <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">{desc}</p>
  </motion.div>
);

const StatItem = ({ value, label }: { value: string, label: string }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="border-l-4 border-orange-500 pl-6"
    >
        <div className="text-5xl md:text-6xl font-black text-white mb-1 tracking-tighter">{value}</div>
        <div className="text-zinc-500 font-mono uppercase tracking-widest text-xs font-bold">{label}</div>
    </motion.div>
)

export default LandingPage;