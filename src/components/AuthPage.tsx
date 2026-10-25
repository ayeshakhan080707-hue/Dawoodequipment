import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Phone, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import dawoodLogo from '../assets/images/ea89d751-72fc-4744-bb51-a5f7bae6c659.png';
import { UserRole } from '../types/auth';

interface AuthPageProps {
  onSuccess: (role: UserRole) => void;
  onNavigateHome: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, onNavigateHome }) => {
  const { login, register } = useAuth();
  
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Sign In state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register state
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [destinationPort, setDestinationPort] = useState('Direct Inland Delivery (US / Canada)');

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');

    if (!email || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(email.trim(), password);

      if (result.success && result.role) {
        setSuccessNotice(`Authentication successful. Redirecting...`);
        setTimeout(() => {
          onSuccess(result.role as UserRole);
        }, 500);
      } else {
        setErrorMessage(result.message || 'Invalid credentials or server unavailable.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');

    if (!regEmail || !regPassword || !fullName || !companyName) {
      setErrorMessage('Please fill in all required fields (Name, Email, Password, Company).');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await register({
        name: fullName.trim(),
        email: regEmail.trim(),
        password: regPassword,
        company: companyName.trim(),
        phone: regPhone.trim() || '+1 (555) 000-0000',
        country,
        destinationPort
      });

      if (result.success && result.role) {
        setSuccessNotice('Account registered successfully! Redirecting...');
        setTimeout(() => {
          onSuccess(result.role as UserRole);
        }, 600);
      } else {
        setErrorMessage(result.message || 'Registration failed. Email may already be in use.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed due to connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* Background industrial pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Top back bar */}
      <div className="max-w-md w-full mx-auto mb-6 flex items-center justify-between relative z-10">
        <button
          type="button"
          onClick={onNavigateHome}
          className="text-xs font-mono font-bold text-gray-500 hover:text-[#FFB800] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          ← Return to Dawood Equipment Public Website
        </button>
      </div>

      <div className="max-w-md w-full mx-auto bg-white backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative z-10">
        
        {/* Header Branding */}
        <div className="bg-gradient-to-b from-white to-gray-50 p-6 text-center border-b border-gray-200 text-gray-900 relative">
          <div className="flex justify-center mb-2">
            <img 
              src={dawoodLogo} 
              alt="Dawood Equipment Co." 
              className="h-14 w-auto object-contain" 
            />
          </div>
          <p className="text-xs font-mono text-gray-500 mt-1">
            Global Machinery Dealership & Operations Portal
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Register */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMessage(''); setSuccessNotice(''); }}
            className={`flex-1 py-3.5 text-center text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              mode === 'signin' 
                ? 'bg-white text-[#FFB800] border-b-2 border-[#FFB800]' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign In to Portal
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); setSuccessNotice(''); }}
            className={`flex-1 py-3.5 text-center text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              mode === 'register' 
                ? 'bg-white text-[#FFB800] border-b-2 border-[#FFB800]' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            New Buyer Account
          </button>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successNotice && (
          <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-300 text-green-700 text-xs rounded-lg flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* FORM 1: SIGN IN */}
        {mode === 'signin' ? (
          <form onSubmit={handleSignInSubmit} className="p-6 space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase font-mono tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase font-mono tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-heading font-black uppercase text-sm tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In Securely</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <span className="text-xs text-gray-500">
                New buyer or international contractor?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className="text-[#FFB800] hover:underline font-bold cursor-pointer"
                >
                  Register Account
                </button>
              </span>
            </div>

          </form>
        ) : (
          /* FORM 2: CLIENT REGISTRATION */
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-3.5">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase font-mono">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe / Tariq Al-Mansoor"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase font-mono">
                Company / Contractor Organization *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Gulf Infrastructure LLC"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase font-mono">
                  Corporate Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="buyer@domain.com"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase font-mono">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    required
                    minLength={6}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase font-mono">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase font-mono">
                  Country / Region
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="United States / UAE"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase font-mono">
                Primary Destination Seaport / Jobsite Delivery Zone
              </label>
              <div className="relative">
                <Truck className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  placeholder="e.g. Jebel Ali / Dubai, UAE or Chicago, IL"
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-3 py-3 bg-[#FFB800] hover:bg-[#E5A700] text-slate-950 font-heading font-black uppercase text-sm tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-1">
              <span className="text-xs text-gray-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setErrorMessage(''); }}
                  className="text-[#FFB800] hover:underline font-bold cursor-pointer"
                >
                  Sign In Here
                </button>
              </span>
            </div>

          </form>
        )}

        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-[11px] text-gray-500 font-mono">
            Dawood Equipment Co. Official Dealer Portal · Encrypted 256-bit SSL · Illinois, USA
          </p>
        </div>

      </div>
    </div>
  );
};
