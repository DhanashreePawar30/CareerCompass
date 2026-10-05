import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Brain, Target, Briefcase, GraduationCap, Award, Sparkles, Compass } from 'lucide-react';
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
    { number: '05', title: 'Personalized Career Roadmap', desc: 'Bridge skill gaps with step-by-step milestone checklists & salary projections.' },
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


  return (
    <div ref={containerRef} className="space-y-28 pb-24 overflow-hidden bg-grid-pattern" style={{ zoom: 0.9 }}>
      
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
            <span>Multi-Vector Psychometrics</span>
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
              <Link to="/login">
                <MagneticButton className="btn-terracotta px-9 py-4 rounded-xl text-base font-bold shadow-xl flex items-center gap-3 group">
                  <span>Start Free Career Assessment</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </MagneticButton>
              </Link>
            )}
          </div>

          {/* ================= CAREER PROFILE PREVIEW ================= */}
          <div className="hero-interactive-dashboard max-w-4xl mx-auto pt-8 relative">
            <div className="rounded-3xl border border-[#E5E2D9] bg-white/95 backdrop-blur-xl p-6 sm:p-9 shadow-2xl space-y-7 relative overflow-hidden text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center shadow-xs">
                    <Compass className="w-5 h-5 text-[#C86D51]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C86D51]">
                      Career Profile Preview
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">
                      Your Interpersonal & Career Insights
                    </h3>
                  </div>
                </div>
                <span className="badge-terracotta px-3 py-1 rounded-full text-xs font-bold">
                  FIRO-B Assessment
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 bg-[#F9F8F3] rounded-2xl p-5 border border-[#E5E2D9] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#1E3A34]">Interpersonal Dimensions</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#E5E2D9] text-[#C86D51] font-bold">3 AREAS</span>
                  </div>

                  {[
                    { label: 'Inclusion', expressed: 'Expressed', wanted: 'Wanted', e: 76, w: 64 },
                    { label: 'Control', expressed: 'Expressed', wanted: 'Wanted', e: 68, w: 72 },
                    { label: 'Affection', expressed: 'Expressed', wanted: 'Wanted', e: 58, w: 70 },
                  ].map((dimension) => (
                    <div key={dimension.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#1E3A34]">{dimension.label}</span>
                        <span className="text-[10px] font-mono text-[#5A6E68]">{dimension.expressed} / {dimension.wanted}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full h-1.5 bg-[#E5E2D9] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#C86D51]" style={{ width: `${dimension.e}%` }} />
                        </div>
                        <div className="w-full h-1.5 bg-[#E5E2D9] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#1E3A34]" style={{ width: `${dimension.w}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-1 flex items-center justify-center gap-3 text-[10px] font-mono text-[#5A6E68]">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#C86D51]" />Expressed</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1E3A34]" />Wanted</span>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-[#C86D51]">What your results can reveal</span>
                    <h4 className="font-editorial text-2xl font-bold text-[#1E3A34] mt-1">
                      A clearer picture of how you relate to others
                    </h4>
                    <p className="text-sm text-[#5A6E68] leading-relaxed mt-2">
                      FIRO-B helps identify your interpersonal needs around inclusion, control, and affection — giving you useful context for communication, teamwork, and workplace relationships.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-4 bg-[#F9F8F3] rounded-xl border border-[#E5E2D9]">
                      <span className="text-[10px] uppercase font-bold text-[#5A6E68] block">Profile Insight</span>
                      <span className="text-sm font-bold text-[#1E3A34] mt-1 block">Interpersonal preferences</span>
                    </div>
                    <div className="p-4 bg-[#F9F8F3] rounded-xl border border-[#E5E2D9]">
                      <span className="text-[10px] uppercase font-bold text-[#5A6E68] block">Assessment Output</span>
                      <span className="text-sm font-bold text-[#1E3A34] mt-1 block">Expressed & wanted needs</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-[11px] font-bold uppercase text-[#1E3A34] block mb-2">CareerCompass uses this to help you understand:</span>
                    <div className="flex flex-wrap gap-2">
                      {['Team dynamics', 'Communication style', 'Workplace preferences'].map((item) => (
                        <span key={item} className="px-3 py-1 rounded-lg bg-white border border-[#E5E2D9] text-xs font-semibold text-[#1E3A34] shadow-2xs">
                          ✦ {item}
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
  <MetricCounter end={3} suffix=" Stages" duration={1.8} />
</p>
              <p className="text-sm sm:text-base text-[#5F746E]">
  Personalized Career Analysis
</p>
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


    </div>
  );
};
