import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Brain, Target, Briefcase, GraduationCap, Award, Sparkles, ChevronRight } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const LandingPage: React.FC = () => {
  const { isAssessmentComplete } = useAssessment();

  const pillars = [
    {
      title: 'FIRO-B Interpersonal Metrics',
      icon: Users,
      tag: 'Psychometric',
      description: 'Evaluates your underlying interpersonal needs across Inclusion, Control, and Affection to determine optimal workplace team dynamics.'
    },
    {
      title: 'Interest & Domain Passion',
      icon: Brain,
      tag: 'Affinity',
      description: 'Maps your intrinsic curiosities and problem-solving drivers to real-world industry domains.'
    },
    {
      title: 'Quantitative & Logic Aptitude',
      icon: Target,
      tag: 'Cognitive',
      description: 'Assesses logical reasoning, analytical problem solving, and data interpretation strengths.'
    },
    {
      title: 'Workplace Preferences',
      icon: Briefcase,
      tag: 'Environment',
      description: 'Identifies whether you thrive in high-autonomy research, agile dev squads, or executive strategy roles.'
    },
    {
      title: 'Academic Record & Streams',
      icon: GraduationCap,
      tag: 'Foundation',
      description: 'Factors in your coursework, grades, and educational milestones for realistic roadmap alignment.'
    },
    {
      title: 'Skills & Competency Mapping',
      icon: Award,
      tag: 'Execution',
      description: 'Catalogues your technical and soft skill tags to highlight immediate gaps and growth areas.'
    },
  ];

  const steps = [
    { number: '01', title: 'Tell us about yourself', desc: 'Enter personal details and academic milestones in 2 minutes.' },
    { number: '02', title: 'Complete FIRO-B', desc: '54 Likert-scale questions mapping interpersonal team dynamics.' },
    { number: '03', title: 'Take CareerCompass Test', desc: '30 scenario and logic questions assessing real aptitude.' },
    { number: '04', title: 'Build Career Profile', desc: 'AI engine synthesizes your multi-dimensional profile.' },
    { number: '05', title: 'Get Recommendations', desc: 'Receive ranked career matches with explainability insights.' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Subtle background embellishments */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C86D51]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#1E3A34]/5 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-terracotta text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#C86D51]" />
            <span>AI-Powered Career Intelligence</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1E3A34] tracking-tight leading-[1.15] max-w-5xl mx-auto">
            Discover Your True Potential: <br />
            <span className="italic text-[#C86D51] font-normal">Not just marks</span> — understand your career fit.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#5A6E68] max-w-3xl mx-auto leading-relaxed">
            Move beyond superficial entrance exam scores. CareerCompass combines FIRO-B psychometrics, quantitative aptitude, and work style profiling to reveal where you truly thrive.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {isAssessmentComplete ? (
              <Link
                to="/dashboard"
                className="btn-forest px-8 py-4 rounded-xl text-base font-semibold shadow-lg flex items-center gap-3"
              >
                <span>View My Career Profile</span>
                <ArrowRight className="w-5 h-5 text-[#C86D51]" />
              </Link>
            ) : (
              <Link
                to="/assessment"
                className="btn-terracotta px-8 py-4 rounded-xl text-base font-semibold shadow-lg flex items-center gap-3 group"
              >
                <span>Start Career Assessment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            <Link
              to="/how-it-works"
              className="px-8 py-4 rounded-xl bg-[#FFFFFF] border border-[#E5E2D9] text-[#1E3A34] font-semibold text-base hover:bg-[#F2F0E6] transition-all shadow-2xs"
            >
              How It Works →
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-[#E5E2D9]">
            <div>
              <p className="font-editorial text-3xl font-bold text-[#1E3A34]">84 Qs</p>
              <p className="text-xs text-[#5A6E68] font-medium mt-1">Total Assessment Depth</p>
            </div>
            <div>
              <p className="font-editorial text-3xl font-bold text-[#C86D51]">6 Pillars</p>
              <p className="text-xs text-[#5A6E68] font-medium mt-1">Holistic Profile Matrix</p>
            </div>
            <div>
              <p className="font-editorial text-3xl font-bold text-[#1E3A34]">94.2%</p>
              <p className="text-xs text-[#5A6E68] font-medium mt-1">Fit Accuracy Score</p>
            </div>
            <div>
              <p className="font-editorial text-3xl font-bold text-[#C86D51]">10+ Tracks</p>
              <p className="text-xs text-[#5A6E68] font-medium mt-1">Deep Career Roadmaps</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6-Pillar Feature Overview Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E3A34]">
            Built on 6 Core Assessment Pillars
          </h2>
          <p className="text-[#5A6E68] text-base">
            We don't look at marks in isolation. Our holistic framework analyzes who you are, how you work, and what energizes you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={idx}
                className="editorial-card p-8 flex flex-col justify-between space-y-6 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#F2F0E6] text-[#1E3A34] flex items-center justify-center">
                      <IconComp className="w-6 h-6 text-[#1E3A34]" />
                    </div>
                    <span className="badge-terracotta px-3 py-1 rounded-full text-xs font-semibold">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">
                    {pillar.title}
                  </h3>
                  <p className="text-[#5A6E68] text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between text-xs font-semibold text-[#1E3A34]">
                  <span>Pillar 0{idx + 1}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#C86D51]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Quick Preview */}
      <section className="bg-[#F3F1E7] border-y border-[#E2DEC8] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[#C86D51] font-mono text-sm font-semibold uppercase tracking-wider">
                Seamless Pipeline
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E3A34]">
                How CareerCompass Works
              </h2>
            </div>
            <Link
              to="/how-it-works"
              className="text-sm font-semibold text-[#C86D51] hover:text-[#B25A40] flex items-center gap-1 group"
            >
              <span>Explore Interactive Pipeline</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E5E2D9] space-y-3">
                <span className="font-editorial text-3xl font-bold text-[#C86D51] block">{step.number}</span>
                <h4 className="font-editorial text-base font-bold text-[#1E3A34]">{step.title}</h4>
                <p className="text-xs text-[#5A6E68] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E3A34] text-[#F9F8F3] rounded-3xl p-10 sm:p-16 text-center space-y-8 shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#C86D51]/20 rounded-full blur-2xl pointer-events-none" />

          <h2 className="font-editorial text-3xl sm:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Ready to Find Your True Career Fit?
          </h2>
          <p className="text-[#A2B5AF] text-base sm:text-lg max-w-xl mx-auto">
            Take the 84-question assessment today and unlock personalized career path recommendations with explainability insights.
          </p>
          <div className="pt-2">
            <Link
              to="/assessment"
              className="btn-terracotta inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold shadow-lg"
            >
              <span>Start Free Assessment Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
