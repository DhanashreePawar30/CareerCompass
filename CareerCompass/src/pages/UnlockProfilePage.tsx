import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, GraduationCap, Plus, X, ArrowRight, Lock, CheckCircle2, ShieldCheck, Phone, BookOpen, Percent } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { calculateArchetype } from '../data/archetypes';
import { ArchetypeCard } from '../components/ArchetypeCard';
import { MagneticButton } from '../components/MagneticButton';

export const UnlockProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    personalDetails,
    academicDetails,
    firoBScores,
    customTraitScores,
    updatePersonalDetails,
    updateAcademicDetails,
    addSkillTag,
    removeSkillTag
  } = useAssessment();

  const [newSkillInput, setNewSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute the derived archetype from actual real test scores
  const archetype = calculateArchetype(firoBScores, customTraitScores);

  const POPULAR_SKILLS = [
    'Python', 'Data Analysis', 'SQL', 'React', 'Machine Learning',
    'UI/UX Design', 'Financial Modeling', 'Public Speaking', 'Strategic Planning',
    'Problem Solving', 'Project Management', 'Cloud Computing'
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      addSkillTag(newSkillInput.trim());
      setNewSkillInput('');
    }
  };

  const handleUnlockDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/dashboard/recommendations');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header & Celebration */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-terracotta text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
          <span>Stage 04 • Assessment Analysis Ready</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#1E3A34]">
          Unlock Your Full Career Report
        </h1>
        <p className="text-[#5A6E68] text-base leading-relaxed">
          Based on your psychometric and cognitive responses, we've synthesized your archetype below. Finalize your academic background to personalize your 5-year roadmap and salary projections.
        </p>
      </div>

      {/* Archetype Card Reveal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C86D51]">
            ✦ Step 1: Your Derived Career Persona
          </span>
          <span className="text-xs text-[#5A6E68] font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Real-Time Neural Synthesis Active</span>
          </span>
        </div>
        <ArchetypeCard
          archetype={archetype}
          userName={personalDetails.name || 'Career Pioneer'}
        />
      </div>

      {/* Profile Form to Unlock Full Report */}
      <div className="editorial-card p-8 sm:p-12 space-y-8 bg-white border border-[#E5E2D9] relative shadow-lg">
        <div className="border-b border-[#E5E2D9] pb-6 space-y-2">
          <div className="flex items-center gap-2.5 text-[#1E3A34]">
            <Lock className="w-5 h-5 text-[#C86D51]" />
            <h2 className="font-editorial text-2xl font-bold">
              Step 2: Personalize Your Recommendations & Roadmap
            </h2>
          </div>
          <p className="text-sm text-[#5A6E68]">
            This data allows our matching algorithm to benchmark your current skills against industry hiring vectors.
          </p>
        </div>

        <form onSubmit={handleUnlockDashboard} className="space-y-8">
          
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
              <User className="w-4 h-4 text-[#C86D51]" />
              <span>Personal Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#5A6E68] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={personalDetails.name}
                  onChange={(e) => updatePersonalDetails({ name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-sm text-[#1E3A34] focus:outline-none focus:border-[#C86D51] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A6E68] mb-1.5">
                  Email Address (to save report) <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={personalDetails.email}
                  onChange={(e) => updatePersonalDetails({ email: e.target.value })}
                  placeholder="e.g. alex@university.edu"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-sm text-[#1E3A34] focus:outline-none focus:border-[#C86D51] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A6E68] mb-1.5">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#5A6E68] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={personalDetails.phone}
                    onChange={(e) => updatePersonalDetails({ phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-sm text-[#1E3A34] focus:outline-none focus:border-[#C86D51] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#5A6E68] mb-1.5">Age</label>
                  <input
                    type="number"
                    min="14"
                    max="60"
                    value={personalDetails.age}
                    onChange={(e) => updatePersonalDetails({ age: e.target.value })}
                    placeholder="20"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-sm text-[#1E3A34] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5A6E68] mb-1.5">Gender</label>
                  <select
                    value={personalDetails.gender}
                    onChange={(e) => updatePersonalDetails({ gender: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-sm text-[#1E3A34] focus:outline-none focus:border-[#C86D51]"
                  >
                    <option value="">Select</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="space-y-4 pt-4 border-t border-[#E5E2D9]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
              <GraduationCap className="w-4 h-4 text-[#C86D51]" />
              <span>Academic Foundation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#5A6E68] mb-1.5">
                  Current Education Level <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={academicDetails.educationLevel}
                  onChange={(e) => updateAcademicDetails({ educationLevel: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-sm text-[#1E3A34] focus:outline-none focus:border-[#C86D51] transition-colors"
                >
                  <option value="">Select Level</option>
                  <option value="High School (11th/12th)">High School (11th/12th)</option>
                  <option value="Undergraduate (Year 1/2)">Undergraduate (Year 1/2)</option>
                  <option value="Undergraduate (Year 3/4)">Undergraduate (Year 3/4)</option>
                  <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                  <option value="Working Professional">Working Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A6E68] mb-1.5">
                  Degree Stream / Major <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={academicDetails.courseStream}
                  onChange={(e) => updateAcademicDetails({ courseStream: e.target.value })}
                  placeholder="e.g. Computer Science, Economics, Business, Design"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-sm text-[#1E3A34] focus:outline-none focus:border-[#C86D51] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A6E68] mb-1.5">
                  Key Subjects / Focus Areas
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-[#5A6E68] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={academicDetails.keySubjects}
                    onChange={(e) => updateAcademicDetails({ keySubjects: e.target.value })}
                    placeholder="e.g. Data Structures, Applied Statistics, Marketing"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-sm text-[#1E3A34] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A6E68] mb-1.5">
                  Grade Percentage / CGPA (Optional)
                </label>
                <div className="relative">
                  <Percent className="w-4 h-4 text-[#5A6E68] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={academicDetails.gradePercentage}
                    onChange={(e) => updateAcademicDetails({ gradePercentage: e.target.value })}
                    placeholder="e.g. 85% or 8.8 CGPA"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-sm text-[#1E3A34] focus:outline-none focus:border-[#C86D51]"
                  />
                </div>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="pt-3 space-y-3">
              <label className="block text-xs font-medium text-[#5A6E68]">
                Your Current Skills (Select quick tags or type custom skills):
              </label>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SKILLS.map((skill, idx) => {
                  const isAdded = academicDetails.skillTags.includes(skill);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => isAdded ? removeSkillTag(skill) : addSkillTag(skill)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#1E3A34] text-white'
                          : 'bg-[#F9F8F3] text-[#5A6E68] border border-[#E5E2D9] hover:bg-[#F2F0E6]'
                      }`}
                    >
                      {isAdded ? '✓ ' : '+ '}{skill}
                    </button>
                  );
                })}
              </div>

              {/* Selected Skill Tags */}
              {academicDetails.skillTags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {academicDetails.skillTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E5E2D9] text-xs font-semibold text-[#1E3A34] shadow-2xs"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeSkillTag(tag)}
                        className="text-[#5A6E68] hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Custom skill tag input */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="Type any other custom skill and press Add..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E2D9] bg-[#F9F8F3] text-xs text-[#1E3A34] focus:outline-none focus:border-[#C86D51]"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-5 py-2.5 rounded-xl border border-[#E5E2D9] bg-white text-xs font-bold text-[#1E3A34] hover:bg-[#F9F8F3] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Tag
                </button>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-6 border-t border-[#E5E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#5A6E68]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Assessment responses permanently preserved & computed dynamically.</span>
            </div>

            <MagneticButton
              type="submit"
              disabled={isSubmitting}
              className="btn-terracotta w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{isSubmitting ? 'Personalizing Report...' : 'View Full Career Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </form>
      </div>
    </div>
  );
};
