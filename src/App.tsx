import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PrimeNavbar } from './components/PrimeNavbar';
import { PrimeHero } from './components/PrimeHero';
import { PrimeFleetCatalog } from './components/PrimeFleetCatalog';
import { AllMachineryPage } from './components/AllMachineryPage';
import { MachineryDetailPage } from './components/MachineryDetailPage';
import { PrimeServicesShowcase } from './components/PrimeServicesShowcase';
import { RentalCostEstimator } from './components/RentalCostEstimator';
import { SellEquipmentSection } from './components/SellEquipmentSection';
import { PrimeIndustries } from './components/PrimeIndustries';
import { PrimeBuiltOnTrust } from './components/PrimeBuiltOnTrust';
import { PrimeTestimonials } from './components/PrimeTestimonials';
import { PrimeBlogGuides } from './components/PrimeBlogGuides';
import { PrimeCtaBanner } from './components/PrimeCtaBanner';
import { ContactSection } from './components/ContactSection';
import { PrimeFooter } from './components/PrimeFooter';
import { BookingDispatchModal } from './components/BookingDispatchModal';
import { ExpertHelpModal } from './components/ExpertHelpModal';
import { AuthPage } from './components/AuthPage';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Equipment } from './types/equipment';
import { FLEET_INVENTORY } from './data/fleetData';
import { UserRole } from './types/auth';
import { Globe } from 'lucide-react';

