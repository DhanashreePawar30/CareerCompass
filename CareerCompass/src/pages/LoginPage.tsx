import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Compass, Lock, Mail } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAssessment();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email);
    navigate('/assessment');
  };

  return (
      <div className="origin-top scale-[0.95]">

    <main className="min-h-[calc(100vh-82px)] flex items-center justify-center px-5 sm:px-8 py-10 sm:py-14">
      <div className="w-full max-w-5xl scale-[0.9]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[28px] border border-[#E5E2D9] bg-white shadow-[0_20px_60px_rgba(30,58,52,0.10)]">
          {/* Brand panel */}
          <section className="relative hidden lg:flex flex-col justify-between bg-[#1E3A34] p-10 xl:p-12 text-[#F9F8F3] overflow-hidden">
            <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-[#C86D51]/15 blur-2xl" />
            <div className="absolute -left-20 -top-20 w-56 h-56 rounded-full border border-[#F9F8F3]/10" />

            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F9F8F3] flex items-center justify-center shadow-sm mb-8">
                <Compass className="w-6 h-6 text-[#C86D51]" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#D98970] mb-3">CareerCompass</p>
              <h2 className="font-editorial text-4xl xl:text-5xl leading-[1.02] font-bold">
                A clearer way to understand your career direction.
              </h2>
              <p className="mt-5 text-sm leading-6 text-[#D8E2DE] max-w-sm">
                Complete your assessment to understand your interpersonal profile and explore career paths that fit your strengths.
              </p>
            </div>

            <div className="relative space-y-3 pt-10">
              {[
                'Complete your FIRO-B assessment',
                'Understand your interpersonal profile',
                'Continue to your CareerCompass dashboard',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#E5ECE9]">
                  <CheckCircle2 className="w-4 h-4 text-[#D98970] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Form panel */}
          <section className="px-6 py-9 sm:px-10 sm:py-11 lg:px-12 xl:px-14">
            <div className="max-w-md mx-auto">
              <div className="lg:hidden flex justify-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#1E3A34] text-[#F9F8F3] flex items-center justify-center shadow-sm">
                  <Compass className="w-6 h-6 text-[#C86D51]" />
                </div>
              </div>

              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FBECE7] border border-[#EBC8BC] text-[#C86D51] text-[10px] font-bold uppercase tracking-[0.14em]">
                  Welcome back
                </span>
                <h1 className="font-editorial text-4xl sm:text-[42px] leading-[1.05] font-bold text-[#1E3A34] mt-4">
                  Sign in to continue
                </h1>
                <p className="text-sm sm:text-[15px] leading-6 text-[#5A6E68] mt-3 max-w-md">
                  Access your CareerCompass assessment and continue your career discovery journey.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="login-email" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#1E3A34]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-[18px] h-[18px] text-[#6A7C77] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#F9F8F3] border border-[#DDD9CF] text-sm text-[#1E3A34] placeholder:text-[#91A09B] transition focus:outline-none focus:ring-2 focus:ring-[#C86D51]/15 focus:border-[#C86D51]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="login-password" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#1E3A34]">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-[18px] h-[18px] text-[#6A7C77] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="login-password"
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#F9F8F3] border border-[#DDD9CF] text-sm text-[#1E3A34] placeholder:text-[#91A09B] transition focus:outline-none focus:ring-2 focus:ring-[#C86D51]/15 focus:border-[#C86D51]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#C86D51] hover:bg-[#B85E45] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <span>Sign In & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center gap-3 my-7">
                <div className="h-px flex-1 bg-[#E5E2D9]" />
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#8A9994]">New to CareerCompass?</span>
                <div className="h-px flex-1 bg-[#E5E2D9]" />
              </div>

              <Link
                to="/register"
                className="w-full h-11 rounded-xl border border-[#C9D1CD] text-[#1E3A34] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#F5F4EF] transition-colors"
              >
                Create an account
                <ArrowRight className="w-4 h-4 text-[#C86D51]" />
              </Link>

              <p className="text-center text-[11px] leading-5 text-[#8A9994] mt-6">
                Your assessment progress will be saved to your CareerCompass profile.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
      </div>
  );
};
