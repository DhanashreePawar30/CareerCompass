import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BarChart3, Code2, Palette, Briefcase, BrainCircuit, CheckCircle2, Lightbulb, Scale, ArrowRight, Compass } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import type { CareerProfile } from '../data/careerDatabase';
import { calculateArchetype } from '../data/archetypes';
import { ComparisonDrawer } from '../components/ComparisonDrawer';

export const RecommendationsPage: React.FC = () => {
  const { personalDetails, firoBScores, customTraitScores, rankedCareers, rankedClusters, isAssessmentComplete, firoBAiInsight } = useAssessment();
  const archetype = calculateArchetype(firoBScores, customTraitScores);

  const [compareList, setCompareList] = useState<CareerProfile[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const toggleCompare = (career: CareerProfile) => {
    if (compareList.some(c => c.id === career.id)) {
      setCompareList(prev => prev.filter(c => c.id !== career.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 careers simultaneously.');
        return;
      }
      setCompareList(prev => [...prev, career]);
      setDrawerOpen(true);
    }
  };

  const removeCompare = (id: string) => {
    setCompareList(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Assessment Incomplete Notice Banner */}
      {!isAssessmentComplete && (
        <div className="p-6 rounded-2xl bg-[#1E3A34] text-[#F9F8F3] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Compass className="w-8 h-8 text-[#C86D51] shrink-0" />
            <div>
              <p className="font-bold text-sm">You are viewing standard baseline career recommendations.</p>
              <p className="text-xs text-[#A2B5AF]">Complete the 84-question assessment to calculate your exact FIRO-B interpersonal match and personalized rankings.</p>
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

      {/* Header & Persona Card Link */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="badge-terracotta px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Stage 05 • Career Intelligence
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#1E3A34]">
            Ranked Career Recommendations
          </h1>
          <p className="text-[#5A6E68] text-base leading-relaxed">
            Ranked career clusters generated for <strong>{personalDetails.name || 'Career Pioneer'}</strong> based on your <strong>{archetype.title}</strong> profile and cognitive test responses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/assessment/unlock"
            className="px-5 py-3 rounded-xl bg-white border border-[#E5E2D9] text-[#1E3A34] hover:bg-[#F2F0E6] text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#C86D51]" />
            <span>Persona: {archetype.title}</span>
          </Link>

          {compareList.length > 0 && (
            <button
              onClick={() => setDrawerOpen(true)}
              className="btn-terracotta px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md cursor-pointer animate-fade-in"
            >
              <Scale className="w-4 h-4" />
              <span>Compare ({compareList.length}) Roles</span>
            </button>
          )}
        </div>
      </div>

      {/* Cluster List */}
      <div className="space-y-8">
        {rankedClusters.map((cluster, idx) => {
          const IconComp = getIconForCluster(cluster.iconName);
          const matchedCareers = rankedCareers.filter(c => c.cluster === cluster.name);

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

              {/* Description & Explainability Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-editorial text-base font-bold text-[#1E3A34]">Cluster Overview</h4>
                  <p className="text-sm text-[#5A6E68] leading-relaxed">
                    {cluster.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold uppercase text-[#1E3A34]">Top Specialized Roles:</p>
                    <div className="flex flex-wrap gap-2">
                      {cluster.topCareers.map((role: string, rIdx: number) => (
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
                    <span>Why This Match? Explainability Breakdown</span>
                  </h4>

                  <ul className="space-y-2.5 text-xs text-[#1E3A34]">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                      <span><strong>Cognitive Trait Alignment:</strong> High resonance with analytical problem solving and domain logic.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                      <span>
                        <strong>FIRO-B Interpersonal Fit:</strong>{' '}
                        {firoBAiInsight
                          ? firoBAiInsight.firoBInterpretation.interpersonalStyle
                          : 'Control and affection scores indicate natural alignment with this work environment.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                      <span><strong>Skill Vector Match:</strong> Your current coursework and technical tags match required foundation tracks.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Matched Careers Cards */}
              {matchedCareers.length > 0 && (
                <div className="pt-4 border-t border-[#E5E2D9] space-y-3">
                  <h4 className="font-editorial text-sm font-bold text-[#1E3A34]">Explore Detailed Career Tracks:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchedCareers.map(c => {
                      const isCompared = compareList.some(item => item.id === c.id);

                      return (
                        <div key={c.id} className="bg-white p-5 rounded-xl border border-[#E5E2D9] flex flex-col justify-between gap-4 shadow-2xs hover:border-[#C86D51]/50 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h5 className="font-editorial text-base font-bold text-[#1E3A34]">{c.title}</h5>
                              <p className="text-xs text-[#5A6E68] mt-0.5">Average Salary: <strong className="text-[#1E3A34]">{c.salaryRange.mid}</strong></p>
                            </div>
                            <span className="px-2 py-0.5 rounded-md bg-[#F2F0E6] text-xs font-bold text-[#1E3A34]">
                              {c.matchScore}%
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E5E2D9]">
                            <button
                              type="button"
                              onClick={() => toggleCompare(c)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                isCompared
                                  ? 'bg-[#1E3A34] text-white'
                                  : 'bg-[#F9F8F3] hover:bg-[#F2F0E6] text-[#5A6E68] border border-[#E5E2D9]'
                              }`}
                            >
                              <Scale className="w-3.5 h-3.5" />
                              <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                            </button>

                            <Link
                              to={`/explorer/${c.id}`}
                              className="btn-terracotta px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
                            >
                              <span>Roadmap</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Comparison Drawer */}
      <ComparisonDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        careers={compareList}
        onRemoveCareer={removeCompare}
      />

    </div>
  );
};
