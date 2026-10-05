import React from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import { Sparkles, ArrowRight, Compass, ShieldCheck, CheckCircle2, BrainCircuit, Lightbulb, Target, UserCheck, Loader2 } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { calculateArchetype } from '../data/archetypes';

export const DashboardPage: React.FC = () => {
  const {
    personalDetails,
    academicDetails,
    firoBScores,
    customTraitScores,
    rankedCareers,
    isAssessmentComplete,
    firoBAiInsight,
    isLoadingAi,
    generateFiroBAiInsight
  } = useAssessment();

  React.useEffect(() => {
    if (isAssessmentComplete && !firoBAiInsight && !isLoadingAi) {
      generateFiroBAiInsight();
    }
  }, [isAssessmentComplete, firoBAiInsight, isLoadingAi]);

  // Trait Radar Data derived from real scores
  const radarData = [
    { subject: 'Analytical Logic', score: Math.min(100, (customTraitScores.Analytical * 12) + 20) },
    { subject: 'Technical Mindset', score: Math.min(100, (customTraitScores.Technical * 12) + 15) },
    { subject: 'Creative Thinking', score: Math.min(100, (customTraitScores.Creative * 12) + 15) },
    { subject: 'Leadership & Strategy', score: Math.min(100, (customTraitScores.Leadership * 12) + 15) },
    { subject: 'Interpersonal Warmth', score: Math.min(100, (firoBScores.EA + firoBScores.WA) || 30) }
  ];

  // FIRO-B Scores Bar Data
  const firoBBarData = [
    { name: 'Expressed Inc.', score: firoBScores.EI, fill: '#1E3A34' },
    { name: 'Wanted Inc.', score: firoBScores.WI, fill: '#2C524A' },
    { name: 'Expressed Ctrl', score: firoBScores.EC, fill: '#C86D51' },
    { name: 'Wanted Ctrl', score: firoBScores.WC, fill: '#D9856C' },
    { name: 'Expressed Aff', score: firoBScores.EA, fill: '#4A6B5D' },
    { name: 'Wanted Aff', score: firoBScores.WA, fill: '#5F8576' }
  ];

  const topMatch = rankedCareers[0] || {
    id: 'data-analyst',
    title: 'Data Analyst & Business Intelligence Lead',
    cluster: 'Data & Analytics',
    matchScore: 92,
    salaryRange: { mid: '$85,000 - $115,000' },
    description: 'Transforms complex data streams into actionable strategic roadmaps.',
    workEnvironment: 'Collaborative analytics squads with focused deep-work time.',
    requiredSkills: ['SQL', 'Python', 'Tableau', 'Statistical Analysis'],
    academicTracks: [{ degree: 'B.Tech / B.S.', focus: 'Data Science & Applied Math' }]
  };

  const secondaryMatches = rankedCareers.slice(1, 4);
  const archetype = calculateArchetype(firoBScores, customTraitScores);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Assessment Status Notice */}
      {!isAssessmentComplete && (
        <div className="p-6 rounded-2xl bg-[#1E3A34] text-[#F9F8F3] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Compass className="w-8 h-8 text-[#C86D51] shrink-0" />
            <div>
              <p className="font-bold text-sm">Real-time baseline view.</p>
              <p className="text-xs text-[#A2B5AF]">Take the complete assessment to unlock your verified score breakdown and personalized metrics.</p>
            </div>
          </div>
          <Link
            to="/assessment"
            className="btn-terracotta px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2"
          >
            <span>Take Assessment Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Dashboard Greeting Banner */}
      <div className="bg-[#1E3A34] text-[#F9F8F3] p-8 sm:p-12 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C86D51]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142824] text-[#C86D51] border border-[#2C524A] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Persona: {archetype.title}</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white">
              Hi, {personalDetails.name || 'Career Explorer'}! 👋
            </h1>
            <p className="text-[#A2B5AF] text-sm sm:text-base max-w-2xl">
              "{archetype.tagline}" Here is your multi-vector Career Compass breakdown synthesized from your assessment metrics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              to="/assessment/unlock"
              className="px-5 py-3 rounded-xl bg-[#142824] border border-[#2C524A] text-white hover:bg-[#1a332e] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>View Archetype Card</span>
            </Link>

            <Link
              to="/dashboard/recommendations"
              className="btn-terracotta px-6 py-3 rounded-xl font-semibold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <span>All Recommendations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Details Chips */}
        <div className="pt-4 border-t border-[#2C524A] flex flex-wrap gap-4 text-xs text-[#A2B5AF]">
          <div>Archetype: <span className="font-semibold text-[#C86D51]">{archetype.title}</span></div>
          <div>•</div>
          <div>Academic Track: <span className="font-semibold text-white">{academicDetails.courseStream || 'Profile Configured'}</span></div>
          <div>•</div>
          <div>Top Role Match: <span className="font-semibold text-[#C86D51]">{topMatch.title} ({topMatch.matchScore}%)</span></div>
        </div>
      </div>

      {/* Grid: Radar Metrics & FIRO-B Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Trait Dimension Vector Matrix */}
        <div className="editorial-card p-6 sm:p-8 space-y-6 bg-white border border-[#E5E2D9]">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">Holistic Trait Dimension Matrix</h3>
              <p className="text-xs text-[#5A6E68]">Aptitude, Interests & Work Style Vector Breakdown</p>
            </div>
            <span className="badge-terracotta px-3 py-1 rounded-full text-xs font-bold">5 Vectors</span>
          </div>

          <div className="space-y-4 pt-2">
            {radarData.map((item, idx) => {
              const benchmarks = [
                'Top 5% Quantitative Aptitude',
                'Advanced Systems Craft',
                'Lateral Ideation & Vision',
                'Strategic Team Velocity',
                'Empathetic Interpersonal Dynamic'
              ];
              return (
                <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9]/70">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1E3A34]">{item.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#5A6E68] bg-white px-2 py-0.5 rounded border border-[#E5E2D9]">
                        {benchmarks[idx]}
                      </span>
                      <span className="font-mono font-bold text-[#C86D51] text-xs">
                        {item.score}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-[#E5E2D9] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#C86D51] to-[#1E3A34] transition-all duration-700"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FIRO-B Scores Bar Chart */}
        <div className="editorial-card p-6 sm:p-8 space-y-6 bg-white border border-[#E5E2D9]">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">FIRO-B Interpersonal Matrix</h3>
              <p className="text-xs text-[#5A6E68]">Inclusion, Control & Affection Scores</p>
            </div>
            <span className="badge-forest px-3 py-1 rounded-full text-xs font-bold">Psychometric</span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={firoBBarData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fill: '#1E3A34', fontSize: 10, fontWeight: 600 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 54]} tick={{ fill: '#5A6E68', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E3A34', borderRadius: '12px', color: '#F9F8F3', border: 'none' }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {firoBBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* AI Personalized FIRO-B Insights Card */}
      {isLoadingAi && !firoBAiInsight && (
        <div className="editorial-card p-6 bg-white border border-[#E5E2D9] flex items-center justify-center gap-3 text-[#1E3A34]">
          <Loader2 className="w-5 h-5 text-[#C86D51] animate-spin" />
          <span className="text-sm font-semibold">Synthesizing personalized FIRO-B career insights...</span>
        </div>
      )}

      {firoBAiInsight && (
        <div className="editorial-card p-8 sm:p-10 space-y-8 bg-white border border-[#E5E2D9] shadow-md relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-terracotta text-xs font-bold uppercase tracking-wider">
                <BrainCircuit className="w-4 h-4 text-[#C86D51]" />
                <span>AI-Powered FIRO-B Neural Synthesis</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34]">
                Personalized Interpersonal & Work Style Interpretation
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#5A6E68] bg-[#F9F8F3] px-3 py-1.5 rounded-lg border border-[#E5E2D9]">
              Enrichment Layer Active
            </span>
          </div>

          {/* Identity Insight Banner ("What kind of person am I?") */}
          {firoBAiInsight.identityInsight && (
            <div className="bg-[#1E3A34] text-[#F9F8F3] p-6 rounded-2xl space-y-2 border border-[#2C524A]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C86D51]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
                  Identity Insight: {firoBAiInsight.identityInsight.headline}
                </span>
              </div>
              <p className="text-sm text-[#A2B5AF] leading-relaxed">
                {firoBAiInsight.identityInsight.summary}
              </p>
            </div>
          )}

          {/* Overview Profile & Archetype Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F9F8F3] p-5 rounded-2xl border border-[#E5E2D9] space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">Overall Persona</p>
              <p className="text-sm text-[#1E3A34] leading-relaxed">{firoBAiInsight.firoBInterpretation.overallProfile}</p>
            </div>
            <div className="bg-[#F9F8F3] p-5 rounded-2xl border border-[#E5E2D9] space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1E3A34]">Interpersonal Orientation</p>
              <p className="text-sm text-[#5A6E68] leading-relaxed">{firoBAiInsight.firoBInterpretation.interpersonalStyle}</p>
            </div>
            <div className="bg-[#F9F8F3] p-5 rounded-2xl border border-[#E5E2D9] space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1E3A34]">Work Execution Style</p>
              <p className="text-sm text-[#5A6E68] leading-relaxed">{firoBAiInsight.firoBInterpretation.workStyle}</p>
            </div>
          </div>

          {/* Archetype Insight (AI explanation of the deterministic archetype) */}
          {firoBAiInsight.archetypeInsight && (
            <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#C86D51]/30 space-y-3">
              <h4 className="font-editorial text-lg font-bold text-[#1E3A34] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C86D51]" />
                <span>Archetype Synthesis: {archetype.title}</span>
              </h4>
              <p className="text-xs text-[#5A6E68] leading-relaxed">
                {firoBAiInsight.archetypeInsight.explanation}
              </p>
              {firoBAiInsight.archetypeInsight.workplaceStrengths && firoBAiInsight.archetypeInsight.workplaceStrengths.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="font-bold text-[#1E3A34]">Workplace Strengths:</span>
                  {firoBAiInsight.archetypeInsight.workplaceStrengths.map((str, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-200 font-medium">
                      ✓ {str}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3 Dimensional Cards: Inclusion, Control, Affection */}
          <div className="space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#1E3A34] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C86D51]" />
              <span>3-Vector Dimension Analysis</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Inclusion */}
              <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#E5E2D9] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-editorial font-bold text-base text-[#1E3A34]">Inclusion (EI + WI)</span>
                  <span className="text-[11px] font-mono text-[#5A6E68]">EI: {firoBScores.EI} | WI: {firoBScores.WI}</span>
                </div>
                <p className="text-xs text-[#5A6E68] leading-relaxed">{firoBAiInsight.dimensions.inclusion.summary}</p>
                <div className="pt-2 border-t border-[#E5E2D9] space-y-1.5 text-xs">
                  <p className="text-emerald-800 font-medium">✓ <strong>Strength:</strong> {firoBAiInsight.dimensions.inclusion.strength}</p>
                  <p className="text-amber-800 font-medium">⚑ <strong>Growth Area:</strong> {firoBAiInsight.dimensions.inclusion.developmentArea}</p>
                </div>
              </div>

              {/* Control */}
              <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#E5E2D9] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-editorial font-bold text-base text-[#1E3A34]">Control (EC + WC)</span>
                  <span className="text-[11px] font-mono text-[#5A6E68]">EC: {firoBScores.EC} | WC: {firoBScores.WC}</span>
                </div>
                <p className="text-xs text-[#5A6E68] leading-relaxed">{firoBAiInsight.dimensions.control.summary}</p>
                <div className="pt-2 border-t border-[#E5E2D9] space-y-1.5 text-xs">
                  <p className="text-emerald-800 font-medium">✓ <strong>Strength:</strong> {firoBAiInsight.dimensions.control.strength}</p>
                  <p className="text-amber-800 font-medium">⚑ <strong>Growth Area:</strong> {firoBAiInsight.dimensions.control.developmentArea}</p>
                </div>
              </div>

              {/* Affection */}
              <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#E5E2D9] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-editorial font-bold text-base text-[#1E3A34]">Affection (EA + WA)</span>
                  <span className="text-[11px] font-mono text-[#5A6E68]">EA: {firoBScores.EA} | WA: {firoBScores.WA}</span>
                </div>
                <p className="text-xs text-[#5A6E68] leading-relaxed">{firoBAiInsight.dimensions.affection.summary}</p>
                <div className="pt-2 border-t border-[#E5E2D9] space-y-1.5 text-xs">
                  <p className="text-emerald-800 font-medium">✓ <strong>Strength:</strong> {firoBAiInsight.dimensions.affection.strength}</p>
                  <p className="text-amber-800 font-medium">⚑ <strong>Growth Area:</strong> {firoBAiInsight.dimensions.affection.developmentArea}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Environment Fit & Actionable Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#1E3A34] text-[#F9F8F3] p-6 rounded-2xl space-y-4">
              <h4 className="font-editorial text-lg font-bold flex items-center gap-2 text-white">
                <UserCheck className="w-5 h-5 text-[#C86D51]" />
                <span>Work Environment & Responsibility Fit</span>
              </h4>
              <p className="text-xs text-[#A2B5AF] leading-relaxed">{firoBAiInsight.workEnvironmentFit.preferredEnvironment}</p>
              <div className="space-y-2 pt-2 border-t border-[#2C524A] text-xs">
                <p><strong className="text-white">Collaboration Style:</strong> {firoBAiInsight.workEnvironmentFit.collaborationStyle}</p>
                <p><strong className="text-white">Communication Style:</strong> {firoBAiInsight.workEnvironmentFit.communicationStyle}</p>
                {firoBAiInsight.workEnvironmentFit.responsibilityStyle && (
                  <p><strong className="text-white">Responsibility Style:</strong> {firoBAiInsight.workEnvironmentFit.responsibilityStyle}</p>
                )}
              </div>
            </div>

            <div className="bg-[#F9F8F3] p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
              <h4 className="font-editorial text-lg font-bold text-[#1E3A34] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#C86D51]" />
                <span>Actionable Development Steps</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-[#1E3A34]">
                {firoBAiInsight.actionableSuggestions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* Top #1 Career Match Showcase Card */}
      <div className="editorial-card p-8 sm:p-12 space-y-8 bg-[#FBF9F5] border-2 border-[#C86D51]/40 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 bg-[#C86D51] text-white px-6 py-2 rounded-bl-2xl font-mono text-xs font-bold uppercase tracking-wider">
          #1 Match Fit ({topMatch.matchScore}%)
        </div>

        <div className="space-y-4">
          <span className="badge-terracotta px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Primary Career Recommendation
          </span>

          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E3A34]">
            {topMatch.title}
          </h2>
          <p className="text-[#5A6E68] text-base leading-relaxed max-w-3xl">
            {topMatch.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E5E2D9]">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E2D9]">
            <p className="text-xs text-[#5A6E68] font-bold uppercase">Salary Potential</p>
            <p className="font-editorial text-xl font-bold text-[#1E3A34] mt-1">{topMatch.salaryRange.mid}</p>
            <p className="text-xs text-[#5A6E68]">Mid-Level Average</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E2D9]">
            <p className="text-xs text-[#5A6E68] font-bold uppercase">Work Environment</p>
            <p className="text-sm font-semibold text-[#1E3A34] mt-1 line-clamp-2">{topMatch.workEnvironment}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5E2D9] flex flex-col justify-between">
            <p className="text-xs text-[#5A6E68] font-bold uppercase">Required Key Skill</p>
            <p className="text-sm font-semibold text-[#C86D51] mt-1">{topMatch.requiredSkills[0]}</p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to={`/explorer/${topMatch.id}`}
            className="btn-terracotta px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-md"
          >
            <span>Explore Complete 5-Year Blueprint</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Secondary Career Matches Grid */}
      <div className="space-y-6">
        <h3 className="font-editorial text-2xl font-bold text-[#1E3A34]">
          Other High-Resonance Career Matches
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryMatches.map((career) => (
            <div key={career.id} className="editorial-card p-6 flex flex-col justify-between space-y-6 bg-white border border-[#E5E2D9] shadow-xs hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#C86D51] uppercase">
                    {career.cluster}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F2F0E6] text-xs font-bold text-[#1E3A34]">
                    {career.matchScore}% Fit
                  </span>
                </div>

                <h4 className="font-editorial text-lg font-bold text-[#1E3A34]">
                  {career.title}
                </h4>

                <p className="text-xs text-[#5A6E68] line-clamp-2 leading-relaxed">
                  {career.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E3A34]">{career.salaryRange.mid}</span>
                <Link
                  to={`/explorer/${career.id}`}
                  className="text-xs font-semibold text-[#C86D51] hover:text-[#B25A40] flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
