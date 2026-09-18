import React from 'react';
import { Link } from 'react-router-dom';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { CAREER_DATABASE } from '../data/careerDatabase';

export const DashboardPage: React.FC = () => {
  const { personalDetails, academicDetails, firoBScores, customTraitScores } = useAssessment();

  // Trait Radar Data
  const radarData = [
    { subject: 'Analytical Logic', score: (customTraitScores.Analytical * 8) + 20 },
    { subject: 'Technical Mindset', score: (customTraitScores.Technical * 8) + 15 },
    { subject: 'Creative Thinking', score: (customTraitScores.Creative * 8) + 10 },
    { subject: 'Leadership & Strategy', score: (customTraitScores.Leadership * 8) + 18 },
    { subject: 'Interpersonal Warmth', score: (firoBScores.EA + firoBScores.WA) / 1.1 }
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

  const topMatch = CAREER_DATABASE[0]; // Data Analyst
  const secondaryMatches = CAREER_DATABASE.slice(1, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Dashboard Greeting Banner */}
      <div className="bg-[#1E3A34] text-[#F9F8F3] p-8 sm:p-12 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C86D51]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142824] text-[#C86D51] border border-[#2C524A] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career Fit Assessment Complete</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white">
              Hi, {personalDetails.name || 'Tanishka'}! 👋
            </h1>
            <p className="text-[#A2B5AF] text-sm sm:text-base max-w-2xl">
              Here is your multi-vector Career Compass breakdown synthesized from your FIRO-B metrics, logic aptitude, and academic history.
            </p>
          </div>

          <Link
            to="/dashboard/recommendations"
            className="btn-terracotta px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md flex items-center gap-2 shrink-0"
          >
            <span>All Recommendations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Details Chips */}
        <div className="pt-4 border-t border-[#2C524A] flex flex-wrap gap-4 text-xs text-[#A2B5AF]">
          <div>Academic Track: <span className="font-semibold text-white">{academicDetails.courseStream}</span></div>
          <div>•</div>
          <div>Top Fit: <span className="font-semibold text-[#C86D51]">{topMatch.title} ({topMatch.matchScore}%)</span></div>
          <div>•</div>
          <div>Status: <span className="font-semibold text-white">Verified Profile</span></div>
        </div>
      </div>

      {/* Grid: Radar Metrics & FIRO-B Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Radar Chart: Holistic Trait Matrix */}
        <div className="editorial-card p-6 sm:p-8 space-y-6 bg-white border border-[#E5E2D9]">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4">
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">Holistic Trait Radar</h3>
              <p className="text-xs text-[#5A6E68]">Aptitude, Interests & Work Style Profile</p>
            </div>
            <span className="badge-terracotta px-3 py-1 rounded-full text-xs font-bold">5 Vectors</span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#E5E2D9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#1E3A34', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#5A6E68', fontSize: 10 }} />
                <Radar
                  name="Trait Score"
                  dataKey="score"
                  stroke="#C86D51"
                  fill="#C86D51"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
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
            <Link
              to={`/explorer/${topMatch.id}`}
              className="text-xs font-bold text-[#1E3A34] hover:text-[#C86D51] flex items-center gap-1 mt-2"
            >
              <span>Explore Career Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Career Matches */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-editorial text-2xl font-bold text-[#1E3A34]">
            Top Secondary Career Paths
          </h3>
          <Link
            to="/dashboard/recommendations"
            className="text-sm font-semibold text-[#C86D51] hover:text-[#B25A40] flex items-center gap-1"
          >
            <span>View All Ranked Clusters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryMatches.map((career) => (
            <div key={career.id} className="editorial-card p-6 flex flex-col justify-between space-y-6 hover:-translate-y-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge-forest px-3 py-1 rounded-full text-xs font-bold">
                    {career.cluster}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#C86D51]">
                    {career.matchScore}% Match
                  </span>
                </div>
                <h4 className="font-editorial text-lg font-bold text-[#1E3A34]">
                  {career.title}
                </h4>
                <p className="text-xs text-[#5A6E68] line-clamp-3">
                  {career.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between">
                <span className="text-xs text-[#5A6E68] font-semibold">{career.salaryRange.entry}</span>
                <Link
                  to={`/explorer/${career.id}`}
                  className="btn-terracotta px-4 py-2 rounded-lg text-xs font-semibold"
                >
                  View Path →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
