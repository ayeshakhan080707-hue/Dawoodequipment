import React, { useState, useMemo } from 'react';
import { 
  Truck, 
  Package, 
  Ship, 
  Anchor, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Globe, 
  Compass, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Equipment } from '../types/equipment';
import { FLEET_INVENTORY, WORLDWIDE_EXPORT_PORTS, COMPANY_INFO } from '../data/fleetData';

interface ShippingCostEstimatorProps {
  selectedEquipmentId?: string;
  onProceedBooking: (config: any, breakdown: any, equipment: Equipment) => void;
}

export const RentalCostEstimator: React.FC<ShippingCostEstimatorProps> = ({
  selectedEquipmentId = FLEET_INVENTORY[1].id,
  onProceedBooking,
}) => {
  const [machineId, setMachineId] = useState<string>(selectedEquipmentId);
  const [shippingDestinationType, setShippingDestinationType] = useState<'ocean_export' | 'domestic_trucking'>('ocean_export');
  
  // Ocean Freight Port selection
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const [selectedPortName, setSelectedPortName] = useState<string>(WORLDWIDE_EXPORT_PORTS[0].ports[0].name);
  
  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'containerized' | 'roro'>('containerized');
  
  // Domestic destination
  const [domesticZone, setDomesticZone] = useState<'midwest' | 'gulf' | 'east' | 'west'>('gulf');

  // Auxiliary Services toggles
  const [includeInlandTrucking, setIncludeInlandTrucking] = useState(true);
  const [includeContainerizing, setIncludeContainerizing] = useState(true);
  const [includeOceanFreight, setIncludeOceanFreight] = useState(true);
  const [includeExportDocumentation, setIncludeExportDocumentation] = useState(true);
  const [includeMarineInsurance, setIncludeMarineInsurance] = useState(true);

  React.useEffect(() => {
    if (selectedEquipmentId) {
      setMachineId(selectedEquipmentId);
    }
  }, [selectedEquipmentId]);

  const selectedMachine = useMemo(() => {
    return FLEET_INVENTORY.find(m => m.id === machineId) || FLEET_INVENTORY[1];
  }, [machineId]);

  const currentRegion = WORLDWIDE_EXPORT_PORTS[selectedRegionIndex];
  const currentPort = useMemo(() => {
    return currentRegion.ports.find(p => p.name === selectedPortName) || currentRegion.ports[0];
  }, [currentRegion, selectedPortName]);

  // Compute realistic shipping breakdown
  const logisticsBreakdown = useMemo(() => {
    const weightTons = selectedMachine.specs.operatingWeightTons;
    const estValue = selectedMachine.numericPrice || 250000;

    let inlandTruckingFee = 0;
    let containerizingFee = 0;
    let oceanFreightFee = 0;
    let documentationFee = includeExportDocumentation ? 550 : 0;
    let insuranceFee = includeMarineInsurance ? Math.round(estValue * 0.012) : 0;

    if (shippingDestinationType === 'ocean_export') {
      // Inland trucking from Illinois staging yard to departure seaport (Baltimore, Houston, or Newark)
      if (includeInlandTrucking) {
        if (weightTons < 20) inlandTruckingFee = 2400;
        else if (weightTons < 35) inlandTruckingFee = 3800;
        else inlandTruckingFee = 5400; // heavy oversize haul
      }

      // Containerizing / Dismantling
      if (shippingMethod === 'containerized' && includeContainerizing) {
        if (selectedMachine.dismantleComplexity === 'Standard') containerizingFee = 2200;
        else if (selectedMachine.dismantleComplexity === 'Moderate') containerizingFee = 3400;
        else containerizingFee = 4800; // heavy excavator / boom disassembly
      }

      // Ocean Freight
      if (includeOceanFreight) {
        if (shippingMethod === 'containerized') {
          oceanFreightFee = currentPort.baseContainerRate;
          if (weightTons > 30) oceanFreightFee += 900; // heavy lift surcharge
        } else {
          // Ro-Ro based on tonnage
          oceanFreightFee = Math.round(weightTons * currentPort.roroRateTon * 1.8);
        }
      }
    } else {
      // Domestic US Trucking only
      containerizingFee = 0;
      oceanFreightFee = 0;
      documentationFee = 250; // Bill of Lading & oversized permits
      insuranceFee = Math.round(estValue * 0.006); // Domestic transit insurance

      if (domesticZone === 'midwest') inlandTruckingFee = weightTons > 30 ? 2800 : 1800;
      if (domesticZone === 'gulf') inlandTruckingFee = weightTons > 30 ? 4600 : 3200;
      if (domesticZone === 'east') inlandTruckingFee = weightTons > 30 ? 4200 : 2900;
      if (domesticZone === 'west') inlandTruckingFee = weightTons > 30 ? 6800 : 4800;
    }

    const totalEstimatedLogistics = 
      inlandTruckingFee + 
      containerizingFee + 
      oceanFreightFee + 
      documentationFee + 
      insuranceFee;

    const transitTime = shippingDestinationType === 'ocean_export' 
      ? currentPort.transitDays 
      : '3 to 5 Business Days';

    return {
      inlandTruckingFee,
      containerizingFee,
      oceanFreightFee,
      documentationFee,
      insuranceFee,
      totalEstimatedLogistics,
      estimatedTransitWeeks: transitTime,
      recommendedPort: currentPort.name,
    };
  }, [
    selectedMachine, 
    shippingDestinationType, 
    shippingMethod, 
    currentPort, 
    domesticZone,
    includeInlandTrucking,
    includeContainerizing,
    includeOceanFreight,
    includeExportDocumentation,
    includeMarineInsurance
  ]);

  const handleProceed = () => {
    onProceedBooking(
      {
        equipmentId: selectedMachine.id,
        destinationType: shippingDestinationType,
        destinationPort: currentPort.name,
        shippingMode: shippingMethod,
        includeInlandTrucking,
        includeContainerizingTeardown: includeContainerizing,
        includeOceanFreight,
        includeExportDocumentation,
        includeMarineInsurance,
      },
      logisticsBreakdown,
      selectedMachine
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Intro Box */}
      <div className="mb-8 p-5 rounded-lg bg-amber-50 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-[#D97706] shrink-0" />
          <div>
            <div className="font-heading font-black text-slate-900 uppercase text-base">
              Worldwide Shipping & Domestic Trucking Estimator
            </div>
            <div className="text-xs text-slate-600">
              Calculate inland transport, containerizing teardown, and ocean freight to any destination port worldwide.
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded border border-amber-200 shrink-0">
          Sales & Export Model · <span className="font-bold text-slate-900">Outright Purchases Only</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT CONFIGURATION PANEL (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: Select Target Machine */}
          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                1. SELECT MACHINERY FOR SALE
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                Stock #{selectedMachine.stockNumber || 'N/A'}
              </span>
            </div>

            <select
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-[#FFB800]"
            >
              {FLEET_INVENTORY.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} — ({m.specs.operatingWeightTons} Tons, {m.hours != null ? `${m.hours} hrs` : 'Inspected'})
                </option>
              ))}
            </select>

            <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-2 border-t border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px]">WEIGHT</span>
                <span className="font-bold text-slate-900">{selectedMachine.specs.operatingWeightTons} Metric Tons</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">TEARDOWN COMPLEXITY</span>
                <span className="font-bold text-amber-700">{selectedMachine.dismantleComplexity || 'Moderate'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">STATUS</span>
                <span className={`font-bold ${selectedMachine.isSold ? 'text-red-600' : 'text-emerald-700'}`}>
                  {selectedMachine.priceDisplay}
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2: Destination Type */}
          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
            <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block">
              2. DESTINATION LOGISTICS ROUTE
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShippingDestinationType('ocean_export')}
                className={`p-3.5 rounded text-left border transition-all cursor-pointer ${
                  shippingDestinationType === 'ocean_export'
                    ? 'bg-white border-[#FFB800] ring-2 ring-[#FFB800]/20 shadow-sm'
                    : 'bg-white/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Ship className="w-4 h-4 text-[#D97706]" />
                  <span className="font-heading font-black text-sm uppercase text-slate-900">
                    Worldwide Ocean Export
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 leading-snug">
                  Maritime shipment to Middle East, Africa, LatAm, Europe, Asia.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setShippingDestinationType('domestic_trucking')}
                className={`p-3.5 rounded text-left border transition-all cursor-pointer ${
                  shippingDestinationType === 'domestic_trucking'
                    ? 'bg-white border-[#FFB800] ring-2 ring-[#FFB800]/20 shadow-sm'
                    : 'bg-white/60 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="w-4 h-4 text-[#D97706]" />
                  <span className="font-heading font-black text-sm uppercase text-slate-900">
                    USA Domestic Trucking
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 leading-snug">
                  Lowboy heavy-haul delivery across continental US jobsites.
                </div>
              </button>
            </div>

            {/* Destination Specific Options */}
            {shippingDestinationType === 'ocean_export' ? (
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">DESTINATION REGION</label>
                    <select
                      value={selectedRegionIndex}
                      onChange={(e) => {
                        const idx = Number(e.target.value);
                        setSelectedRegionIndex(idx);
                        setSelectedPortName(WORLDWIDE_EXPORT_PORTS[idx].ports[0].name);
                      }}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#FFB800]"
                    >
                      {WORLDWIDE_EXPORT_PORTS.map((r, idx) => (
                        <option key={r.region} value={idx}>{r.region}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">SEAPORT GATEWAY</label>
                    <select
                      value={selectedPortName}
                      onChange={(e) => setSelectedPortName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#FFB800]"
                    >
                      {currentRegion.ports.map((p) => (
                        <option key={p.name} value={p.name}>{p.name} ({p.transitDays})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Ocean Shipping Mode */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">EXPORT SHIPPING MODE</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setShippingMethod('containerized')}
                      className={`p-2.5 rounded text-xs font-mono border text-left cursor-pointer ${
                        shippingMethod === 'containerized'
                          ? 'bg-amber-50 border-[#D97706] font-bold text-slate-900'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>40ft High Cube Containerized</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                        Dismantled & secured (Highest cost-efficiency)
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingMethod('roro')}
                      className={`p-2.5 rounded text-xs font-mono border text-left cursor-pointer ${
                        shippingMethod === 'roro'
                          ? 'bg-amber-50 border-[#D97706] font-bold text-slate-900'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Ship className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Ro-Ro (Roll-on / Roll-off)</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                        Shipped fully assembled on specialized vessel
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <label className="block text-[11px] font-mono text-slate-600">DOMESTIC US DESTINATION REGION</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'midwest', label: 'Midwest Corridor', sub: '~300-600 miles' },
                    { id: 'gulf', label: 'Gulf Coast / TX', sub: '~800-1100 miles' },
                    { id: 'east', label: 'East Coast Ports', sub: '~700-900 miles' },
                    { id: 'west', label: 'Mountain / West', sub: '~1200-1900 miles' },
                  ].map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setDomesticZone(z.id as any)}
                      className={`p-2.5 rounded text-xs font-mono text-center border cursor-pointer ${
                        domesticZone === z.id
                          ? 'bg-amber-50 border-[#D97706] font-bold text-slate-900'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>{z.label}</div>
                      <div className="text-[10px] text-slate-500">{z.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* STEP 3: Auxiliary Services Toggles (The Real Services!) */}
          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block">
              3. SELECT REQUIRED AUXILIARY SERVICES
            </label>

            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded bg-white border border-slate-200 hover:border-slate-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeInlandTrucking}
                    onChange={(e) => setIncludeInlandTrucking(e.target.checked)}
                    className="w-4 h-4 text-[#D97706] rounded focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block font-mono">
                      Inland Heavy-Haul Trucking
                    </span>
                    <span className="text-[11px] text-slate-500">
                      RGN lowboy transport from Illinois yard to departure port or site
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-900">
                  ${logisticsBreakdown.inlandTruckingFee.toLocaleString()}
                </span>
              </label>

              {shippingDestinationType === 'ocean_export' && shippingMethod === 'containerized' && (
                <label className="flex items-center justify-between p-3 rounded bg-white border border-slate-200 hover:border-slate-300 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeContainerizing}
                      onChange={(e) => setIncludeContainerizing(e.target.checked)}
                      className="w-4 h-4 text-[#D97706] rounded focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block font-mono">
                        Containerizing (Teardown & Steel Strapping)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Disassembly of booms/cabs, blocking & packing into 40ft High Cube
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    ${logisticsBreakdown.containerizingFee.toLocaleString()}
                  </span>
                </label>
              )}

              {shippingDestinationType === 'ocean_export' && (
                <label className="flex items-center justify-between p-3 rounded bg-white border border-slate-200 hover:border-slate-300 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeOceanFreight}
                      onChange={(e) => setIncludeOceanFreight(e.target.checked)}
                      className="w-4 h-4 text-[#D97706] rounded focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block font-mono">
                        Ocean Freight Maritime Booking
                      </span>
                      <span className="text-[11px] text-slate-500">
                        FCL container vessel or Ro-Ro carrier transit to {currentPort.name}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    ${logisticsBreakdown.oceanFreightFee.toLocaleString()}
                  </span>
                </label>
              )}

              <label className="flex items-center justify-between p-3 rounded bg-white border border-slate-200 hover:border-slate-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeExportDocumentation}
                    onChange={(e) => setIncludeExportDocumentation(e.target.checked)}
                    className="w-4 h-4 text-[#D97706] rounded focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block font-mono">
                      Export Documentation & AES Customs Filing
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Title validation, Bill of Lading (B/L), and Chamber Certificate of Origin
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-900">
                  ${logisticsBreakdown.documentationFee.toLocaleString()}
                </span>
              </label>

              <label className="flex items-center justify-between p-3 rounded bg-white border border-slate-200 hover:border-slate-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeMarineInsurance}
                    onChange={(e) => setIncludeMarineInsurance(e.target.checked)}
                    className="w-4 h-4 text-[#D97706] rounded focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block font-mono">
                      All-Risk Marine Cargo & Transit Insurance
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Comprehensive coverage against maritime peril, salvage, and handling
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-900">
                  ${logisticsBreakdown.insuranceFee.toLocaleString()}
                </span>
              </label>
            </div>
          </div>

        </div>

        {/* RIGHT BREAKDOWN SUMMARY (5 COLS) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-xl border border-slate-300 bg-white p-6 shadow-xl space-y-6">
            
            <div>
              <span className="text-xs font-mono text-[#D97706] font-bold uppercase tracking-wider block">
                FREIGHT & EXPORT ESTIMATE
              </span>
              <h4 className="font-heading text-2xl font-black uppercase text-slate-900 mt-1">
                Logistics Summary
              </h4>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Target: {selectedMachine.title} (Stock #{selectedMachine.stockNumber || 'DW-UNIT'})
              </p>
            </div>

            {/* Destination Snapshot */}
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Departure:</span>
                <span className="font-bold text-slate-900">Illinois Logistics Yard / Port</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-900 truncate max-w-[210px] text-right">
                  {shippingDestinationType === 'ocean_export' ? currentPort.name : `USA ${domesticZone.toUpperCase()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Est. Transit Time:</span>
                <span className="font-bold text-emerald-700">{logisticsBreakdown.estimatedTransitWeeks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Shipping Mode:</span>
                <span className="font-bold text-slate-900 uppercase">
                  {shippingDestinationType === 'ocean_export' ? shippingMethod : 'Lowboy Heavy-Haul'}
                </span>
              </div>
            </div>

            {/* Price Line Items */}
            <div className="space-y-2.5 text-xs font-mono border-t border-slate-200 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Inland Lowboy Trucking:</span>
                <span className="font-bold text-slate-900">${logisticsBreakdown.inlandTruckingFee.toLocaleString()}</span>
              </div>

              {shippingDestinationType === 'ocean_export' && shippingMethod === 'containerized' && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Containerizing & Teardown:</span>
                  <span className="font-bold text-slate-900">${logisticsBreakdown.containerizingFee.toLocaleString()}</span>
                </div>
              )}

              {shippingDestinationType === 'ocean_export' && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Ocean Freight Vessel:</span>
                  <span className="font-bold text-slate-900">${logisticsBreakdown.oceanFreightFee.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-slate-600">Export Customs & AES Filing:</span>
                <span className="font-bold text-slate-900">${logisticsBreakdown.documentationFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Marine / Cargo Insurance:</span>
                <span className="font-bold text-slate-900">${logisticsBreakdown.insuranceFee.toLocaleString()}</span>
              </div>
            </div>

            {/* Total Estimated Logistics */}
            <div className="pt-4 border-t-2 border-slate-900 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase block font-semibold">
                  ESTIMATED LOGISTICS TOTAL
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Machine price is separate (Call for Price)
                </span>
              </div>
              <div className="font-heading text-3xl font-black text-slate-900">
                ${logisticsBreakdown.totalEstimatedLogistics.toLocaleString()}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleProceed}
                className="clip-chamfer w-full py-3.5 px-4 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-md text-center flex items-center justify-center gap-2"
              >
                <span>Request Official Pro-Forma Invoice</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-mono text-xs font-bold rounded border border-slate-300 transition-colors text-center"
              >
                <span>Direct Freight Desk: (630) 379-9175</span>
              </a>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Guaranteed Departure Documentation</span>
              </div>
              <p>
                All exported machines are accompanied by certified clean US Title, validated Bill of Lading, and photographic container stuffing reports.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
