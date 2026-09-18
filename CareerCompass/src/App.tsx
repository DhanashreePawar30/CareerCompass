import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ProfilePage } from './pages/ProfilePage';
import { AssessmentHubPage } from './pages/AssessmentHubPage';
import { FiroBQuestionPage } from './pages/FiroBQuestionPage';
import { CustomQuestionPage } from './pages/CustomQuestionPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { CareerDetailsPage } from './pages/CareerDetailsPage';

// Scroll to top on navigation helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <AssessmentProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F9F8F3] text-[#1E3A34] selection:bg-[#C86D51] selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/assessment" element={<AssessmentHubPage />} />
              <Route path="/assessment/firo-b" element={<FiroBQuestionPage />} />
              <Route path="/assessment/custom" element={<CustomQuestionPage />} />
              <Route path="/assessment/complete" element={<ProcessingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/recommendations" element={<RecommendationsPage />} />
              <Route path="/explorer/:id" element={<CareerDetailsPage />} />
              {/* Fallback route */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AssessmentProvider>
  );
}

export default App;
