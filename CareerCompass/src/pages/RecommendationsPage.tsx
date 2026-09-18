import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BarChart3, Code2, Palette, Briefcase, BrainCircuit, CheckCircle2, Lightbulb } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { CAREER_CLUSTERS, CAREER_DATABASE } from '../data/careerDatabase';

export const RecommendationsPage: React.FC = () => {
  const { personalDetails } = useAssessment();

  const getIconForCluster = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return BarChart3;
      case 'Code2': return Code2;
      case 'Palette': return Palette;
      case 'Briefcase': return Briefcase;
      case 'BrainCircuit': return BrainCircuit;
      default: return Sparkles;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="badge-terracotta px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Step 05 of Pipeline
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#1E3A34]">
          Career Cluster Recommendations
        </h1>
        <p className="text-[#5A6E68] text-base leading-relaxed">
          Ranked career clusters generated for <strong>{personalDetails.name || 'Tanishka'}</strong> based on psychometric FIRO-B alignment, quantitative logic aptitude, and work environment preferences.
        </p>
      </div>

      {/* Cluster List */}
      <div className="space-y-8">
        {CAREER_CLUSTERS.map((cluster, idx) => {
          const IconComp = getIconForCluster(cluster.iconName);
          const matchedCareers = CAREER_DATABASE.filter(c => c.cluster === cluster.name);

          return (
            <div
              key={idx}
              className={`editorial-card p-8 sm:p-10 space-y-8 transition-all ${
                idx === 0 ? 'border-2 border-[#C86D51] bg-[#FBF9F5]' : 'bg-white'
              }`}
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#E5E2D9] pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center font-bold shadow-xs">
                    <IconComp className="w-7 h-7 text-[#C86D51]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#5A6E68]">CLUSTER 0{idx + 1}</span>
                      {idx === 0 && (
                        <span className="badge-terracotta px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                          Highest Fit
                        </span>
                      )}
                    </div>
                    <h3 className="font-editorial text-2xl font-bold text-[#1E3A34] mt-0.5">
                      {cluster.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-editorial text-3xl font-bold text-[#C86D51]">
                      {cluster.matchPercentage}%
                    </span>
                    <p className="text-[10px] uppercase font-bold text-[#5A6E68]">Match Confidence</p>
                  </div>
                </div>
              </div>

              {/* Description & Explainability "Why This Match?" Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-editorial text-base font-bold text-[#1E3A34]">Cluster Overview</h4>
                  <p className="text-sm text-[#5A6E68] leading-relaxed">
                    {cluster.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold uppercase text-[#1E3A34]">Top Specialized Roles:</p>
                    <div className="flex flex-wrap gap-2">
                      {cluster.topCareers.map((role, rIdx) => (
                        <span key={rIdx} className="bg-[#F2F0E6] text-[#1E3A34] px-3 py-1 rounded-lg text-xs font-semibold">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* "Why This Match?" Explainability Tags */}
                <div className="bg-[#F9F8F3] p-6 rounded-2xl border border-[#E5E2D9] space-y-4">
                  <h4 className="font-editorial text-base font-bold text-[#1E3A34] flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[#C86D51]" />
                    <span>Why This Match? Explainability Tags</span>
                  </h4>

                  <ul className="space-y-2.5 text-xs text-[#1E3A34]">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                      <span><strong>High Analytical & Data Logic Score:</strong> Your problem-solving choices aligned with data modeling and empirical validation.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                      <span><strong>FIRO-B Wanted Control Fit:</strong> Your score indicates high comfort in structured environment roles with clear guidelines.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                      <span><strong>Academic Alignment:</strong> Your background in {personalDetails.name ? 'Computer Science & Math' : 'technical subjects'} matches required foundation.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Matched Careers Cards */}
              {matchedCareers.length > 0 && (
                <div className="pt-4 border-t border-[#E5E2D9] space-y-3">
                  <h4 className="font-editorial text-sm font-bold text-[#1E3A34]">Detailed Career Explorer Track:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchedCareers.map(c => (
                      <div key={c.id} className="bg-white p-5 rounded-xl border border-[#E5E2D9] flex items-center justify-between gap-4">
                        <div>
                          <h5 className="font-editorial text-base font-bold text-[#1E3A34]">{c.title}</h5>
                          <p className="text-xs text-[#5A6E68] mt-0.5">Average Salary: {c.salaryRange.mid}</p>
                        </div>
                        <Link
                          to={`/explorer/${c.id}`}
                          className="btn-terracotta px-4 py-2 rounded-lg text-xs font-semibold shrink-0"
                        >
                          Deep Dive →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
