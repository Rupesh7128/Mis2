import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RefreshCcw, Home, Sparkles, AlertCircle, Hexagon, LayoutDashboard, Lock, Activity, MessageCircle } from 'lucide-react';
import { FileData, AnalysisResult } from './types';
import { analyzeResume } from './services/geminiService';
import ResumeUploader from './components/ResumeUploader';
import AnalysisDashboard from './components/AnalysisDashboard';
import ContentGenerator from './components/ContentGenerator';
import LandingPage from './components/LandingPage';
import PaymentLock from './components/PaymentLock';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [step, setStep] = useState<'input' | 'results'>('input');
  const [resultTab, setResultTab] = useState<'analysis' | 'generator'>('analysis');
  
  const [resumeFile, setResumeFile] = useState<FileData | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Payment State
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    const paidStorage = localStorage.getItem('monuishere_paid');
    if (paidStorage === 'true') {
      setHasPaid(true);
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment_success') === 'true') {
      setHasPaid(true);
      localStorage.setItem('monuishere_paid', 'true');
    }
  }, []);

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    localStorage.setItem('monuishere_paid', 'true');
  };

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
        setAnalysisProgress(0);
        interval = setInterval(() => {
            setAnalysisProgress(prev => {
                if (prev >= 90) return prev; 
                return prev + Math.random() * 5;
            });
        }, 200);
    } else {
        setAnalysisProgress(100);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleAnalysis = async () => {
    if (!resumeFile || !jobDescription) {
      setError('Required Data Missing: Please provide both a PDF resume and a job description.');
      return;
    }
    setError(null);
    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(resumeFile, jobDescription);
      setAnalysisResult(result);
      setStep('results');
      setResultTab('analysis'); 
    } catch (err: any) {
      setError(err.message || 'Analysis Failed: Unable to process the file.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetApp = () => {
    setStep('input');
    setAnalysisResult(null);
    setResumeFile(null);
    setJobDescription('');
    setError(null);
  };

  const goHome = () => {
    setView('landing');
    resetApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const scrollToSection = (id: string) => {
    if (view !== 'landing') {
        setView('landing');
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-zinc-100 font-sans selection:bg-orange-500/30 selection:text-orange-100">
      
      {/* Global Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 z-[60]">
            <div 
              onClick={goHome}
              className="flex items-center gap-3 cursor-pointer group select-none hover:opacity-90 transition-opacity"
            >
              <div className="relative flex items-center justify-center w-8 h-8 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-orange-500/50 transition-all duration-300">
                <Hexagon className="w-4 h-4 text-orange-600 group-hover:text-orange-500 transition-colors" strokeWidth={2.5} />
              </div>
              <div className="flex items-baseline tracking-tight">
                 <span className="text-lg font-extrabold font-mono text-white tracking-tighter">MONU</span>
                 <span className="text-xs font-serif italic text-orange-500 mx-1.5 font-bold transform -translate-y-[1px]">is</span>
                 <span className="text-lg font-extrabold font-mono text-white tracking-tighter">HERE</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-zinc-400 tracking-wide">
                <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors uppercase">Features</button>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors uppercase">Pricing</button>
                <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors uppercase">About</button>
            </nav>

            <div className="flex items-center gap-3">
               {step === 'results' && view === 'app' && (
                  <button 
                    onClick={resetApp}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 hover:bg-zinc-900 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                  >
                    <RefreshCcw className="w-3 h-3" /> <span className="hidden sm:inline">NEW SCAN</span>
                  </button>
               )}
               {view === 'app' && (
                <button onClick={goHome} className="p-2 hover:bg-zinc-900 rounded-full text-zinc-500 hover:text-white transition-colors">
                    <Home className="w-5 h-5" />
                </button>
               )}
               {view === 'landing' && (
                   <button 
                    onClick={() => setView('app')}
                    className="px-4 py-1.5 bg-white text-black text-xs font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-orange-500/50"
                   >
                       LAUNCH APP
                   </button>
               )}
            </div>
      </header>

      {/* Content Container with Top Padding for Fixed Header */}
      <div className="flex-grow flex flex-col pt-16 h-screen max-h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 overflow-hidden h-full" 
            >
              <LandingPage onStart={() => setView('app')} />
            </motion.div>
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 overflow-hidden flex flex-col w-full max-w-[1600px] mx-auto"
            >
              <main className="flex-1 min-h-0 relative flex flex-col p-4 sm:p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  {step === 'input' ? (
                    <motion.div 
                      key="input"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="max-w-5xl mx-auto h-full flex flex-col justify-center pb-10 overflow-y-auto w-full scrollbar-hide relative"
                    >
                       <AnimatePresence>
                        {isAnalyzing && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-zinc-950/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center"
                            >
                                <div className="w-full max-w-md space-y-6 p-8">
                                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                                        <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-orange-500 animate-pulse" /> SYSTEM PROCESSING</span>
                                        <span>{Math.round(analysisProgress)}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                                            style={{ width: `${analysisProgress}%` }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-8 opacity-70">
                                        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${analysisProgress > 20 ? 'bg-green-500' : 'bg-zinc-700'}`}></div>
                                            PARSING_PDF_STRUCTURE
                                        </div>
                                        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${analysisProgress > 50 ? 'bg-green-500' : 'bg-zinc-700'}`}></div>
                                            SEMANTIC_MATCHING
                                        </div>
                                        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${analysisProgress > 75 ? 'bg-green-500' : 'bg-zinc-700'}`}></div>
                                            GAP_ANALYSIS
                                        </div>
                                        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${analysisProgress > 90 ? 'bg-green-500' : 'bg-zinc-700'}`}></div>
                                            GENERATING_REPORT
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                       </AnimatePresence>

                       <div className="mb-10 text-center lg:text-left">
                         <h2 className="text-4xl font-bold text-white mb-3">Optimize Your Career</h2>
                         <p className="text-zinc-400 text-base max-w-2xl">Upload your resume and the target job description. MonuisHere will engineer the perfect application package for you.</p>
                       </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="h-64 lg:h-80">
                           <ResumeUploader onFileUpload={setResumeFile} currentFile={resumeFile} />
                        </div>
                        <div className="flex flex-col h-64 lg:h-80">
                          <div className="flex justify-between items-center mb-3">
                            <label className="text-xs font-mono font-bold text-zinc-500 tracking-wider">
                               02 // JOB DESCRIPTION
                            </label>
                            <span className="text-xs text-zinc-600 font-mono">{jobDescription.length} chars</span>
                          </div>
                          
                          <div className="relative flex-1 group">
                            <textarea 
                              value={jobDescription}
                              onChange={(e) => setJobDescription(e.target.value)}
                              placeholder="Paste Job Description here..."
                              className="w-full h-full bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 text-sm text-zinc-300 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/10 placeholder:text-zinc-700 resize-none font-mono transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mb-6 p-4 bg-red-950/20 border border-red-900/30 rounded-lg flex items-center gap-3 text-red-400 text-sm mx-auto w-full lg:w-2/3 shadow-lg shadow-red-900/10"
                        >
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          <span className="font-medium">{error}</span>
                        </motion.div>
                      )}

                      <div className="flex justify-center lg:justify-end">
                        <button 
                          onClick={handleAnalysis}
                          disabled={isAnalyzing || !resumeFile || !jobDescription}
                          className={`group relative flex items-center gap-3 py-4 px-10 rounded-xl font-bold text-sm tracking-wide transition-all ${
                            isAnalyzing || !resumeFile || !jobDescription 
                              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                              : 'bg-orange-600 text-white hover:bg-orange-500 shadow-lg shadow-orange-900/20'
                          }`}
                        >
                            <span>INITIALIZE ANALYSIS</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col h-full overflow-hidden"
                    >
                      <div className="flex justify-center mb-6 shrink-0">
                        <div className="bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 flex gap-1">
                          <button
                            onClick={() => setResultTab('analysis')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              resultTab === 'analysis' 
                                ? 'bg-zinc-800 text-white shadow-sm' 
                                : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            <LayoutDashboard className={`w-4 h-4 ${resultTab === 'analysis' ? 'text-orange-500' : ''}`} />
                            Diagnostic Data
                          </button>
                          <button
                            onClick={() => setResultTab('generator')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              resultTab === 'generator' 
                                ? 'bg-zinc-800 text-white shadow-sm' 
                                : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            {resultTab === 'generator' && !hasPaid ? (
                                <Lock className="w-4 h-4 text-orange-500" />
                            ) : (
                                <Sparkles className={`w-4 h-4 ${resultTab === 'generator' ? 'text-orange-500' : ''}`} />
                            )}
                            Asset Generator
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 min-h-0 relative bg-zinc-900/20 border border-zinc-800/50 rounded-2xl overflow-hidden">
                        <AnimatePresence mode="wait">
                          {resultTab === 'analysis' ? (
                             <motion.div 
                                key="analysis-view"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full overflow-y-auto custom-scrollbar p-6"
                             >
                                {analysisResult && <AnalysisDashboard result={analysisResult} />}
                             </motion.div>
                          ) : (
                            <motion.div 
                                key="generator-view"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col"
                             >
                                {!hasPaid ? (
                                    <PaymentLock onPaymentVerified={handlePaymentSuccess} />
                                ) : (
                                    analysisResult && (
                                    <ContentGenerator 
                                        resumeFile={resumeFile!} 
                                        jobDescription={jobDescription} 
                                        analysis={analysisResult} 
                                    />
                                    )
                                )}
                             </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="shrink-0 pt-4 flex justify-between items-center text-[10px] text-zinc-600 font-mono">
                        <span>STATUS: {resultTab === 'analysis' ? 'ANALYZING' : (hasPaid ? 'GENERATING' : 'LOCKED')}</span>
                        <span>SESSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>
              {view === 'app' && (
                <footer className="shrink-0 border-t border-zinc-800 bg-zinc-950 py-6 px-6 z-50">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
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
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;