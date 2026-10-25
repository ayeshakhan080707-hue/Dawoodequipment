import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserProfile, 
  BuyerInquiry, 
  ShipmentTrackingRecord, 
  SellOfferSubmission,
  UserRole,
  InquiryStatus
} from '../types/auth';
import { Equipment, Manufacturer, CategoryItem } from '../types/equipment';
import { 
  INITIAL_INQUIRIES, 
  INITIAL_SHIPMENTS, 
  INITIAL_SELL_OFFERS 
} from '../data/authSeedData';
import { FLEET_INVENTORY } from '../data/fleetData';

export const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface UserRecord {
  _id: string;
  name: string;
  email: string;
  role: 'buyer' | 'admin';
  company: string;
  phone: string;
  country: string;
  destinationPort?: string;
  status: 'active' | 'suspended';
  createdAt: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  token: string | null;
  serverStatus: 'connected' | 'offline';
  isLoadingAuth: boolean;
  
  // Real Auth API
  login: (email: string, password: string) => Promise<{ success: boolean; role?: UserRole; message?: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    company?: string;
    phone?: string;
    country?: string;
    destinationPort?: string;
  }) => Promise<{ success: boolean; role?: UserRole; message?: string }>;
  logout: () => void;
  
  // Fleet management (All Powers)
  fleet: Equipment[];
  refreshFleet: () => Promise<void>;
  updateMachine: (machine: Equipment) => Promise<boolean>;
  addMachine: (machine: Partial<Equipment>) => Promise<boolean>;
  deleteMachine: (id: string) => Promise<boolean>;
  toggleSoldStatus: (id: string) => Promise<boolean>;

  // Inquiries & RFQs (All Powers)
  inquiries: BuyerInquiry[];
  refreshInquiries: () => Promise<void>;
  addInquiry: (inquiry: Omit<BuyerInquiry, 'id' | 'inquiryDate'>) => Promise<boolean>;
  updateInquiryStatus: (id: string, status: InquiryStatus, brokerNotes?: string, priceQuoted?: number, proFormaNumber?: string) => Promise<boolean>;
  deleteInquiry: (id: string) => Promise<boolean>;

  // Shipments & Logistics (All Powers)
  shipments: ShipmentTrackingRecord[];
  refreshShipments: () => Promise<void>;
  updateShipmentStatus: (id: string, status: any, milestone: string, progressPercent?: number) => Promise<boolean>;
  addShipment: (shipment: Partial<ShipmentTrackingRecord>) => Promise<boolean>;
  deleteShipment: (id: string) => Promise<boolean>;

  // Sell Offers (Surplus Machine Submissions)
  sellOffers: SellOfferSubmission[];
  refreshSellOffers: () => Promise<void>;
  addSellOffer: (offer: Omit<SellOfferSubmission, 'id' | 'submittedDate' | 'status'>) => Promise<boolean>;
  updateSellOfferStatus: (id: string, status: any, adminOfferPrice?: number) => Promise<boolean>;
  deleteSellOffer: (id: string) => Promise<boolean>;

  // User Administration (Admin Only)
  users: UserRecord[];
  fetchUsers: () => Promise<void>;
  createUser: (data: { name: string; email: string; password: string; company?: string; phone?: string; country?: string; role: 'buyer' | 'admin' }) => Promise<{ success: boolean; message?: string }>;
  updateUserRole: (userId: string, role: 'buyer' | 'admin') => Promise<boolean>;
  updateUserStatus: (userId: string, status: 'active' | 'suspended') => Promise<boolean>;

  // User Profile
  updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;

  // Taxonomy (Manufacturers & Categories)
  manufacturers: Manufacturer[];
  categories: CategoryItem[];
  refreshTaxonomy: () => Promise<void>;
  addManufacturer: (data: { name: string; slug?: string; country?: string; description?: string }) => Promise<{ success: boolean; message?: string }>;
  updateManufacturer: (id: string, data: Partial<Manufacturer>) => Promise<{ success: boolean; message?: string }>;
  deleteManufacturer: (id: string) => Promise<{ success: boolean; message?: string }>;
  addCategory: (data: { name: string; slug?: string; description?: string; icon?: string }) => Promise<{ success: boolean; message?: string }>;
  updateCategory: (id: string, data: Partial<CategoryItem>) => Promise<{ success: boolean; message?: string }>;
  deleteCategory: (id: string) => Promise<{ success: boolean; message?: string }>;

  // System Tools
  reseedDatabase: () => Promise<boolean>;

  // Bookmarking
  savedMachineIds: string[];
  toggleSaveMachine: (id: string) => void;
  isMachineSaved: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('dawood_jwt_token'));
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('dawood_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [serverStatus, setServerStatus] = useState<'connected' | 'offline'>('offline');
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Core Data Collections
  const [fleet, setFleet] = useState<Equipment[]>(FLEET_INVENTORY);
  const [inquiries, setInquiries] = useState<BuyerInquiry[]>(INITIAL_INQUIRIES);
  const [shipments, setShipments] = useState<ShipmentTrackingRecord[]>(INITIAL_SHIPMENTS);
  const [sellOffers, setSellOffers] = useState<SellOfferSubmission[]>(INITIAL_SELL_OFFERS);
  const [users, setUsers] = useState<UserRecord[]>([]);

  // Dynamic Taxonomy State
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([
    { name: 'Caterpillar', slug: 'CATERPILLAR', country: 'United States', description: 'World leading manufacturer' },
    { name: 'Komatsu', slug: 'KOMATSU', country: 'Japan', description: 'Japanese manufacturer' },
    { name: 'Case', slug: 'CASE', country: 'United States', description: 'Premium backhoes & loaders' },
    { name: 'Blaw-Knox', slug: 'BLAW-KNOX', country: 'United States', description: 'Road paving equipment' },
    { name: 'John Deere', slug: 'JOHN DEERE', country: 'United States', description: 'Forestry & earthmoving' },
    { name: 'Sakai', slug: 'SAKAI', country: 'Japan', description: 'Compaction rollers' },
    { name: 'Taylor', slug: 'TAYLOR', country: 'United States', description: 'Heavy industrial forklifts' }
  ]);
  const [categories, setCategories] = useState<CategoryItem[]>([
    { name: 'Dozers', slug: 'Dozer', description: 'Crawler bulldozers' },
    { name: 'Excavators', slug: 'Excavators', description: 'Hydraulic excavators' },
    { name: 'Wheel Loaders', slug: 'Wheel Loader', description: 'Production wheel loaders' },
    { name: 'Backhoe Loaders', slug: 'Backhoes', description: 'Trenching backhoes' },
    { name: 'Rollers & Compactors', slug: 'Roller', description: 'Vibratory compactors' },
    { name: 'Heavy Forklifts', slug: 'Forklift', description: 'Heavy forklifts' },
    { name: 'Asphalt Pavers', slug: 'Asphalt Paver', description: 'Highway paving equipment' },
    { name: 'Motor Graders', slug: 'Motor Grader', description: 'Precision haul road graders' }
  ]);

  // Saved machines - default to empty array
  const [savedMachineIds, setSavedMachineIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dawood_saved_machines');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Helper for authenticated requests
  const getAuthHeaders = useCallback(() => {
    const currentToken = token || localStorage.getItem('dawood_jwt_token');
    return {
      'Content-Type': 'application/json',
      ...(currentToken ? { 'Authorization': `Bearer ${currentToken}` } : {})
    };
  }, [token]);

  // Check health and MongoDB connection
  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/health`);
      if (res.ok) {
        setServerStatus('connected');
        return true;
      }
      setServerStatus('offline');
      return false;
    } catch {
      setServerStatus('offline');
      return false;
    }
  }, []);

  // Fetch Current User on mount if token exists
  const fetchCurrentUser = useCallback(async (authToken: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const profile: UserProfile = {
            id: data.user._id || data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            company: data.user.company,
            phone: data.user.phone,
            country: data.user.country,
            destinationPort: data.user.destinationPort,
            consigneeDetails: data.user.consigneeDetails
          };
          setCurrentUser(profile);
          localStorage.setItem('dawood_current_user', JSON.stringify(profile));
        }
      } else {
        // Token invalid or expired
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('dawood_jwt_token');
        localStorage.removeItem('dawood_current_user');
      }
    } catch {
      // Keep local state if server temporarily unreachable
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  // Fetch Fleet from MongoDB
  const refreshFleet = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/equipment`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setFleet(json.data);
          setServerStatus('connected');
        }
      }
    } catch (err) {
      console.warn('Could not fetch fleet from backend, using cached/static data', err);
    }
  }, []);

  // Fetch Inquiries
  const refreshInquiries = useCallback(async () => {
    const currentToken = token || localStorage.getItem('dawood_jwt_token');
    if (!currentToken) return;

    try {
      const res = await fetch(`${API_URL}/inquiries`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setInquiries(json.data);
        }
      }
    } catch (err) {
      console.warn('Could not fetch inquiries', err);
    }
  }, [token, getAuthHeaders]);

  // Fetch Shipments
  const refreshShipments = useCallback(async () => {
    const currentToken = token || localStorage.getItem('dawood_jwt_token');
    if (!currentToken) return;

    try {
      const res = await fetch(`${API_URL}/shipments`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setShipments(json.data);
        }
      }
    } catch (err) {
      console.warn('Could not fetch shipments', err);
    }
  }, [token, getAuthHeaders]);

  // Fetch Sell Offers
  const refreshSellOffers = useCallback(async () => {
    const currentToken = token || localStorage.getItem('dawood_jwt_token');
    if (!currentToken) return;

    try {
      const res = await fetch(`${API_URL}/sell-offers`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setSellOffers(json.data);
        }
      }
    } catch (err) {
      console.warn('Could not fetch sell offers', err);
    }
  }, [token, getAuthHeaders]);

  // Fetch Users (Admin Only)
  const fetchUsers = useCallback(async () => {
    const currentToken = token || localStorage.getItem('dawood_jwt_token');
    if (!currentToken || currentUser?.role !== 'admin') return;

    try {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        if (json.users) {
          setUsers(json.users);
        }
      }
    } catch (err) {
      console.warn('Could not fetch users', err);
    }
  }, [token, currentUser, getAuthHeaders]);

  // Initial Boot
  useEffect(() => {
    checkHealth();
    refreshFleet();
    // Fetch taxonomy directly (refreshTaxonomy is declared later via useCallback)
    Promise.all([
      fetch(`${API_URL}/taxonomy/manufacturers`),
      fetch(`${API_URL}/taxonomy/categories`)
    ]).then(async ([resM, resC]) => {
      if (resM.ok) {
        const jsonM = await resM.json();
        if (jsonM.data && Array.isArray(jsonM.data) && jsonM.data.length > 0) setManufacturers(jsonM.data);
      }
      if (resC.ok) {
        const jsonC = await resC.json();
        if (jsonC.data && Array.isArray(jsonC.data) && jsonC.data.length > 0) setCategories(jsonC.data);
      }
    }).catch(err => console.warn('Could not fetch taxonomy on boot', err));

    const savedToken = localStorage.getItem('dawood_jwt_token');
    if (savedToken) {
      fetchCurrentUser(savedToken);
    } else {
      setIsLoadingAuth(false);
    }
  }, [checkHealth, refreshFleet, fetchCurrentUser]);

  // Sync related data when user changes
  useEffect(() => {
    if (currentUser) {
      refreshInquiries();
      refreshShipments();
      refreshSellOffers();
      if (currentUser.role === 'admin') {
        fetchUsers();
      }
    }
  }, [currentUser, refreshInquiries, refreshShipments, refreshSellOffers, fetchUsers]);

  // Save bookmarked IDs
  useEffect(() => {
    localStorage.setItem('dawood_saved_machines', JSON.stringify(savedMachineIds));
  }, [savedMachineIds]);

  // Real Login
  const login = async (email: string, password: string): Promise<{ success: boolean; role?: UserRole; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Invalid email or password' };
      }

      setToken(data.token);
      localStorage.setItem('dawood_jwt_token', data.token);

      const profile: UserProfile = {
        id: data.user.id || data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        company: data.user.company,
        phone: data.user.phone,
        country: data.user.country,
        destinationPort: data.user.destinationPort,
        consigneeDetails: data.user.consigneeDetails
      };

      setCurrentUser(profile);
      localStorage.setItem('dawood_current_user', JSON.stringify(profile));
      setServerStatus('connected');

      return { success: true, role: data.user.role, message: data.message };
    } catch (err: any) {
      return { success: false, message: 'Server connection failed. Ensure Express server is running.' };
    }
  };

  // Real Register
  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    company?: string;
    phone?: string;
    country?: string;
    destinationPort?: string;
  }): Promise<{ success: boolean; role?: UserRole; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Registration failed' };
      }

      setToken(data.token);
      localStorage.setItem('dawood_jwt_token', data.token);

      const profile: UserProfile = {
        id: data.user.id || data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        company: data.user.company,
        phone: data.user.phone,
        country: data.user.country,
        destinationPort: data.user.destinationPort,
        consigneeDetails: data.user.consigneeDetails
      };

      setCurrentUser(profile);
      localStorage.setItem('dawood_current_user', JSON.stringify(profile));

      return { success: true, role: data.user.role, message: data.message };
    } catch (err: any) {
      return { success: false, message: 'Could not connect to backend server for registration.' };
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('dawood_jwt_token');
    localStorage.removeItem('dawood_current_user');
  };

  // Fleet Operations (All Powers)
  const addMachine = async (machine: Partial<Equipment>): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/equipment`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(machine)
      });
      if (res.ok) {
        await refreshFleet();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateMachine = async (machine: Equipment): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/equipment/${machine.id || machine.stockNumber}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(machine)
      });
      if (res.ok) {
        await refreshFleet();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteMachine = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/equipment/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await refreshFleet();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const toggleSoldStatus = async (id: string): Promise<boolean> => {
    // Optimistic UI update
    setFleet(prev => prev.map(m => {
      if (m.id === id || m.stockNumber === id) {
        const nextSold = !m.isSold;
        return {
          ...m,
          isSold: nextSold,
          priceDisplay: nextSold ? '(SOLD)' : (m.numericPrice ? `$${m.numericPrice.toLocaleString()}` : 'Call for Price')
        };
      }
      return m;
    }));

    try {
      const res = await fetch(`${API_URL}/equipment/${id}/toggle-sold`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setFleet(prev => prev.map(m => (m.id === id || m.stockNumber === id ? json.data : m)));
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Inquiry Operations
  const addInquiry = async (inquiryData: Omit<BuyerInquiry, 'id' | 'inquiryDate'>): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      if (res.ok) {
        await refreshInquiries();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateInquiryStatus = async (
    id: string, 
    status: InquiryStatus, 
    brokerNotes?: string, 
    priceQuoted?: number,
    proFormaNumber?: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, brokerNotes, priceQuoted, proFormaNumber })
      });
      if (res.ok) {
        await refreshInquiries();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/inquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await refreshInquiries();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Shipment Operations
  const updateShipmentStatus = async (
    id: string, 
    status: any, 
    milestone: string, 
    progressPercent?: number
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/shipments/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, currentMilestone: milestone, progressPercent })
      });
      if (res.ok) {
        await refreshShipments();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const addShipment = async (shipment: Partial<ShipmentTrackingRecord>): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/shipments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(shipment)
      });
      if (res.ok) {
        await refreshShipments();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteShipment = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/shipments/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await refreshShipments();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Sell Offers Operations
  const addSellOffer = async (offerData: Omit<SellOfferSubmission, 'id' | 'submittedDate' | 'status'>): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/sell-offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offerData)
      });
      if (res.ok) {
        await refreshSellOffers();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateSellOfferStatus = async (id: string, status: any, adminOfferPrice?: number): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/sell-offers/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, adminOfferPrice })
      });
      if (res.ok) {
        await refreshSellOffers();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteSellOffer = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/sell-offers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await refreshSellOffers();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // User Management
  const updateUserRole = async (userId: string, role: 'buyer' | 'admin'): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/users/${userId}/role`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ role })
      });
      if (res.ok) {
        await fetchUsers();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateUserStatus = async (userId: string, status: 'active' | 'suspended'): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/users/${userId}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchUsers();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Admin: Create user directly
  const createUser = async (data: { name: string; email: string; password: string; company?: string; phone?: string; country?: string; role: 'buyer' | 'admin' }): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/auth/users/create`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchUsers();
        return { success: true, message: json.message };
      }
      return { success: false, message: json.message || 'Failed to create user' };
    } catch {
      return { success: false, message: 'Network error — could not create user' };
    }
  };

  // Database reseed trigger
  const reseedDatabase = async (): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/seed`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        await refreshFleet();
        await refreshInquiries();
        await refreshShipments();
        await refreshSellOffers();
        await fetchUsers();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Update Profile & Consignee Customs Details
  const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.user) {
          const updated: UserProfile = {
            id: json.user._id || json.user.id,
            name: json.user.name,
            email: json.user.email,
            role: json.user.role,
            company: json.user.company,
            phone: json.user.phone,
            country: json.user.country,
            destinationPort: json.user.destinationPort,
            consigneeDetails: json.user.consigneeDetails
          };
          setCurrentUser(updated);
          localStorage.setItem('dawood_current_user', JSON.stringify(updated));
          return true;
        }
      }
      // Local fallback
      if (currentUser) {
        const updated: UserProfile = {
          ...currentUser,
          ...profileData,
          consigneeDetails: {
            ...(currentUser.consigneeDetails || {}),
            ...(profileData.consigneeDetails || {})
          }
        };
        setCurrentUser(updated);
        localStorage.setItem('dawood_current_user', JSON.stringify(updated));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to update profile', err);
      if (currentUser) {
        const updated: UserProfile = {
          ...currentUser,
          ...profileData,
          consigneeDetails: {
            ...(currentUser.consigneeDetails || {}),
            ...(profileData.consigneeDetails || {})
          }
        };
        setCurrentUser(updated);
        localStorage.setItem('dawood_current_user', JSON.stringify(updated));
        return true;
      }
      return false;
    }
  };

  // Fetch Taxonomy (Manufacturers & Categories)
  const refreshTaxonomy = useCallback(async () => {
    try {
      const [resM, resC] = await Promise.all([
        fetch(`${API_URL}/taxonomy/manufacturers`),
        fetch(`${API_URL}/taxonomy/categories`)
      ]);
      if (resM.ok) {
        const jsonM = await resM.json();
        if (jsonM.data && Array.isArray(jsonM.data) && jsonM.data.length > 0) {
          setManufacturers(jsonM.data);
        }
      }
      if (resC.ok) {
        const jsonC = await resC.json();
        if (jsonC.data && Array.isArray(jsonC.data) && jsonC.data.length > 0) {
          setCategories(jsonC.data);
        }
      }
    } catch (err) {
      console.warn('Could not fetch taxonomy from backend', err);
    }
  }, []);

  const addManufacturer = async (data: { name: string; slug?: string; country?: string; description?: string }): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/taxonomy/manufacturers`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await refreshTaxonomy();
        return { success: true, message: json.message };
      }
      return { success: false, message: json.message || 'Failed to add manufacturer' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateManufacturer = async (id: string, data: Partial<Manufacturer>): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/taxonomy/manufacturers/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await refreshTaxonomy();
        return { success: true, message: json.message };
      }
      return { success: false, message: json.message || 'Failed to update manufacturer' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const deleteManufacturer = async (id: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/taxonomy/manufacturers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await refreshTaxonomy();
        return { success: true, message: json.message };
      }
      return { success: false, message: json.message || 'Failed to delete manufacturer' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const addCategory = async (data: { name: string; slug?: string; description?: string; icon?: string }): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/taxonomy/categories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await refreshTaxonomy();
        return { success: true, message: json.message };
      }
      return { success: false, message: json.message || 'Failed to add category' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateCategory = async (id: string, data: Partial<CategoryItem>): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/taxonomy/categories/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await refreshTaxonomy();
        return { success: true, message: json.message };
      }
      return { success: false, message: json.message || 'Failed to update category' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const deleteCategory = async (id: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch(`${API_URL}/taxonomy/categories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await refreshTaxonomy();
        return { success: true, message: json.message };
      }
      return { success: false, message: json.message || 'Failed to delete category' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  // Bookmarking
  const toggleSaveMachine = (id: string) => {
    setSavedMachineIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const isMachineSaved = (id: string) => savedMachineIds.includes(id);

  return (
    <AuthContext.Provider value={{
      currentUser,
      token,
      serverStatus,
      isLoadingAuth,
      login,
      register,
      logout,
      fleet,
      refreshFleet,
      updateMachine,
      addMachine,
      deleteMachine,
      toggleSoldStatus,
      inquiries,
      refreshInquiries,
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,
      shipments,
      refreshShipments,
      updateShipmentStatus,
      addShipment,
      deleteShipment,
      sellOffers,
      refreshSellOffers,
      addSellOffer,
      updateSellOfferStatus,
      deleteSellOffer,
      users,
      fetchUsers,
      createUser,
      updateUserRole,
      updateUserStatus,
      updateUserProfile,
      manufacturers,
      categories,
      refreshTaxonomy,
      addManufacturer,
      updateManufacturer,
      deleteManufacturer,
      addCategory,
      updateCategory,
      deleteCategory,
      reseedDatabase,
      savedMachineIds,
      toggleSaveMachine,
      isMachineSaved
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
