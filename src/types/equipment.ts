export type EquipmentCategory = 
  | 'all'
  | 'Dozer'
  | 'Excavators'
  | 'Wheel Loader'
  | 'Backhoes'
  | 'Roller'
  | 'Forklift'
  | 'Asphalt Paver'
  | 'excavators'
  | 'cranes'
  | 'haulers'
  | 'loaders'
  | 'telehandlers';

export type MachineryVendor = string;

export interface Manufacturer {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  country?: string;
  description?: string;
}

export interface CategoryItem {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface OperationalSpecs {
  engineModel: string;
  flywheelPowerHP: number;
  operatingWeightTons: number;
  hours?: number;
  serialVin?: string;
  reachOrDigDepth?: string;
  bucketOrPayloadCapacity?: string;
  condition?: string;
  location?: string;
  reachOrLiftMeters?: number;
  hydraulicPressureBar?: number;
  fuelCapacityLiters?: number;
  emissionsTier?: string;
  groundPressurePsi?: number;
}

export interface InspectionDiagnostics {
  unitId: string;
  inspectionStatus: 'Certified' | 'Inspected' | 'Field Ready' | 'Export Ready';
  engineCompressionPsi: number;
  hydraulicHealthPercent: number;
  undercarriageRemainingPercent: number;
  fluidAnalysisStatus: 'Clean' | 'Pass ISO 4406' | 'Sample Tested';
  hubLocation: string;
  lastInspectionDate: string;
}

export interface LoadCapacityPoint {
  reachRadiusMeters?: number;
  radiusMeters?: number;
  maxLoadTons: number;
}

export interface Equipment {
  id: string;
  stockNumber?: string;
  title: string;
  name: string; // for backwards compatibility
  model?: string;
  vendor: string;
  manufacturer?: string; // alias for vendor
  productType: EquipmentCategory;
  category?: EquipmentCategory;
  categoryLabel: string;
  year?: number;
  hours?: number;
  isSold?: boolean;
  priceDisplay?: 'Call for Price' | '(SOLD)' | string;
  numericPrice?: number;
  dailyRate?: number; // legacy backwards compatibility
  weeklyRate?: number;
  monthlyRate?: number;
  availability?: string;
  isAvailableNow?: boolean;
  image: string;
  mainImage?: string;
  additionalImages?: string[];
  images?: string[];
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
  specs: OperationalSpecs;
  telematics?: any; // legacy backwards compatibility
  inspection?: InspectionDiagnostics;
  loadChart?: LoadCapacityPoint[];
  description?: string;
  tagline?: string;
  features: string[];
  certifications?: string[];
  // Official Auxiliary Services for Equipment Buyers:
  truckingAvailable?: boolean;
  containerizingReady?: boolean;
  oceanFreightEligible?: boolean;
  estimatedShippingWeightLbs?: number;
  dismantleComplexity?: 'Standard' | 'Moderate' | 'Heavy Teardown';
}

export interface MachineryInquiry {
  stockNumber: string;
  machineTitle: string;
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  destinationCountryOrZip: string;
  servicesNeeded: {
    trucking: boolean;
    containerizing: boolean;
    oceanFreight: boolean;
  };
  inquiryType: 'purchase' | 'export_quote' | 'trucking' | 'containerizing' | 'sell_to_us';
  message: string;
}

export interface ShippingQuoteConfig {
  equipmentId: string;
  destinationType: 'domestic_us' | 'international_export';
  destinationPort: string;
  usZipCode?: string;
  shippingMode: 'containerized_40hc' | 'roro' | 'flat_rack' | 'lowboy_trucking';
  includeInlandTrucking: boolean;
  includeContainerizingTeardown: boolean;
  includeOceanFreight: boolean;
  includeExportDocumentation: boolean;
  includeMarineInsurance: boolean;
}

export interface ShippingCostBreakdown {
  inlandTruckingFee: number;
  containerizingFee: number;
  oceanFreightFee: number;
  documentationFee: number;
  insuranceFee: number;
  totalEstimatedLogistics: number;
  estimatedTransitWeeks: string;
  recommendedPort: string;
}

export interface SellEquipmentSubmission {
  sellerName: string;
  companyName: string;
  phone: string;
  email: string;
  equipmentType: string;
  make: string;
  model: string;
  year: string;
  meterHours: string;
  equipmentLocation: string;
  askingPriceUsd: string;
  serialVin: string;
  conditionNotes: string;
}

// Deprecated aliases kept for any component compatibility
export type RentalQuoteConfig = ShippingQuoteConfig;
export type RentalCostBreakdown = ShippingCostBreakdown;
