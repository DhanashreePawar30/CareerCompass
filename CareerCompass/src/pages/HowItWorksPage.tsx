import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck, HeartHandshake, BrainCircuit, LineChart, Compass, CheckCircle2, Layers } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const pipelineSteps = [
    {
      step: '01',
      title: 'Tell Us About Yourself',
      icon: UserCheck,
      subtitle: 'Student Profile & Milestone Baseline',
      route: '/profile',
      description: 'Collect your personal background, educational stage, major subjects, percentage scores, and practical skill tags. This establishes your baseline academic trajectory.',
      details: [
        'Personal demographics & contact validation',
        'Academic level (Undergrad, Postgrad, High School)',
        'Subject matter interests & current grade metrics',
        'Skill tag cloud selection (Python, SQL, Figma, Public Speaking, etc.)'
      ]
    },
    {
      step: '02',
      title: 'Complete FIRO-B Assessment',
      icon: HeartHandshake,
      subtitle: '54 Interpersonal Metric Questions',
      route: '/assessment/firo-b',
      description: 'FIRO-B (Fundamental Interpersonal Relations Orientation-Behavior) measures how you naturally relate to team members across Inclusion, Control, and Affection.',
      details: [
        'Expressed vs. Wanted Inclusion score',
        'Expressed vs. Wanted Control score (Leadership orientation)',
        'Expressed vs. Wanted Affection score (Team warmth)',
        '6-point Likert scale (Strongly Agree to Strongly Disagree)'
      ]
    },
    {
      step: '03',
      title: 'CareerCompass Custom Test',
      icon: BrainCircuit,
      subtitle: '30 Aptitude & Scenario Questions',
      route: '/assessment/custom',
      description: 'Tests your quantitative aptitude, logical reasoning, problem-solving instincts, and real-world work environment preferences.',
      details: [
        'Aptitude & Pattern Recognition puzzles',
        'Scenario-based problem-solving choices',
        'Work environment style choices (Deep focus vs. agile squads)',
        'Instant response saving & state persistence'
      ]
    },
    {
      step: '04',
      title: 'Build Your Career Profile',
      icon: LineChart,
      subtitle: 'Multi-Dimensional AI Profiling Engine',
      route: '/assessment/complete',
      description: 'Our proprietary evaluation matrix synthesizes your FIRO-B scores, aptitude results, interest traits, and academic background in real time.',
      details: [
        'Multi-vector data normalization',
        'Trait radar chart generation',
        'Career cluster scoring matching',
        'Explainability tag generator ("Why This Match?")'
      ]
    },
    {
      step: '05',
      title: 'Get Ranked Recommendations',
      icon: Compass,
      subtitle: 'Interactive Career Dashboard & Explorer',
      route: '/dashboard/recommendations',
      description: 'Explore top career cluster recommendations, match percentages, required skill roadmaps, average salary ranges, and academic growth tracks.',
      details: [
        'Top 5 matched career paths with fit percentages',
        'Explainability tags justifying each match',
        'Deep-dive explorer for individual careers (e.g. Data Analyst)',
        'Custom 0-18 month skill development action plans'
      ]
    },
  ];

  const currentStep = pipelineSteps[activeStepIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="badge-terracotta px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          End-to-End Methodology
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#1E3A34]">
          The 5-Step Career Assessment Pipeline
        </h1>
        <p className="text-[#5A6E68] text-base leading-relaxed">
          Explore how CareerCompass converts your interpersonal preferences, quantitative aptitude, and academic history into actionable career clarity.
        </p>
      </div>

      {/* Horizontal Interactive Step Pipeline */}
      <div className="space-y-8">
        
        {/* Step Buttons Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {pipelineSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const IconComp = step.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3A34] text-[#F9F8F3] border-[#1E3A34] shadow-md scale-102'
                    : 'bg-white text-[#1E3A34] border-[#E5E2D9] hover:bg-[#F2F0E6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#C86D51]' : 'text-[#5A6E68]'}`}>
                    Step {step.step}
                  </span>
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#C86D51]' : 'text-[#1E3A34]'}`} />
                </div>
                <div>
                  <h4 className="font-editorial text-sm font-bold leading-tight">{step.title}</h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Expanded Details Card */}
        <div className="editorial-card p-8 sm:p-12 space-y-8 animate-fade-in bg-white border border-[#E5E2D9] shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E5E2D9] pb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#C86D51] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                {currentStep.step}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
                  {currentStep.subtitle}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34]">
                  {currentStep.title}
                </h3>
              </div>
            </div>

            <Link
              to={currentStep.route}
              className="btn-terracotta inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold shadow-sm self-start md:self-auto"
            >
              <span>Launch Step {currentStep.step}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-editorial text-lg font-bold text-[#1E3A34]">Pipeline Description</h4>
              <p className="text-[#5A6E68] text-base leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            <div className="space-y-4 bg-[#F9F8F3] p-6 rounded-2xl border border-[#E5E2D9]">
              <h4 className="font-editorial text-base font-bold text-[#1E3A34] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C86D51]" />
                <span>Key Component Breakdown</span>
              </h4>
              <ul className="space-y-2.5">
                {currentStep.details.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-[#1E3A34]">
                    <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>

      {/* Start Banner */}
      <div className="bg-[#F3F1E7] border border-[#E2DEC8] p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="font-editorial text-2xl font-bold text-[#1E3A34]">Ready to run the pipeline?</h3>
          <p className="text-[#5A6E68] text-sm mt-1">Start by filling out your student profile or jump right into the assessment.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/profile" className="px-6 py-3 rounded-xl bg-white border border-[#E5E2D9] text-[#1E3A34] font-semibold text-sm hover:bg-[#F9F8F3]">
            Edit Profile
          </Link>
          <Link to="/assessment" className="btn-terracotta px-6 py-3 rounded-xl text-sm font-semibold">
            Start Assessment →
          </Link>
        </div>
      </div>

    </div>
  );
};
