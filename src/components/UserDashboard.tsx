import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Truck, 
  Anchor, 
  Box, 
  Bookmark, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  Download, 
  ShieldCheck, 
  Search,
  ArrowRight,
  LogOut,
  User,
  Plus,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BuyerInquiry, ShipmentTrackingRecord } from '../types/auth';
import { Equipment } from '../types/equipment';

interface UserDashboardProps {
  onNavigateHome: () => void;
  onNavigateAllMachinery: () => void;
  onInspectMachine: (machine: Equipment) => void;
  onOpenEstimator: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onNavigateHome,
  onNavigateAllMachinery,
  onInspectMachine,
  onOpenEstimator
}) => {
  const { 
    currentUser, 
    logout, 
    inquiries, 
    shipments, 
    fleet, 
    savedMachineIds, 
    toggleSaveMachine,
    updateUserProfile
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'shipments' | 'saved' | 'profile'>('inquiries');
  const [selectedInquiryForInvoice, setSelectedInquiryForInvoice] = useState<BuyerInquiry | null>(null);

  // Consignee & Customs profile form state (completely dynamic, no static dummy values)
  const [companyName, setCompanyName] = useState(currentUser?.consigneeDetails?.companyName || currentUser?.company || '');
  const [taxId, setTaxId] = useState(currentUser?.consigneeDetails?.taxId || '');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.consigneeDetails?.deliveryAddress || '');
  const [notifyParty, setNotifyParty] = useState(currentUser?.consigneeDetails?.notifyParty || '');
  const [destinationPort, setDestinationPort] = useState(currentUser?.consigneeDetails?.destinationPort || currentUser?.destinationPort || '');
  const [isSavingConsignee, setIsSavingConsignee] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

  // Keep form in sync when currentUser updates
  useEffect(() => {
    if (currentUser) {
      setCompanyName(currentUser.consigneeDetails?.companyName || currentUser.company || '');
      setTaxId(currentUser.consigneeDetails?.taxId || '');
      setDeliveryAddress(currentUser.consigneeDetails?.deliveryAddress || '');
      setNotifyParty(currentUser.consigneeDetails?.notifyParty || '');
      setDestinationPort(currentUser.consigneeDetails?.destinationPort || currentUser.destinationPort || '');
    }
  }, [currentUser]);

  // Dynamic check for customs profile status
  const hasConsigneeProfile = Boolean(taxId.trim() || deliveryAddress.trim());

  // Filter inquiries for this user
  const userInquiries = currentUser 
    ? inquiries.filter(inq => 
        inq.customerEmail.toLowerCase() === currentUser.email.toLowerCase() || 
        (inq.customerName && currentUser.name && inq.customerName.toLowerCase() === currentUser.name.toLowerCase())
      )
    : inquiries;

  // Filter shipments for this user
  const userShipments = currentUser
    ? shipments.filter(shp => 
        (shp.buyerName && currentUser.name && shp.buyerName.toLowerCase() === currentUser.name.toLowerCase()) ||
        (shp.buyerCompany && currentUser.company && shp.buyerCompany.toLowerCase() === currentUser.company.toLowerCase())
      )
    : shipments;

  // Saved machines
  const savedFleet = fleet.filter(m => savedMachineIds.includes(m.id));

  // Handle Save Consignee Profile
  const handleSaveConsignee = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConsignee(true);
    const success = await updateUserProfile({
      company: companyName,
      destinationPort: destinationPort,
      consigneeDetails: {
        companyName,
        taxId,
        deliveryAddress,
        notifyParty,
        destinationPort
      }
    });
    setIsSavingConsignee(false);
    if (success) {
      setSaveSuccessMessage(true);
      setTimeout(() => setSaveSuccessMessage(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      
      {/* Top Navigation Sub-Bar */}
      <div className="bg-[#0F172A] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-xs font-mono font-bold text-slate-400 hover:text-[#FFB800] transition-colors cursor-pointer flex items-center gap-1"
            >
              ← Dawood Equipment Catalog
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-mono font-bold text-[#FFB800] uppercase tracking-wider">
              Buyer Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-300 font-mono hidden sm:inline">
              Logged in as <strong className="text-white">{currentUser?.name || 'Verified Buyer'}</strong>
            </span>
            <button
              type="button"
              onClick={logout}
              className="px-3 py-1 text-xs font-mono font-bold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Profile Welcome Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 text-[#FFB800] flex items-center justify-center font-black text-2xl border-2 border-amber-400 shrink-0">
                {(currentUser?.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-black font-heading tracking-tight text-slate-900">
                    {currentUser?.name || 'Authorized Buyer'}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Equipment Buyer
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 font-medium">
                  {currentUser?.company ? (
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {currentUser.company}
                    </span>
                  ) : null}
                  {currentUser?.email ? (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {currentUser.email}
                    </span>
                  ) : null}
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    Port: {currentUser?.destinationPort || 'Not specified'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onNavigateAllMachinery}
                className="clip-chamfer px-5 py-2.5 bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 font-heading font-black text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Browse All Equipments</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-[11px] font-mono uppercase text-slate-500 font-bold">Purchase Inquiries</div>
              <div className="text-2xl font-black text-slate-900 font-heading mt-1">{userInquiries.length} Units</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                {userInquiries.length > 0 ? 'Active dealer quotes' : 'No active inquiries'}
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-[11px] font-mono uppercase text-slate-500 font-bold">Active Shipments</div>
              <div className="text-2xl font-black text-slate-900 font-heading mt-1">{userShipments.length} Active</div>
              <div className="text-[11px] text-blue-600 font-semibold mt-0.5">
                {userShipments.length > 0 ? `${userShipments.length} in transit` : 'No shipments in transit'}
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-[11px] font-mono uppercase text-slate-500 font-bold">Saved Machinery</div>
              <div className="text-2xl font-black text-slate-900 font-heading mt-1">{savedFleet.length} Units</div>
              <div className="text-[11px] text-amber-600 font-semibold mt-0.5">
                {savedFleet.length > 0 ? 'Quick watchlist' : 'No saved machinery'}
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-[11px] font-mono uppercase text-slate-500 font-bold">Consignee Profile</div>
              <div className="text-2xl font-black text-slate-900 font-heading mt-1">
                {hasConsigneeProfile ? 'Ready' : 'Not Set'}
              </div>
              <div className={`text-[11px] font-semibold mt-0.5 ${hasConsigneeProfile ? 'text-emerald-600' : 'text-slate-500'}`}>
                {hasConsigneeProfile ? 'Customs docs complete' : 'Setup customs profile'}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-lg px-4 pt-2 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-5 text-xs font-heading font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-[#FFB800] text-slate-950 bg-amber-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>My Inquiries & Pro-Formas ({userInquiries.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shipments')}
            className={`py-3 px-5 text-xs font-heading font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'shipments'
                ? 'border-[#FFB800] text-slate-950 bg-amber-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Anchor className="w-4 h-4 text-blue-600" />
            <span>Freight & Ocean Tracking ({userShipments.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-5 text-xs font-heading font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'border-[#FFB800] text-slate-950 bg-amber-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span>Saved Machinery ({savedFleet.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-5 text-xs font-heading font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#FFB800] text-slate-950 bg-amber-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4 text-slate-600" />
            <span>Consignee & Customs Data</span>
          </button>
        </div>

        {/* Tab 1: Inquiries & Pro-Formas */}
        {activeTab === 'inquiries' && (
          <div>
            {userInquiries.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black font-heading text-slate-900 uppercase">No Purchase Inquiries Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 mb-6 leading-relaxed">
                  You haven't requested any pro-forma invoices or machinery pricing quotes yet. Browse our inventory of excavators, wheel loaders, and dozers to request an export pro-forma.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onNavigateAllMachinery}
                    className="px-5 py-2.5 bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded shadow cursor-pointer transition-all flex items-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Browse Machinery Inventory</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenEstimator}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading font-bold text-xs uppercase tracking-wider rounded border border-slate-300 cursor-pointer transition-all"
                  >
                    Calculate Export Freight
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {userInquiries.map((inq) => {
                  const machine = fleet.find(m => m.id === inq.machineId);
                  return (
                    <div key={inq.id} className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 hover:border-slate-300 transition-colors">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        
                        {/* Machine info & thumbnail */}
                        <div className="flex items-start gap-4">
                          <img
                            src={inq.machineImage}
                            alt={inq.machineTitle}
                            className="w-24 h-20 object-cover rounded bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                                Stock #{inq.machineStock}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="text-[11px] font-mono text-slate-500">
                                Ref: {inq.proFormaNumber || 'DEQ-PI-PENDING'}
                              </span>
                            </div>
                            <h3 className="text-lg font-black font-heading text-slate-900 leading-snug">
                              {inq.machineTitle}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-1">
                              <span>Port: <strong>{inq.destinationPort}</strong></span>
                              <span>•</span>
                              <span>Inquiry Date: {inq.inquiryDate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Pricing */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:text-right">
                          <div>
                            <div className="text-[11px] font-mono uppercase text-slate-500 font-bold">Estimated Total (CIF / FOB)</div>
                            <div className="text-xl font-black font-mono text-slate-900">
                              {inq.totalEstimatedAmount ? `$${inq.totalEstimatedAmount.toLocaleString()}` : 'Call for Price'}
                            </div>
                            {inq.priceQuoted && (
                              <div className="text-[11px] text-slate-500 font-mono">
                                Machine base: ${inq.priceQuoted.toLocaleString()}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-start sm:items-end gap-2">
                            {inq.status === 'deposit_paid' && (
                              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Deposit Received / In Prep
                              </span>
                            )}
                            {inq.status === 'quoted' && (
                              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                Pro-Forma Issued
                              </span>
                            )}
                            {inq.status === 'pending' && (
                              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                Broker Review Pending
                              </span>
                            )}

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedInquiryForInvoice(inq)}
                                className="px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#FFB800]" />
                                <span>View Pro-Forma</span>
                              </button>
                              {machine && (
                                <button
                                  type="button"
                                  onClick={() => onInspectMachine(machine)}
                                  className="px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded transition-colors cursor-pointer"
                                >
                                  Inspect Specs
                                </button>
                              )}
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* Broker Notes Banner */}
                      {inq.brokerNotes && (
                        <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-lg text-xs text-slate-700 flex items-start gap-2">
                          <span className="font-bold text-slate-900 font-mono shrink-0">Dawood Broker Note:</span>
                          <span>{inq.brokerNotes}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Live Freight Tracking */}
        {activeTab === 'shipments' && (
          <div>
            {userShipments.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Anchor className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black font-heading text-slate-900 uppercase">No Active Shipments in Transit</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 mb-6 leading-relaxed">
                  Once you purchase machinery and containerizing, inland trucking, or ocean freight booking is scheduled, your live Bill of Lading (B/L) tracking, container status, and vessel milestones will appear here.
                </p>
                <button
                  type="button"
                  onClick={onNavigateAllMachinery}
                  className="px-5 py-2.5 bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded shadow cursor-pointer transition-all inline-flex items-center gap-2"
                >
                  <span>Explore Available Equipment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {userShipments.map((shp) => (
                  <div key={shp.id} className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                    
                    {/* Shipment Header */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            {shp.mode}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-500">
                            BOL / Booking: {shp.trackingNumber}
                          </span>
                        </div>
                        <h2 className="text-xl font-black font-heading text-slate-900">
                          {shp.machineTitle} (Stock #{shp.stockNumber})
                        </h2>
                        <p className="text-xs text-slate-600 mt-1">
                          Origin: <strong>{shp.originHub}</strong> → Destination: <strong>{shp.destinationPort}</strong>
                        </p>
                      </div>

                      <div className="text-left lg:text-right">
                        <div className="text-[11px] font-mono uppercase text-slate-500 font-bold">Estimated Port Arrival</div>
                        <div className="text-lg font-black font-heading text-slate-900 text-emerald-600">
                          {shp.estimatedArrivalDate}
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                          Carrier: {shp.carrierName}
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="my-6">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                        <span className="flex items-center gap-1.5 text-amber-800">
                          <Box className="w-4 h-4 text-amber-600" />
                          Current Stage: {shp.currentMilestone}
                        </span>
                        <span className="font-mono text-slate-900">{shp.progressPercent}% Transit Completed</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                        <div 
                          className="bg-[#FFB800] h-full transition-all duration-500 rounded-full"
                          style={{ width: `${shp.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Timeline Stepper */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider">
                        Logistics & Milestone History
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {shp.timeline.map((step, idx) => (
                          <div 
                            key={idx}
                            className={`p-3.5 rounded border text-xs ${
                              step.completed 
                                ? 'bg-emerald-50/60 border-emerald-200 text-slate-800' 
                                : 'bg-slate-50 border-slate-200 text-slate-400 opacity-80'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-mono text-[10px] font-bold text-slate-500">{step.date}</span>
                              {step.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Clock className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <div className={`font-bold ${step.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                              {step.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{step.location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Container & Vessel Info Box */}
                    <div className="mt-6 p-4 bg-slate-50 rounded border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">40ft High Cube Container No:</span>
                        <strong className="text-slate-900">{shp.containerNumber || 'MSKU-492019-8'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Assigned Ocean Vessel:</span>
                        <strong className="text-slate-900">{shp.vesselName || 'Maersk Mc-Kinney Moller'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Auxiliary Teardown Status:</span>
                        <strong className="text-emerald-700">Blade Removed & Sealed Inside</strong>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Machinery */}
        {activeTab === 'saved' && (
          <div>
            {savedFleet.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-black font-heading text-slate-800">No Saved Machinery Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                  Bookmark machines from the catalog to compare hours, specs, and quickly request export pro-forma quotes.
                </p>
                <button
                  type="button"
                  onClick={onNavigateAllMachinery}
                  className="px-4 py-2 bg-[#FFB800] text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded"
                >
                  Explore Equipments
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedFleet.map((machine) => (
                  <div key={machine.id} className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <img 
                        src={machine.image || machine.images?.[0]} 
                        alt={machine.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => toggleSaveMachine(machine.id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-amber-500 rounded-full shadow"
                        title="Remove bookmark"
                      >
                        <Bookmark className="w-4 h-4 fill-amber-500" />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-mono text-slate-500 uppercase font-bold mb-1">
                          {machine.vendor} • {machine.model || machine.name}
                        </div>
                        <h4 className="font-heading font-black text-base text-slate-900 leading-tight">
                          {machine.title}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs font-mono text-slate-600">
                          <div>Hours: <strong>{(machine.specs?.hours || machine.hours)?.toLocaleString() || 'N/A'}</strong></div>
                          <div>Status: <strong className={machine.isSold ? 'text-rose-700' : 'text-emerald-700'}>{machine.isSold ? '(SOLD)' : 'Available'}</strong></div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onInspectMachine(machine)}
                          className="flex-1 py-2 text-xs font-heading font-black uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white rounded text-center cursor-pointer"
                        >
                          View Details & Video
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Consignee & Customs Data */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 max-w-3xl">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-black font-heading text-slate-900">
                Consignee & Customs Shipping Information
              </h2>
              {hasConsigneeProfile && (
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Customs Profile Saved
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Enter your official company and customs clearing details. This information is used on the official Bill of Lading (B/L) and export customs documentation filed by Dawood Equipment Co.
            </p>

            {saveSuccessMessage && (
              <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center gap-2 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Consignee & Customs shipping profile successfully updated in MongoDB!</span>
              </div>
            )}

            <form onSubmit={handleSaveConsignee} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Consignee Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter registered company or consignee name"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tax / TRN / VAT ID
                  </label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="Enter Tax ID / VAT / TRN (e.g. TRN-10029381)"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Address (Final Destination / Yard)
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter final warehouse / yard address, city, country"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Notify Party (Freight Forwarder / Agent)
                  </label>
                  <input
                    type="text"
                    value={notifyParty}
                    onChange={(e) => setNotifyParty(e.target.value)}
                    placeholder="Enter freight forwarder or customs clearing agent name & phone"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Seaport / Discharge Terminal
                  </label>
                  <input
                    type="text"
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    placeholder="Enter preferred seaport or inland terminal (e.g. Jebel Ali, Houston, Karachi)"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingConsignee}
                  className="px-6 py-2.5 bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded shadow cursor-pointer transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSavingConsignee ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <span>Save Consignee Profile</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Pro-Forma Invoice Modal */}
      {selectedInquiryForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white max-w-2xl w-full rounded-lg shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Top Bar */}
            <div className="bg-[#0F172A] p-4 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#FFB800]">OFFICIAL PRO-FORMA INVOICE</span>
                <h3 className="text-lg font-black font-heading">{selectedInquiryForInvoice.proFormaNumber}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiryForInvoice(null)}
                className="text-slate-400 hover:text-white text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Printable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-800 font-sans">
              
              {/* Header with Dealer Info */}
              <div className="flex justify-between border-b border-slate-200 pb-4">
                <div>
                  <h4 className="text-base font-black font-heading text-slate-900">DAWOOD EQUIPMENT CO.</h4>
                  <p className="text-[11px] text-slate-500 font-mono">Heavy Equipment Sales & Worldwide Export</p>
                  <p className="text-[11px] text-slate-600 font-mono">Phone: (630) 379-9175 | Sales@dawoodequipment.com</p>
                  <p className="text-[11px] text-slate-600 font-mono">Chicago / Elmhurst Yard, Illinois, USA</p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[11px] text-slate-500">Date: {selectedInquiryForInvoice.inquiryDate}</div>
                  <div className="font-mono text-[11px] text-slate-500">Terms: Wire Transfer (CIF / FOB)</div>
                  <div className="font-mono text-[11px] font-bold text-emerald-700">Status: {selectedInquiryForInvoice.status.toUpperCase()}</div>
                </div>
              </div>

              {/* Bill To */}
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1">BILL TO / CONSIGNEE:</span>
                <strong className="text-slate-900 text-sm block">{selectedInquiryForInvoice.customerName}</strong>
                <div>{selectedInquiryForInvoice.company}</div>
                <div>Destination: {selectedInquiryForInvoice.destinationPort}</div>
                <div>Contact: {selectedInquiryForInvoice.customerPhone} | {selectedInquiryForInvoice.customerEmail}</div>
              </div>

              {/* Items Breakdown Table */}
              <div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300 font-mono text-[10px] uppercase text-slate-500">
                      <th className="py-2">Description</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Amount (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    <tr>
                      <td className="py-2.5">
                        <strong className="text-slate-900 block font-sans">{selectedInquiryForInvoice.machineTitle}</strong>
                        <span className="text-[11px] text-slate-500">Stock #{selectedInquiryForInvoice.machineStock} • Clean Title</span>
                      </td>
                      <td className="py-2.5 text-center">1</td>
                      <td className="py-2.5 text-right font-bold">${selectedInquiryForInvoice.priceQuoted?.toLocaleString() || '58,500'}</td>
                    </tr>
                    {selectedInquiryForInvoice.shippingServices.inlandTrucking && (
                      <tr>
                        <td className="py-2 text-slate-600">Domestic Lowboy Inland Haul (Yard to Sea Port)</td>
                        <td className="py-2 text-center">1</td>
                        <td className="py-2 text-right">$5,400</td>
                      </tr>
                    )}
                    {selectedInquiryForInvoice.shippingServices.containerizing && (
                      <tr>
                        <td className="py-2 text-slate-600">Auxiliary Teardown, Lashing & 40ft HC Containerizing</td>
                        <td className="py-2 text-center">1</td>
                        <td className="py-2 text-right">$4,800</td>
                      </tr>
                    )}
                    {selectedInquiryForInvoice.shippingServices.oceanFreight && (
                      <tr>
                        <td className="py-2 text-slate-600">Ocean Freight to {selectedInquiryForInvoice.destinationPort}</td>
                        <td className="py-2 text-center">1</td>
                        <td className="py-2 text-right">$5,500</td>
                      </tr>
                    )}
                    {selectedInquiryForInvoice.shippingServices.insurance && (
                      <tr>
                        <td className="py-2 text-slate-600">Export Documentation, SED & Marine Cargo Insurance</td>
                        <td className="py-2 text-center">1</td>
                        <td className="py-2 text-right">$2,750</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-900 font-bold">
                      <td colSpan={2} className="py-3 text-sm font-heading uppercase">Total Pro-Forma Invoice:</td>
                      <td className="py-3 text-right text-base font-mono text-slate-900">
                        ${selectedInquiryForInvoice.totalEstimatedAmount?.toLocaleString() || '76,950'}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Wire Transfer Details */}
              <div className="bg-amber-50 p-4 rounded border border-amber-200 text-xs text-amber-900 space-y-1 font-mono">
                <div className="font-bold uppercase text-[11px] text-amber-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Bank Wire Instructions (Dawood Equipment Co):
                </div>
                <div>Bank: JPMorgan Chase Bank, N.A. (Chicago Commercial Center)</div>
                <div>Account Name: DAWOOD EQUIPMENT CO.</div>
                <div>SWIFT / BIC: CHASUS33XXX</div>
                <div>Wire Reference: {selectedInquiryForInvoice.proFormaNumber}</div>
              </div>

            </div>

            {/* Modal Bottom Bar */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Official Dawood Equipment Co document</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert('Printing Pro-Forma invoice...')}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Downloading official PDF pro-forma invoice...')}
                  className="px-4 py-1.5 bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
