export type UserRole = 'buyer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  role: UserRole;
  avatar?: string;
  destinationPort?: string;
  consigneeDetails?: {
    companyName?: string;
    taxId?: string;
    deliveryAddress?: string;
    notifyParty?: string;
    destinationPort?: string;
  };
}

export type InquiryStatus = 'pending' | 'quoted' | 'deposit_paid' | 'dispatched' | 'delivered';

export interface BuyerInquiry {
  id: string;
  machineId: string;
  machineTitle: string;
  machineStock: string;
  machineImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company: string;
  country: string;
  destinationPort: string;
  inquiryDate: string;
  status: InquiryStatus;
  priceQuoted?: number;
  shippingServices: {
    inlandTrucking: boolean;
    containerizing: boolean;
    oceanFreight: boolean;
    insurance: boolean;
  };
  totalEstimatedAmount?: number;
  brokerNotes?: string;
  proFormaNumber?: string;
}

export type ShipmentStatus = 
  | 'yard_prep' 
  | 'trucking_to_port' 
  | 'teardown_containerizing' 
  | 'vessel_transit' 
  | 'port_customs' 
  | 'delivered';

export interface ShipmentUpdate {
  date: string;
  title: string;
  location: string;
  completed: boolean;
}

export interface ShipmentTrackingRecord {
  id: string;
  inquiryId: string;
  machineTitle: string;
  stockNumber: string;
  machineImage: string;
  buyerName: string;
  buyerCompany: string;
  mode: 'Containerized (40ft High Cube)' | 'Roll-On / Roll-Off (Ro-Ro)' | 'Heavy Haul Flatbed Trucking';
  originHub: string;
  destinationPort: string;
  carrierName: string;
  trackingNumber: string;
  containerNumber?: string;
  vesselName?: string;
  status: ShipmentStatus;
  progressPercent: number;
  estimatedArrivalDate: string;
  currentMilestone: string;
  timeline: ShipmentUpdate[];
}

export interface SellOfferSubmission {
  id: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerCompany: string;
  equipmentMake: string;
  equipmentModel: string;
  year: number;
  hours: number;
  serialVin: string;
  location: string;
  askingPrice: number;
  conditionNotes: string;
  submittedDate: string;
  status: 'under_review' | 'offer_sent' | 'inspection_scheduled' | 'wire_paid' | 'declined';
  adminOfferPrice?: number;
}
