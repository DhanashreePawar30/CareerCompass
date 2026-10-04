import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Brain, Target, Briefcase, GraduationCap, Award, Sparkles, ChevronRight, Compass, ShieldCheck, Zap, Layers, Flame, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useAssessment } from '../context/AssessmentContext';
import { MagneticButton } from '../components/MagneticButton';
import { MetricCounter } from '../components/MetricCounter';
import { SpotlightCard } from '../components/SpotlightCard';
import { MarqueeTicker } from '../components/MarqueeTicker';

gsap.registerPlugin(ScrollTrigger);

export const LandingPage: React.FC = () => {
  const { isAssessmentComplete } = useAssessment();
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive Live Persona Simulator State
  const [selectedTrait, setSelectedTrait] = useState<'analytical' | 'creative' | 'leadership'>('analytical');

  const traitConfigs = {
    analytical: {
      title: 'The Strategic Systems Architect',
      fit: '96% Fit',
      salary: '₹18.5L - ₹32L / yr',
      vibe: 'High Autonomy • Deep Research Labs',
      roles: ['AI/ML Systems Architect', 'Quantitative Data Strategist'],
      vectors: [
        { label: 'Analytical Logic', score: 96 },
        { label: 'Technical Mindset', score: 92 },
        { label: 'Strategic Planning', score: 85 },
        { label: 'FIRO-B Dynamic', score: 76 },
        { label: 'Creative Problem Solving', score: 70 },
      ],
      accent: '#C86D51',
      desc: 'Excels at decomposing multi-layered logic, data architecture, and abstract problem spaces.',
    },
    creative: {
      title: 'The Creative Experience Technologist',
      fit: '94% Fit',
      salary: '₹15L - ₹28L / yr',
      vibe: 'Visual Craft • Design Systems',
      roles: ['Design Systems Engineer', 'Interactive Frontend Lead'],
      vectors: [
        { label: 'Creative Problem Solving', score: 95 },
        { label: 'Technical Mindset', score: 88 },
        { label: 'FIRO-B Dynamic', score: 84 },
        { label: 'Analytical Logic', score: 78 },
        { label: 'Strategic Planning', score: 72 },
      ],
      accent: '#D4A373',
      desc: 'Bridges aesthetic intuition, empathetic human-computer interaction, and frontend craftsmanship.',
    },
    leadership: {
      title: 'The Collaborative Innovation Catalyst',
      fit: '93% Fit',
      salary: '₹20L - ₹36L / yr',
      vibe: 'Empathetic Direction • Agile Growth',
      roles: ['Technical Product Lead', 'Engineering Manager'],
      vectors: [
        { label: 'Strategic Planning', score: 94 },
        { label: 'FIRO-B Dynamic', score: 92 },
        { label: 'Analytical Logic', score: 86 },
        { label: 'Creative Problem Solving', score: 80 },
        { label: 'Technical Mindset', score: 75 },
      ],
      accent: '#E07A5F',
      desc: 'Multiplier of team velocity, cross-functional alignment, and ambitious product vision.',
    },
  };

  const pillars = [
    {
      title: 'FIRO-B Interpersonal Metrics',
      icon: Users,
      tag: 'Psychometric',
      badgeColor: '#C86D51',
      description: 'Evaluates your underlying interpersonal needs across Inclusion, Control, and Affection to determine optimal workplace team dynamics.'
    },
    {
      title: 'Interest & Domain Passion',
      icon: Brain,
      tag: 'Affinity',
      badgeColor: '#3D5A80',
      description: 'Maps your intrinsic curiosities and problem-solving drivers to real-world industry domains.'
    },
    {
      title: 'Quantitative & Logic Aptitude',
      icon: Target,
      tag: 'Cognitive',
      badgeColor: '#C86D51',
      description: 'Assesses logical reasoning, analytical problem solving, and data interpretation strengths.'
    },
    {
      title: 'Workplace Preferences',
      icon: Briefcase,
      tag: 'Environment',
      badgeColor: '#1E3A34',
      description: 'Identifies whether you thrive in high-autonomy research, agile dev squads, or executive strategy roles.'
    },
    {
      title: 'Academic Record & Streams',
      icon: GraduationCap,
      tag: 'Foundation',
      badgeColor: '#5A6E68',
      description: 'Factors in your coursework, grades, and educational milestones for realistic roadmap alignment.'
    },
    {
      title: 'Skills & Competency Mapping',
      icon: Award,
      tag: 'Execution',
      badgeColor: '#C86D51',
      description: 'Catalogues your technical and soft skill tags to highlight immediate gaps and growth areas.'
    },
  ];

  const steps = [
    { number: '01', title: 'Take Assessment', desc: '54 FIRO-B questions + 30 Cognitive scenario tests in under 15 minutes.' },
    { number: '02', title: 'AI Neural Synthesis', desc: 'Our engine processes 84 multi-vector data points to compute your archetype.' },
    { number: '03', title: 'Unlock Persona Profile', desc: 'Add your academic stream & skills to generate your customized roadmap.' },
    { number: '04', title: 'Ranked Career Matches', desc: 'Receive ranked career clusters with transparent AI explainability metrics.' },
    { number: '05', title: '5-Year Learning Blueprint', desc: 'Bridge skill gaps with step-by-step milestone checklists & salary projections.' },
  ];

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });

    tl.from('.hero-badge-pill', { y: -30, opacity: 0, duration: 0.8 })
      .from('.hero-title-main', { y: 60, opacity: 0, duration: 1.1 }, '-=0.5')
      .from('.hero-description', { y: 35, opacity: 0, duration: 0.9 }, '-=0.7')
      .from('.hero-buttons-container', { scale: 0.92, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero-interactive-dashboard', { y: 50, opacity: 0, duration: 1.1 }, '-=0.6')
      .from('.hero-floating-node', { scale: 0, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5')
      .from('.hero-stat-card', { y: 30, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=0.4');

    // ScrollTrigger on Pillars
    gsap.from('.pillar-spotlight-item', {
      scrollTrigger: {
        trigger: '.pillars-showcase-grid',
        start: 'top 85%',
      },
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  const activeConf = traitConfigs[selectedTrait];

  return (
    <div ref={containerRef} className="space-y-28 pb-24 overflow-hidden bg-grid-pattern">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        
        {/* Futuristic Ambient Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#C86D51]/15 via-[#1E3A34]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
        <div className="absolute top-1/3 left-6 w-96 h-96 bg-[#1E3A34]/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-8 w-80 h-80 bg-[#C86D51]/10 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative">
          
          {/* Top Pill Badge */}
          <div className="hero-badge-pill inline-flex items-center gap-2 px-4 py-2 rounded-full badge-terracotta text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>AI-Driven Multi-Vector Psychometrics</span>
          </div>

          {/* Epic Main Headline with Shimmer */}
          <div className="space-y-3 max-w-5xl mx-auto">
            <h1 className="hero-title-main font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1E3A34] tracking-tight leading-[1.12]">
              Discover Your True Trajectory: <br />
              <span className="text-shimmer font-normal italic">
                Not Just Exam Marks
              </span>{' '}
              <span className="font-editorial not-italic text-[#1E3A34]">— Deep Career Alignment.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-description text-lg sm:text-xl text-[#5A6E68] max-w-3xl mx-auto leading-relaxed font-normal">
            Move beyond superficial marks and generic advice. CareerCompass unites <strong>FIRO-B interpersonal matrices</strong>, quantitative logic vectors, and domain affinity to uncover where you will truly excel.
          </p>

          {/* Hero CTAs */}
          <div className="hero-buttons-container flex items-center justify-center pt-2">
            {isAssessmentComplete ? (
              <Link to="/dashboard">
                <MagneticButton className="btn-forest px-9 py-4 rounded-xl text-base font-semibold shadow-xl flex items-center gap-3 group">
                  <span>Open Your Career Dashboard</span>
                  <ArrowRight className="w-5 h-5 text-[#C86D51] group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </Link>
            ) : (
              <Link to="/assessment">
                <MagneticButton className="btn-terracotta px-9 py-4 rounded-xl text-base font-bold shadow-xl flex items-center gap-3 group">
                  <span>Start Free Career Assessment</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </MagneticButton>
              </Link>
            )}
          </div>

          {/* ================= INTERACTIVE LIVE NEURAL SIMULATOR ================= */}
          <div className="hero-interactive-dashboard max-w-4xl mx-auto pt-8 relative">
            
            {/* Floating Orbiting Badges */}
            <div className="hero-floating-node hidden lg:flex absolute -top-4 -left-12 p-3.5 bg-white/90 backdrop-blur-md rounded-2xl border border-[#E5E2D9] shadow-xl items-center gap-3 animate-float z-20">
              <div className="w-9 h-9 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#C86D51]" />
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-[#1E3A34]">98.4% Accuracy</p>
                <p className="text-[#5A6E68]">FIRO-B Interpersonal Matrix</p>
              </div>
            </div>

            <div className="hero-floating-node hidden lg:flex absolute top-1/2 -right-14 p-3.5 bg-white/90 backdrop-blur-md rounded-2xl border border-[#E5E2D9] shadow-xl items-center gap-3 animate-float-reverse z-20">
              <div className="w-9 h-9 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-[#1E3A34]">₹18.5L Avg Target</p>
                <p className="text-emerald-700 font-semibold">+34% Market Demand</p>
              </div>
            </div>

            {/* The Main Simulator Card */}
            <div className="rounded-3xl border border-[#E5E2D9] bg-white/95 backdrop-blur-xl p-6 sm:p-9 shadow-2xl space-y-7 relative overflow-hidden text-left">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center shadow-xs">
                    <Compass className="w-5 h-5 text-[#C86D51]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C86D51]">
                      Real-Time Neural Simulator
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">
                      Instant Archetype Vector Matrix
                    </h3>
                  </div>
                </div>

                {/* Trait Tabs */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTrait('analytical')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTrait === 'analytical'
                        ? 'bg-[#1E3A34] text-white shadow-sm'
                        : 'bg-[#F9F8F3] text-[#5A6E68] border border-[#E5E2D9] hover:bg-[#F2F0E6]'
                    }`}
                  >
                    ⚡ Systems & Logic
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTrait('creative')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTrait === 'creative'
                        ? 'bg-[#1E3A34] text-white shadow-sm'
                        : 'bg-[#F9F8F3] text-[#5A6E68] border border-[#E5E2D9] hover:bg-[#F2F0E6]'
                    }`}
                  >
                    🎨 Interface Craft
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTrait('leadership')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTrait === 'leadership'
                        ? 'bg-[#1E3A34] text-white shadow-sm'
                        : 'bg-[#F9F8F3] text-[#5A6E68] border border-[#E5E2D9] hover:bg-[#F2F0E6]'
                    }`}
                  >
                    🚀 Product Leadership
                  </button>
                </div>
              </div>

              {/* Body: Live Radar SVG & Archetype Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Modern Multi-Dimension Trait Progress Matrix */}
                <div className="md:col-span-5 bg-[#F9F8F3] rounded-2xl p-5 border border-[#E5E2D9] space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#1E3A34]">Trait Vector Matrix</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#E5E2D9] text-[#C86D51] font-bold">5 DIMENSIONS</span>
                  </div>

                  <div className="space-y-2.5">
                    {activeConf.vectors.map((vec, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-[#1E3A34] text-[11px] truncate max-w-[150px]">{vec.label}</span>
                          <span className="font-mono font-bold text-[#C86D51] text-[11px]">{vec.score}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#E5E2D9] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${vec.score}%`,
                              backgroundColor: activeConf.accent,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1 text-center">
                    <span className="text-[10px] font-mono text-[#5A6E68]">✦ Dynamic Multidimensional Scoring</span>
                  </div>
                </div>

                {/* Right Details Block */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-[#C86D51]">Calculated Archetype</span>
                      <span className="badge-terracotta px-2.5 py-0.5 rounded-full text-xs font-bold">
                        {activeConf.fit}
                      </span>
                    </div>
                    <h4 className="font-editorial text-2xl font-bold text-[#1E3A34] mt-1">
                      {activeConf.title}
                    </h4>
                    <p className="text-sm text-[#5A6E68] leading-relaxed mt-1">
                      {activeConf.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#F9F8F3] rounded-xl border border-[#E5E2D9]">
                      <span className="text-[10px] uppercase font-bold text-[#5A6E68] block">Workplace Dynamic</span>
                      <span className="text-xs font-bold text-[#1E3A34] mt-0.5 block">{activeConf.vibe}</span>
                    </div>
                    <div className="p-3 bg-[#F9F8F3] rounded-xl border border-[#E5E2D9]">
                      <span className="text-[10px] uppercase font-bold text-[#5A6E68] block">Est. Market Salary</span>
                      <span className="text-xs font-bold text-[#C86D51] mt-0.5 block">{activeConf.salary}</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-[11px] font-bold uppercase text-[#1E3A34] block mb-1.5">Top Target Roles:</span>
                    <div className="flex flex-wrap gap-2">
                      {activeConf.roles.map((r, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-white border border-[#E5E2D9] text-xs font-semibold text-[#1E3A34] shadow-2xs">
                          ✦ {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Live Metric Statistics Bar */}
          <div className="hero-stat-card pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto border-t border-[#E5E2D9]">
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#E5E2D9]/70 shadow-2xs">
              <p className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E3A34]">
                <MetricCounter end={84} suffix=" Qs" duration={1.6} />
              </p>
              <p className="text-xs text-[#5A6E68] font-medium mt-1">Total Assessment Depth</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#E5E2D9]/70 shadow-2xs">
              <p className="font-editorial text-3xl sm:text-4xl font-bold text-[#C86D51]">
                <MetricCounter end={6} suffix=" Pillars" duration={1.6} />
              </p>
              <p className="text-xs text-[#5A6E68] font-medium mt-1">Holistic Profile Matrix</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#E5E2D9]/70 shadow-2xs">
              <p className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E3A34]">
                <MetricCounter end={94.2} decimals={1} suffix="%" duration={1.8} />
              </p>
              <p className="text-xs text-[#5A6E68] font-medium mt-1">Predictive Fit Accuracy</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#E5E2D9]/70 shadow-2xs">
              <p className="font-editorial text-3xl sm:text-4xl font-bold text-[#C86D51]">
                <MetricCounter end={150} prefix="" suffix="+ Roles" duration={1.6} />
              </p>
              <p className="text-xs text-[#5A6E68] font-medium mt-1">Industry Vector Database</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CONTINUOUS TELEMETRY MARQUEE ================= */}
      <MarqueeTicker />

      {/* ================= 6-PILLAR SPOTLIGHT SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="badge-terracotta px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Holistic Diagnostic Engine
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A34]">
            Built on 6 Core Assessment Pillars
          </h2>
          <p className="text-[#5A6E68] text-base leading-relaxed">
            We reject the idea that marks define your future. Our multi-dimensional engine balances psychometrics, cognitive logic, and genuine passion vectors.
          </p>
        </div>

        <div className="pillars-showcase-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <SpotlightCard
                key={idx}
                className="pillar-spotlight-item p-8 flex flex-col justify-between space-y-6 shadow-md hover:-translate-y-1.5 transition-transform"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center shadow-xs">
                      <IconComp className="w-6 h-6 text-[#C86D51]" />
                    </div>
                    <span className="badge-terracotta px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#1E3A34]">
                    {pillar.title}
                  </h3>
                  <p className="text-[#5A6E68] text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between text-xs font-semibold text-[#1E3A34]">
                  <span className="font-mono text-[#5A6E68]">PILLAR 0{idx + 1}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#C86D51]" />
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* ================= 5-STAGE PIPELINE ROADMAP ================= */}
      <section className="bg-[#1E3A34] text-[#F9F8F3] py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C86D51]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[#C86D51] font-mono text-xs font-bold uppercase tracking-widest">
              Seamless Step-by-Step Experience
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white">
              How CareerCompass Works
            </h2>
            <p className="text-[#A2B5AF] text-sm sm:text-base leading-relaxed">
              From psychometric self-discovery to an actionable 5-year blueprint in 5 simple stages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#142824] p-7 rounded-2xl border border-[#2C524A] space-y-4 hover:border-[#C86D51] transition-all group relative overflow-hidden flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-editorial text-3xl font-bold text-[#C86D51] block group-hover:scale-110 transition-transform origin-left">
                      {step.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C86D51]/50 group-hover:bg-[#C86D51]" />
                  </div>
                  <h4 className="font-editorial text-lg font-bold text-white">{step.title}</h4>
                  <p className="text-xs text-[#A2B5AF] leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-2 border-t border-[#2C524A]/60 flex items-center gap-1.5 text-[11px] font-mono text-[#C86D51]">
                  <span>Stage {idx + 1} of 5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL HIGH-IMPACT CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1E3A34] to-[#142824] text-[#F9F8F3] rounded-3xl p-10 sm:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden border border-[#2C524A]">
          <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-[#C86D51]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-80 h-80 bg-[#1E3A34]/50 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10 max-w-3xl mx-auto">
            <span className="badge-terracotta px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>100% Free Assessment • 15 Minutes</span>
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Ready to Discover Your True Career Fit?
            </h2>
            <p className="text-[#A2B5AF] text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Synthesize your interpersonal, cognitive, and passion vectors today. Unlock ranked career clusters and tailored 5-year learning roadmaps.
            </p>
          </div>

          <div className="pt-4 relative z-10">
            <Link to="/assessment">
              <MagneticButton className="btn-terracotta inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-base font-bold shadow-2xl group cursor-pointer">
                <span>Start Free Assessment Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
