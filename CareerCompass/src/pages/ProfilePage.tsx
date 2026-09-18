import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Plus, X, ArrowRight, Check, Tag } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    personalDetails,
    academicDetails,
    updatePersonalDetails,
    updateAcademicDetails,
    addSkillTag,
    removeSkillTag
  } = useAssessment();

  const [newSkillInput, setNewSkillInput] = useState('');
  const [savedBanner, setSavedBanner] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      addSkillTag(newSkillInput.trim());
      setNewSkillInput('');
    }
  };

  const handleSaveAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedBanner(true);
    setTimeout(() => {
      navigate('/assessment');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <span className="badge-terracotta px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Step 01 of Pipeline
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1E3A34]">
          Student Profile & Academic Record
        </h1>
        <p className="text-[#5A6E68] text-base leading-relaxed">
          Provide your background information so our AI engine can contextualize your assessment results with realistic educational tracks.
        </p>
      </div>

      {savedBanner && (
        <div className="bg-[#1E3A34] text-[#F9F8F3] p-4 rounded-xl flex items-center justify-between animate-fade-in shadow-md">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#C86D51]" />
            <span className="text-sm font-semibold">Profile saved successfully! Proceeding to Assessment Hub...</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSaveAndProceed} className="space-y-8">
        
        {/* Section 1: Personal Details */}
        <div className="editorial-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#E5E2D9] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F2F0E6] text-[#1E3A34] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">Personal Details</h3>
              <p className="text-xs text-[#5A6E68]">Basic demographic and contact information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={personalDetails.name}
                onChange={e => updatePersonalDetails({ name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51] transition-colors"
                placeholder="e.g. Tanishka Sharma"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={personalDetails.email}
                onChange={e => updatePersonalDetails({ email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51] transition-colors"
                placeholder="e.g. tanishka@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
                Age
              </label>
              <input
                type="text"
                value={personalDetails.age}
                onChange={e => updatePersonalDetails({ age: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51] transition-colors"
                placeholder="e.g. 20"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
                Gender
              </label>
              <select
                value={personalDetails.gender}
                onChange={e => updatePersonalDetails({ gender: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51] transition-colors"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
                Phone Number
              </label>
              <input
                type="text"
                value={personalDetails.phone}
                onChange={e => updatePersonalDetails({ phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51] transition-colors"
                placeholder="e.g. +91 98765 43210"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Academic Details */}
        <div className="editorial-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#E5E2D9] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F2F0E6] text-[#1E3A34] flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">Academic Milestones</h3>
              <p className="text-xs text-[#5A6E68]">Education level, streams, and performance metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
                Education Level *
              </label>
              <select
                value={academicDetails.educationLevel}
                onChange={e => updateAcademicDetails({ educationLevel: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51] transition-colors"
              >
                <option value="High School (Grades 9-10)">High School (Grades 9-10)</option>
                <option value="Senior Secondary (Grades 11-12)">Senior Secondary (Grades 11-12)</option>
                <option value="Undergraduate (Year 1-2)">Undergraduate (Year 1-2)</option>
                <option value="Undergraduate (Year 3-4)">Undergraduate (Year 3-4)</option>
                <option value="Postgraduate / Master's">Postgraduate / Master's</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
                Course / Stream / Degree *
              </label>
              <input
                type="text"
                required
                value={academicDetails.courseStream}
                onChange={e => updateAcademicDetails({ courseStream: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51] transition-colors"
                placeholder="e.g. B.Tech Computer Science"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
                Key Subjects / Specializations
              </label>
              <input
                type="text"
                value={academicDetails.keySubjects}
                onChange={e => updateAcademicDetails({ keySubjects: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51] transition-colors"
                placeholder="e.g. Data Structures, Applied Statistics, Software Engineering"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A34]">
                Overall Grade / CGPA / Percentage
              </label>
              <input
                type="text"
                value={academicDetails.gradePercentage}
                onChange={e => updateAcademicDetails({ gradePercentage: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51] transition-colors"
                placeholder="e.g. 88.5% or 8.9 CGPA"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Skill Tags Selector */}
        <div className="editorial-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#E5E2D9] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F2F0E6] text-[#1E3A34] flex items-center justify-center font-bold">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#1E3A34]">Skill Tags & Competencies</h3>
              <p className="text-xs text-[#5A6E68]">Add your core technical, creative, or soft skills</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={e => setNewSkillInput(e.target.value)}
                placeholder="Add a skill (e.g., Python, Figma, SQL, Public Speaking)..."
                className="flex-1 px-4 py-3 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] focus:outline-hidden focus:border-[#C86D51]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-5 py-3 rounded-xl bg-[#1E3A34] text-[#F9F8F3] hover:bg-[#142824] text-sm font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Tags Cloud */}
            <div className="flex flex-wrap gap-2 pt-2">
              {academicDetails.skillTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="badge-forest inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillTag(tag)}
                    className="hover:text-[#C86D51] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate('/assessment')}
            className="text-sm font-semibold text-[#5A6E68] hover:text-[#1E3A34]"
          >
            Skip for now →
          </button>

          <button
            type="submit"
            className="btn-terracotta px-8 py-4 rounded-xl text-base font-semibold shadow-lg flex items-center gap-3"
          >
            <span>Save Profile & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </form>
    </div>
  );
};
