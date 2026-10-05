import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Compass,
  GraduationCap,
  Lock,
  Mail,
  Percent,
  Phone,
  User,
  Users,
} from 'lucide-react';

const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-[#F9F8F3] border border-[#E5E2D9] text-sm text-[#1E3A34] placeholder:text-[#8A9893] focus:outline-none focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/10 transition';

const selectClass = `${inputClass} appearance-none`;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [major, setMajor] = useState('');
  const [subjects, setSubjects] = useState('');
  const [grade, setGrade] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem('cc_signed_in', 'true');
    localStorage.setItem('cc_user_name', name.trim());
    localStorage.setItem('cc_user_email', email.trim());
    localStorage.setItem(
      'cc_user_profile',
      JSON.stringify({
        phone: phone.trim(),
        age,
        gender,
        educationLevel,
        major: major.trim(),
        subjects: subjects.trim(),
        grade: grade.trim(),
      })
    );

    navigate('/assessment');
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#F9F8F3] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[0.82fr_1.8fr] bg-white border border-[#E5E2D9] rounded-2xl overflow-hidden shadow-[0_12px_35px_rgba(30,58,52,0.08)]">
          {/* Brand / context panel */}
          <aside className="bg-[#1E3A34] text-[#F9F8F3] px-7 sm:px-9 py-8 sm:py-10 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#F9F8F3]/10 border border-[#F9F8F3]/15 flex items-center justify-center mb-7">
                <Compass className="w-5 h-5 text-[#C86D51]" />
              </div>
              <span className="inline-flex badge-terracotta px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                Create your profile
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold leading-[1.05] mt-4">
                Start your CareerCompass journey.
              </h1>
              <p className="text-sm text-[#D6DFDC] leading-relaxed mt-4 max-w-sm">
                A few details help us understand your background before you begin the FIRO-B assessment.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-[#F9F8F3]/15 space-y-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#C86D51] font-bold">What happens next</p>
              <div className="flex items-center gap-3 text-sm text-[#D6DFDC]"><span className="text-[#C86D51] font-editorial text-lg">01</span> Complete your profile</div>
              <div className="flex items-center gap-3 text-sm text-[#D6DFDC]"><span className="text-[#C86D51] font-editorial text-lg">02</span> Take the FIRO-B assessment</div>
              <div className="flex items-center gap-3 text-sm text-[#D6DFDC]"><span className="text-[#C86D51] font-editorial text-lg">03</span> View your interpersonal insights</div>
            </div>
          </aside>

          {/* Form */}
          <section className="px-6 sm:px-8 lg:px-10 py-8 sm:py-9">
            <div className="flex items-start justify-between gap-5 pb-5 border-b border-[#E5E2D9]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C86D51]">Step 1 of your journey</p>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1E3A34] mt-1">Personalize your profile</h2>
                <p className="text-sm text-[#5A6E68] mt-1.5">Enter your details to continue to the assessment.</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-[#F9F8F3] border border-[#E5E2D9] items-center justify-center shrink-0">
                <User className="w-4 h-4 text-[#C86D51]" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="pt-6 space-y-6">
              <section>
                <SectionTitle icon={<User className="w-3.5 h-3.5" />} title="Personal details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                  <Field label="Full Name" required icon={<User className="w-3.5 h-3.5" />}>
                    <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className={`${inputClass} pl-9`} />
                  </Field>
                  <Field label="Email Address" required icon={<Mail className="w-3.5 h-3.5" />}>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={`${inputClass} pl-9`} />
                  </Field>
                  <Field label="Phone Number (Optional)" icon={<Phone className="w-3.5 h-3.5" />}>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className={`${inputClass} pl-9`} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Age" icon={<CalendarDays className="w-3.5 h-3.5" />}>
                      <input type="number" min="13" max="100" value={age} onChange={e => setAge(e.target.value)} placeholder="21" className={`${inputClass} pl-9`} />
                    </Field>
                    <Field label="Gender" icon={<Users className="w-3.5 h-3.5" />}>
                      <div className="relative">
                        <select
                          value={gender}
                          onChange={e => setGender(e.target.value)}
                          className={`${selectClass} pl-9 pr-9`}
                        >
                          <option value="">Select</option>
                          <option>Female</option>
                          <option>Male</option>
                          <option>Non-binary</option>
                          <option>Prefer not to say</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E3A34] pointer-events-none" />
                      </div>
                    </Field>
                  </div>
                </div>
              </section>

              <section className="border-t border-[#E5E2D9] pt-6">
                <SectionTitle icon={<GraduationCap className="w-3.5 h-3.5" />} title="Academic foundation" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                  <Field label="Current Education Level" required icon={<GraduationCap className="w-3.5 h-3.5" />}>
                    <select required value={educationLevel} onChange={e => setEducationLevel(e.target.value)} className={`${selectClass} pr-8 pl-9`}>
                      <option value="">Select level</option>
                      <option>School / Higher Secondary</option>
                      <option>Diploma</option>
                      <option>Undergraduate</option>
                      <option>Postgraduate</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="Degree Stream / Major" required icon={<BookOpen className="w-3.5 h-3.5" />}>
                    <input required type="text" value={major} onChange={e => setMajor(e.target.value)} placeholder="Computer Science & Engineering" className={`${inputClass} pl-9`} />
                  </Field>
                  <Field label="Key Subjects / Focus Areas" icon={<BookOpen className="w-3.5 h-3.5" />}>
                    <input type="text" value={subjects} onChange={e => setSubjects(e.target.value)} placeholder="Data Structures, ML, Cloud Systems" className={`${inputClass} pl-9`} />
                  </Field>
                  <Field label="Grade / CGPA (Optional)" icon={<Percent className="w-3.5 h-3.5" />}>
                    <input type="text" value={grade} onChange={e => setGrade(e.target.value)} placeholder="8.8 CGPA" className={`${inputClass} pl-9`} />
                  </Field>
                </div>
              </section>

              <section className="border-t border-[#E5E2D9] pt-6">
                <SectionTitle icon={<Lock className="w-3.5 h-3.5" />} title="Account security" />
                <div className="max-w-md">
                  <Field label="Create Password" required icon={<Lock className="w-3.5 h-3.5" />}>
                    <input required type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" className={`${inputClass} pl-9`} />
                  </Field>
                </div>
              </section>

              <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3">
                <button type="submit" className="btn-terracotta w-full sm:w-auto px-5 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-sm">
                  <span>Create Account &amp; Start Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs sm:text-sm text-[#5A6E68] text-center sm:text-left">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-[#C86D51] hover:text-[#B25A40]">Sign in</Link>
                </p>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

interface FieldProps {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, required, icon, children }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] sm:text-xs font-medium text-[#5A6E68]">
      {label} {required && <span className="text-[#C86D51]">*</span>}
    </label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6E68] pointer-events-none">{icon}</span>}
      {children}
    </div>
  </div>
);

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <span className="w-7 h-7 rounded-lg bg-[#F9F8F3] border border-[#E5E2D9] text-[#C86D51] flex items-center justify-center">
      {icon}
    </span>
    <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#1E3A34]">{title}</h3>
  </div>
);
