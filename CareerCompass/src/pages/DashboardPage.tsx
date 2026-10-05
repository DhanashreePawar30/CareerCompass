import React from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import {
  ArrowRight,
  HeartHandshake,
  LockKeyhole,
  Sparkles,
  Users,
  SlidersHorizontal,
  Heart,
  Loader2,
  Lightbulb,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const DashboardPage: React.FC = () => {
  const {
    personalDetails,
    academicDetails,
    firoBNormalizedScores,
    firoBDisplayScores,
    isFiroBComplete,
    firoBAiInsight,
    isLoadingAi,
    generateFiroBAiInsight
  } = useAssessment();

  React.useEffect(() => {
    if (isFiroBComplete && !firoBAiInsight && !isLoadingAi) {
      generateFiroBAiInsight();
    }
  }, [isFiroBComplete, firoBAiInsight, isLoadingAi, generateFiroBAiInsight]);

  const firoBBarData = [
    { name: 'Expressed Inc.', score: firoBDisplayScores.EI, fill: '#1E3A34' },
    { name: 'Wanted Inc.', score: firoBDisplayScores.WI, fill: '#2C524A' },
    { name: 'Expressed Ctrl', score: firoBDisplayScores.EC, fill: '#C86D51' },
    { name: 'Wanted Ctrl', score: firoBDisplayScores.WC, fill: '#D9856C' },
    { name: 'Expressed Aff.', score: firoBDisplayScores.EA, fill: '#4A6B5D' },
    { name: 'Wanted Aff.', score: firoBDisplayScores.WA, fill: '#5F8576' },
  ];

  const dimensions = [
    {
      title: 'Inclusion',
      expressed: firoBDisplayScores.EI,
      wanted: firoBDisplayScores.WI,
      expressedBandScore: firoBNormalizedScores.EI,
      wantedBandScore: firoBNormalizedScores.WI,
      icon: Users,
      description:
        'Your tendency to initiate social involvement and the amount of inclusion you prefer from others.',
    },
    {
      title: 'Control',
      expressed: firoBDisplayScores.EC,
      wanted: firoBDisplayScores.WC,
      expressedBandScore: firoBNormalizedScores.EC,
      wantedBandScore: firoBNormalizedScores.WC,
      icon: SlidersHorizontal,
      description:
        'Your tendency to take responsibility or direction and the amount of structure or influence you prefer from others.',
    },
    {
      title: 'Affection',
      expressed: firoBDisplayScores.EA,
      wanted: firoBDisplayScores.WA,
      expressedBandScore: firoBNormalizedScores.EA,
      wantedBandScore: firoBNormalizedScores.WA,
      icon: Heart,
      description:
        'Your tendency to express warmth and closeness and the amount of personal connection you prefer from others.',
    },
  ];

  const level = (score: number) =>
    score >= 67 ? 'Higher' : score >= 34 ? 'Moderate' : 'Lower';

const summary = (() => {
  const expressed = [
    { name: 'Inclusion', score: Number(firoBNormalizedScores.EI) },
    { name: 'Control', score: Number(firoBNormalizedScores.EC) },
    { name: 'Affection', score: Number(firoBNormalizedScores.EA) },
  ];

  const wanted = [
    { name: 'Inclusion', score: Number(firoBNormalizedScores.WI) },
    { name: 'Control', score: Number(firoBNormalizedScores.WC) },
    { name: 'Affection', score: Number(firoBNormalizedScores.WA) },
  ];

  expressed.sort((a, b) => b.score - a.score);
  wanted.sort((a, b) => b.score - a.score);

  const topExpressed = expressed[0].name;
  const topWanted = wanted[0].name;

  return `Your FIRO-B results suggest that ${topExpressed.toLowerCase()} is currently your strongest expressed interpersonal area, while ${topWanted.toLowerCase()} is the area you most strongly want from others. The six scores together provide a snapshot of how you approach interaction, responsibility, and personal connection.`;
})();

  return (
    <div
      className="min-h-[calc(100vh-64px)] bg-[#F9F8F3]"
      style={{ zoom: 0.85 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">

        {/* Incomplete-state banner */}
        {!isFiroBComplete && (
          <div className="p-4 rounded-2xl bg-[#1E3A34] text-[#F9F8F3] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <p className="font-bold text-sm">
                Your FIRO-B assessment is not complete yet.
              </p>
              <p className="text-xs text-[#A2B5AF] mt-1">
                Complete the assessment to populate your interpersonal metrics.
              </p>
            </div>

            <Link
              to="/assessment"
              className="btn-terracotta px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0"
            >
              Start Assessment
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Dashboard hero */}
        <section className="bg-[#1E3A34] text-[#F9F8F3] px-6 py-7 sm:px-9 sm:py-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-24 -top-28 w-80 h-80 bg-[#C86D51]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-28 w-64 h-64 bg-[#4A6B5D]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#142824] text-[#C86D51] border border-[#2C524A] text-[10px] font-bold uppercase tracking-[0.12em]">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  FIRO-B Interpersonal Profile
                </div>

                <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Hi, {personalDetails.name || 'Career Explorer'}!
                </h1>

                <p className="text-[#B7C4BF] text-sm leading-relaxed max-w-2xl">
                  Your dashboard summarizes the interpersonal patterns captured
                  by the FIRO-B assessment. It does not display your individual
                  question responses.
                </p>
              </div>

              <div className="lg:text-right shrink-0">
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#A2B5AF] font-bold">
                  Profile status
                </p>
                <p className="text-sm font-semibold text-[#F9F8F3] mt-1">
                  FIRO-B Complete
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#2C524A] flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#A2B5AF]">
              {academicDetails.courseStream && (
                <>
                  <span>
                    Academic Track:{' '}
                    <strong className="text-white">
                      {academicDetails.courseStream}
                    </strong>
                  </span>
                  <span className="text-[#4D6A62]">•</span>
                </>
              )}

              <span>
                Assessment:{' '}
                <strong className="text-[#C86D51]">FIRO-B Complete</strong>
              </span>
              <span className="text-[#4D6A62]">•</span>
              <span>
                CCA 30:{' '}
                <strong className="text-[#C86D51]">Coming Soon</strong>
              </span>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#C86D51]">
                Your Results
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34] mt-1">
                FIRO-B Interpersonal Metrics
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6E68] mt-1">
                Six scores across Inclusion, Control, and Affection.
              </p>
            </div>

            <span className="inline-flex self-start sm:self-auto px-3 py-1.5 rounded-full bg-white border border-[#E5E2D9] text-[10px] font-bold text-[#5A6E68]">
              6 interpersonal metrics
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-5">
            {/* Chart */}
            <div className="editorial-card p-5 sm:p-6 bg-white border border-[#E5E2D9] shadow-sm">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E2D9]">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">
                    Interpersonal Matrix
                  </h3>
                  <p className="text-[11px] text-[#5A6E68] mt-0.5">
                    Expressed vs. wanted scores (0–9)
                  </p>
                </div>
                <span className="badge-forest px-2.5 py-1 rounded-full text-[9px] font-bold">
                  FIRO-B
                </span>
              </div>

              <div className="h-72 w-full pt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={firoBBarData}
                    margin={{ top: 12, right: 10, left: -24, bottom: 18 }}
                  >
                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: '#1E3A34',
                        fontSize: 9,
                        fontWeight: 600,
                      }}
                      interval={0}
                      angle={-12}
                      textAnchor="end"
                    />
                    <YAxis
                      domain={[0, 9]}
                      tick={{ fill: '#5A6E68', fontSize: 9 }}
                    />
                    <Tooltip
                      cursor={{ fill: '#F2F0E6' }}
                      contentStyle={{
                        backgroundColor: '#1E3A34',
                        borderRadius: '10px',
                        color: '#F9F8F3',
                        border: 'none',
                        fontSize: '11px',
                      }}
                    />
                    <Bar dataKey="score" radius={[5, 5, 0, 0]}>
                      {firoBBarData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Dimension cards */}
            <div className="grid gap-3">
              {dimensions.map(d => {
                const Icon = d.icon;

                return (
                  <div
                    key={d.title}
                    className="editorial-card p-4 sm:p-5 bg-white border border-[#E5E2D9] shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EBF2F0] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#C86D51]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-editorial text-lg font-bold text-[#1E3A34]">
                            {d.title}
                          </h3>
                          <span className="badge-terracotta px-2 py-1 rounded-full text-[9px] font-bold shrink-0">
                            {level(Math.max(d.expressedBandScore, d.wantedBandScore))}
                          </span>
                        </div>

                        <p className="text-[10px] text-[#5A6E68] mt-1 leading-relaxed">
                          {d.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2.5 mt-3">
                          <div className="p-2.5 rounded-lg bg-[#F9F8F3] border border-[#E5E2D9]">
                            <p className="text-[9px] uppercase tracking-wider font-bold text-[#5A6E68]">
                              Expressed
                            </p>
                            <p className="font-editorial text-xl font-bold text-[#1E3A34] mt-0.5">
                              {d.expressed.toFixed(1)} / 9
                            </p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-[#F9F8F3] border border-[#E5E2D9]">
                            <p className="text-[9px] uppercase tracking-wider font-bold text-[#5A6E68]">
                              Wanted
                            </p>
                            <p className="font-editorial text-xl font-bold text-[#C86D51] mt-0.5">
                              {d.wanted.toFixed(1)} / 9
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interpretation */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="editorial-card p-5 sm:p-6 bg-white border border-[#E5E2D9] shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center shrink-0">
                <Sparkles className="w-4.5 h-4.5 text-[#C86D51]" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#C86D51]">
                  What your result tells us
                </span>
                <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E3A34] mt-1">
                  Your Interpersonal Snapshot
                </h2>
              </div>
            </div>

            <p className="text-sm text-[#5A6E68] leading-relaxed mt-4">
              {summary}
            </p>

            <p className="text-[10px] text-[#8A948F] leading-relaxed mt-3">
              This is a descriptive snapshot of your assessment responses, not
              a clinical or definitive personality diagnosis.
            </p>
          </div>

          <div className="editorial-card p-5 sm:p-6 bg-[#FBF9F5] border border-[#E5E2D9] shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F2F0E6] text-[#1E3A34] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-4.5 h-4.5 text-[#C86D51]" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#C86D51]">
                  Interpersonal data acquired
                </span>
                <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#1E3A34] mt-1">
                  What FIRO-B Measures
                </h2>
              </div>
            </div>

            <div className="grid gap-2.5 mt-4">
              <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">
                <p className="text-[10px] font-bold text-[#1E3A34]">
                  Inclusion
                </p>
                <p className="text-[11px] text-[#5A6E68] mt-0.5">
                  Expressed and wanted social involvement.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">
                <p className="text-[10px] font-bold text-[#1E3A34]">
                  Control
                </p>
                <p className="text-[11px] text-[#5A6E68] mt-0.5">
                  Expressed and wanted responsibility, direction, and influence.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5E2D9]">
                <p className="text-[10px] font-bold text-[#1E3A34]">
                  Affection
                </p>
                <p className="text-[11px] text-[#5A6E68] mt-0.5">
                  Expressed and wanted warmth, closeness, and connection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Insight Section */}
        {isLoadingAi && (
          <section className="bg-white p-8 rounded-3xl border border-[#E5E2D9] shadow-sm flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 text-[#C86D51] animate-spin" />
            <p className="text-sm font-semibold text-[#1E3A34]">
              Generating your personalized AI synthesis...
            </p>
          </section>
        )}

        {firoBAiInsight && !isLoadingAi && (
          <section className="space-y-6 pt-4 border-t border-[#E5E2D9]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center shrink-0">
                <Sparkles className="w-4.5 h-4.5 text-[#C86D51]" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#C86D51]">
                  AI Synthesis
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#1E3A34] mt-1">
                  Your Personalized Psychological Profile
                </h2>
              </div>
            </div>

            <div className="editorial-card p-6 sm:p-8 bg-white border border-[#E5E2D9] shadow-sm">
              <h3 className="font-editorial text-xl font-bold text-[#1E3A34] mb-3">
                Executive Summary
              </h3>
              <p className="text-sm text-[#5A6E68] leading-relaxed">
                {firoBAiInsight.identityInsight?.summary || firoBAiInsight.firoBInterpretation?.overallProfile}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1E3A34] text-[#F9F8F3] p-6 rounded-2xl space-y-4 shadow-sm">
                <h4 className="font-editorial text-lg font-bold flex items-center gap-2 text-white">
                  <UserCheck className="w-5 h-5 text-[#C86D51]" />
                  <span>Work Environment Fit</span>
                </h4>
                <p className="text-xs text-[#A2B5AF] leading-relaxed">
                  {firoBAiInsight.workEnvironmentFit.preferredEnvironment}
                </p>
                <div className="space-y-2 pt-3 border-t border-[#2C524A] text-xs">
                  <p><strong className="text-white">Collaboration Style:</strong> {firoBAiInsight.workEnvironmentFit.collaborationStyle}</p>
                  <p><strong className="text-white">Communication Style:</strong> {firoBAiInsight.workEnvironmentFit.communicationStyle}</p>
                  {firoBAiInsight.workEnvironmentFit.responsibilityStyle && (
                    <p><strong className="text-white">Responsibility Style:</strong> {firoBAiInsight.workEnvironmentFit.responsibilityStyle}</p>
                  )}
                </div>
              </div>

              <div className="bg-[#F9F8F3] p-6 rounded-2xl border border-[#E5E2D9] shadow-sm">
                <h4 className="font-editorial text-lg font-bold text-[#1E3A34] flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-[#C86D51]" />
                  <span>Actionable Suggestions</span>
                </h4>
                <ul className="space-y-3 text-xs text-[#1E3A34]">
                  {firoBAiInsight.actionableSuggestions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Career unlock */}
        <section className="rounded-2xl bg-[#1E3A34] text-[#F9F8F3] px-6 py-6 sm:px-7 sm:py-7 relative overflow-hidden shadow-lg">
          <div className="absolute -right-16 -top-20 w-56 h-56 rounded-full bg-[#C86D51]/15 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#C86D51]">
                <LockKeyhole className="w-3.5 h-3.5" />
                Career Matching
              </span>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                Unlock your Top 5 Career Matches
              </h2>

              <p className="text-xs sm:text-sm text-[#A2B5AF] leading-relaxed">
                To unlock Top 5 careers, attempt the CCA 30 test.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#142824] border border-[#2C524A]">
              <span className="w-2 h-2 rounded-full bg-[#C86D51]" />
              <span className="text-xs font-semibold text-[#C8D3CF]">
                CCA 30 · Coming Soon
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