function AppContent() {
  const { currentUser, fleet, isLoadingAuth } = useAuth();
  
  const [currentView, setCurrentView] = useState<
    'home' | 'all-machinery' | 'machine-detail' | 'login' | 'user-dashboard' | 'admin-dashboard'
  >('home');

  const [selectedMachine, setSelectedMachine] = useState<Equipment>(fleet[1] || FLEET_INVENTORY[1]);
  const [selectedMachineForEstimator, setSelectedMachineForEstimator] = useState<string>((fleet[1] || FLEET_INVENTORY[1])?.id || 'prod-9607442961');
  const [isExpertHelpOpen, setIsExpertHelpOpen] = useState(false);

  // Pro-Forma Purchase / Shipping modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState<{
    equipment: Equipment;
    config: any;
    breakdown: any;
  }>({
    equipment: fleet[1] || FLEET_INVENTORY[1],
    config: {
      equipmentId: (fleet[1] || FLEET_INVENTORY[1])?.id || 'prod-9607442961',
      destinationType: 'ocean_export',
      destinationPort: 'Jebel Ali / Dubai, UAE',
      shippingMode: 'containerized',
      includeInlandTrucking: true,
      includeContainerizingTeardown: true,
      includeOceanFreight: true,
      includeExportDocumentation: true,
      includeMarineInsurance: true,
    },
    breakdown: {
      inlandTruckingFee: 5400,
      containerizingFee: 4800,
      oceanFreightFee: 5500,
      documentationFee: 550,
      insuranceFee: 4620,
      totalEstimatedLogistics: 20870,
      estimatedTransitWeeks: '32-38 Days',
      recommendedPort: 'Jebel Ali / Dubai, UAE',
    },
  });

  // Listen to browser hash changes & protect Admin Route
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#all-machinery' || hash === '#collections/all-machinery') {
        setCurrentView('all-machinery');
      } else if (hash === '#login') {
        setCurrentView('login');
      } else if (hash === '#user-dashboard') {
        setCurrentView('user-dashboard');
      } else if (hash === '#admin-dashboard') {
        // Authorization check for admin dashboard
        if (!isLoadingAuth && (!currentUser || currentUser.role !== 'admin')) {
          window.location.hash = '#login';
          setCurrentView('login');
        } else {
          setCurrentView('admin-dashboard');
        }
      } else if (hash.startsWith('#machine-')) {
        const id = hash.replace('#machine-', '');
        const found = fleet.find((m) => m.id === id || m.stockNumber === id) || 
                      FLEET_INVENTORY.find((m) => m.id === id || m.stockNumber === id);
        if (found) {
          setSelectedMachine(found);
          setCurrentView('machine-detail');
        }
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [fleet, currentUser, isLoadingAuth]);

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAllMachinery = () => {
    setCurrentView('all-machinery');
    window.location.hash = '#collections/all-machinery';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateLogin = () => {
    setCurrentView('login');
    window.location.hash = '#login';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateDashboard = (role: UserRole) => {
    const target = role === 'admin' ? 'admin-dashboard' : 'user-dashboard';
    setCurrentView(target);
    window.location.hash = '#' + target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectMachine = (machine: Equipment) => {
    setSelectedMachine(machine);
    setCurrentView('machine-detail');
    window.location.hash = `#machine-${machine.stockNumber || machine.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEstimator = (machine?: Equipment) => {
    if (machine) {
      setSelectedMachineForEstimator(machine.id);
    }
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const el = document.getElementById('shipping-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleScrollToEquipment = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('equipment');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('equipment');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedBooking = (config: any, breakdown: any, equipment: Equipment) => {
    setBookingData({
      equipment,
      config,
      breakdown,
    });
    setIsBookingOpen(true);
  };

  // =========================================================================
  // ISOLATED FULL-SCREEN VIEW: DEALERSHIP ADMIN OPERATIONS DASHBOARD
  // (No public header or footer cluttering the admin console)
  // =========================================================================
  if (currentView === 'admin-dashboard') {
    return (
      <AdminDashboard
        onNavigateHome={handleNavigateHome}
        onInspectMachine={handleInspectMachine}
      />
    );
  }

  // =========================================================================
  // ISOLATED VIEW: SECURE AUTHENTICATION (LOGIN & REGISTRATION)
  // =========================================================================
  if (currentView === 'login') {
    return (
      <AuthPage
        onSuccess={(role) => handleNavigateDashboard(role)}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  // =========================================================================
  // STANDARD PUBLIC & CLIENT EXPERIENCES (With PrimeNavbar & PrimeFooter)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-[#FFB800] selection:text-slate-950">
      
      {/* Official Navigation Bar */}
      <PrimeNavbar
        onOpenQuote={() => handleOpenEstimator()}
        onOpenExpertHelp={() => setIsExpertHelpOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateAllMachinery={handleNavigateAllMachinery}
        onNavigateLogin={handleNavigateLogin}
        onNavigateDashboard={handleNavigateDashboard}
      />

      <main className="flex-1">
        
        {currentView === 'user-dashboard' ? (
          /* VIEW: BUYER CLIENT DASHBOARD */
          <UserDashboard
            onNavigateHome={handleNavigateHome}
            onNavigateAllMachinery={handleNavigateAllMachinery}
            onInspectMachine={handleInspectMachine}
            onOpenEstimator={() => handleOpenEstimator()}
          />
        ) : currentView === 'machine-detail' ? (
          /* VIEW: DEDICATED MACHINE DETAIL & INQUIRY PAGE */
          <MachineryDetailPage
            machine={selectedMachine}
            onBackToCatalog={handleNavigateAllMachinery}
            onOpenShippingEstimator={(m) => handleOpenEstimator(m)}
          />
        ) : currentView === 'all-machinery' ? (
          /* VIEW: DEDICATED ALL MACHINERY CATALOG PAGE */
          <AllMachineryPage
            fleet={fleet}
            onBackToHome={handleNavigateHome}
            onInspectMachine={handleInspectMachine}
            onOpenShippingEstimator={(m) => handleOpenEstimator(m)}
          />
        ) : (
          /* VIEW: MAIN HOMEPAGE */
          <>
            {/* Hero Section */}
            <PrimeHero
              onOpenQuote={() => handleOpenEstimator()}
              onBrowseInventory={handleScrollToEquipment}
            />

            {/* Catalog Section with "View All Equipments" button */}
            <PrimeFleetCatalog
              fleet={fleet}
              onInspectMachine={handleInspectMachine}
              onSelectForQuote={(machine) => handleOpenEstimator(machine)}
              onViewAll={handleNavigateAllMachinery}
            />

            {/* Auxiliary Services Provided: Trucking, Containerizing, Ocean Freight */}
            <PrimeServicesShowcase
              onOpenShippingEstimator={() => handleOpenEstimator()}
              onRequestQuote={() => handleOpenEstimator()}
            />

            {/* Interactive Worldwide Shipping & Export Rate Estimator */}
            <div id="shipping-calculator" className="bg-white text-slate-900 py-16 border-b border-slate-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D97706] uppercase tracking-wider mb-2">
                  <Globe className="w-4 h-4" />
                  <span>FREIGHT LOGISTICS & PORT CALCULATOR</span>
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
                  Calculate Trucking, Containerizing & Ocean Freight
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                  Select any machine from our inventory and choose your destination seaport or domestic US delivery zone to view instant estimated transport costs.
                </p>
              </div>

              <RentalCostEstimator
                selectedEquipmentId={selectedMachineForEstimator}
                onProceedBooking={handleProceedBooking}
              />
            </div>

            {/* We Buy Heavy Equipment (Surplus Machine Submission Form) */}
            <SellEquipmentSection />

            {/* Direct Contact & Lead Capture Form (/pages/contact-us) */}
            <ContactSection />

            {/* Powering Projects Across Key Industries */}
            <PrimeIndustries
              onOpenQuote={() => handleOpenEstimator()}
            />

            {/* Built on Trust */}
            <PrimeBuiltOnTrust
              onLearnMore={() => setIsExpertHelpOpen(true)}
            />

            {/* Customer Testimonials & Worldwide Exporter Feedback */}
            <PrimeTestimonials />

            {/* Equipment Buying & Containerizing Field Guides */}
            <PrimeBlogGuides />

            {/* Upgrade Your Fleet with Confidence */}
            <PrimeCtaBanner
              onTalkToSpecialist={() => setIsExpertHelpOpen(true)}
              onRequestPricing={() => handleOpenEstimator()}
            />
          </>
        )}

      </main>

      {/* Corporate Footer with Official Credentials */}
      <PrimeFooter />

      {/* Pro-Forma Invoice & Purchase Request Modal */}
      <BookingDispatchModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        equipment={bookingData.equipment}
        config={bookingData.config}
        breakdown={bookingData.breakdown}
      />

      {/* Expert Help / Callback Modal */}
      <ExpertHelpModal
        isOpen={isExpertHelpOpen}
        onClose={() => setIsExpertHelpOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
