import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModuleShowcase from './components/ModuleShowcase';
import AboutUsSection from './components/AboutUsSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import PortalsPage from './components/PortalsPage';
import Login from './components/Login';
import { authAPI } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPortal, setSelectedPortal] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePortalClick = async (portalInfo) => {
    // Check if user is already authenticated
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      // User is already logged in, generate token (or use cached) and redirect directly
      try {
        // Try to use cached token first, generate new if needed
        const tokenResponse = await authAPI.generatePortalToken(portalInfo.portalId, false);

        if (tokenResponse.success) {
          let redirectUrl = portalInfo.url;

          // Special logic for Student Portal
          if (portalInfo.portalId === 'student-portal') {
            const userStr = localStorage.getItem('user');
            if (userStr) {
              const user = JSON.parse(userStr);
              const baseUrl = new URL(portalInfo.url).origin;
              if (user.databaseSource === 'rbac_users') {
                redirectUrl = `${baseUrl}/login`;
              } else {
                redirectUrl = `${baseUrl}/student/login`;
              }
            }
          }

          // Redirect to portal with encrypted token
          const portalUrl = new URL(redirectUrl);
          portalUrl.searchParams.set('token', tokenResponse.data.encryptedToken);
          window.location.href = portalUrl.toString();
          return;
        }
      } catch (error) {
        console.error('Portal redirect error:', error);
      }
    }

    // Default: fallback to login page if no token or generation fails
    setSelectedPortal(portalInfo);
    setCurrentPage('login');
    window.scrollTo(0, 0);
  };

  const handleLoginBack = () => {
    setCurrentPage('portals');
    setSelectedPortal(null);
  };

  const handleLoginSuccess = (userData) => {
    // Login success is handled in Login component (redirects to portal)
    console.log('Login successful:', userData);
  };

  return (
    <div className="app">
      <div className="cloud-bg" />
      <Navbar onNavigate={handleNavigate} onPortalClick={handlePortalClick} />

      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={handleNavigate} />
            <ModuleShowcase />
            <AboutUsSection />
            <FeaturesSection />
            <CTASection onNavigate={handleNavigate} />
          </>
        ) : currentPage === 'login' ? (
          <Login
            portalInfo={selectedPortal}
            onLoginSuccess={handleLoginSuccess}
            onBack={handleLoginBack}
          />
        ) : currentPage === 'portals' ? (
          <PortalsPage
            onBack={() => handleNavigate('home')}
            onPortalClick={handlePortalClick}
          />
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

export default App;
