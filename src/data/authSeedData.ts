import { UserProfile, BuyerInquiry, ShipmentTrackingRecord, SellOfferSubmission } from '../types/auth';

export const DEMO_BUYER_USER: UserProfile = {
  id: 'usr-buyer-01',
  name: 'Alex Miller',
  email: 'alex.miller@apexconstruction.com',
  company: 'Apex Global Infrastructure Ltd',
  phone: '+1 (415) 890-4421',
  country: 'United Arab Emirates / USA',
  role: 'buyer',
  destinationPort: 'Jebel Ali / Dubai, UAE',
  consigneeDetails: {
    companyName: 'Apex Global Infrastructure Ltd - Middle East FZE',
    taxId: 'AE-TRN-9021948102',
    deliveryAddress: 'Plot 418, Industrial Free Zone Area 2, Jebel Ali, Dubai',
    notifyParty: 'Gulf Logistics International Forwarders LLC'
  }
};

export const DEMO_ADMIN_USER: UserProfile = {
  id: 'usr-admin-01',
  name: 'Tariq Dawood',
  email: 'operations@dawoodequipment.com',
  company: 'Dawood Equipment Co. (Corporate)',
  phone: '(630) 379-9175',
  country: 'United States',
  role: 'admin'
};

export const INITIAL_INQUIRIES: BuyerInquiry[] = [
  {
    id: 'inq-101',
    machineId: 'cat-d6e-dozer',
    machineTitle: 'Caterpillar D6E Crawler Dozer',
    machineStock: 'DE-D6E-01',
    machineImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80',
    customerName: 'Alex Miller',
    customerEmail: 'alex.miller@apexconstruction.com',
    customerPhone: '+1 (415) 890-4421',
    company: 'Apex Global Infrastructure Ltd',
    country: 'United Arab Emirates',
    destinationPort: 'Jebel Ali / Dubai, UAE',
    inquiryDate: '2026-10-21',
    status: 'deposit_paid',
    priceQuoted: 58500,
    shippingServices: {
      inlandTrucking: true,
      containerizing: true,
      oceanFreight: true,
      insurance: true
    },
    totalEstimatedAmount: 76950,
    brokerNotes: 'Wire deposit received ($20,000). Machine sent to yard for blade teardown and containerization. 40ft HC booked on Maersk vessel.',
    proFormaNumber: 'DEQ-PI-2026-904'
  },
  {
    id: 'inq-102',
    machineId: 'komatsu-pc300-8',
    machineTitle: 'Komatsu PC300LC-8 Hydraulic Excavator',
    machineStock: 'DE-PC300-02',
    machineImage: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80',
    customerName: 'Alex Miller',
    customerEmail: 'alex.miller@apexconstruction.com',
    customerPhone: '+1 (415) 890-4421',
    company: 'Apex Global Infrastructure Ltd',
    country: 'United Arab Emirates',
    destinationPort: 'Jebel Ali / Dubai, UAE',
    inquiryDate: '2026-10-23',
    status: 'quoted',
    priceQuoted: 84000,
    shippingServices: {
      inlandTrucking: true,
      containerizing: true,
      oceanFreight: true,
      insurance: true
    },
    totalEstimatedAmount: 104870,
    brokerNotes: 'Pro-forma issued. Client reviewing engine compression report and oil analysis before sending final wire.',
    proFormaNumber: 'DEQ-PI-2026-918'
  },
  {
    id: 'inq-103',
    machineId: 'case-580sm-plus',
    machineTitle: 'Case 580 Super M+ Series 2 Backhoe Loader',
    machineStock: 'DE-580SM-03',
    machineImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1000&q=80',
    customerName: 'Carlos Mendoza',
    customerEmail: 'carlos@mendozaconstructora.mx',
    customerPhone: '+52 55 4912 3012',
    company: 'Mendoza Constructora S.A.',
    country: 'Mexico',
    destinationPort: 'Veracruz / Laredo Border Trucking',
    inquiryDate: '2026-10-24',
    status: 'pending',
    priceQuoted: 34500,
    shippingServices: {
      inlandTrucking: true,
      containerizing: false,
      oceanFreight: false,
      insurance: true
    },
    totalEstimatedAmount: 39800,
    brokerNotes: 'Customer requested direct flatbed trucking quote to Laredo border checkpoint for Mexico import.',
    proFormaNumber: 'DEQ-PI-2026-925'
  }
];

export const INITIAL_SHIPMENTS: ShipmentTrackingRecord[] = [
  {
    id: 'shp-001',
    inquiryId: 'inq-101',
    machineTitle: 'Caterpillar D6E Crawler Dozer',
    stockNumber: 'DE-D6E-01',
    machineImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80',
    buyerName: 'Alex Miller',
    buyerCompany: 'Apex Global Infrastructure Ltd',
    mode: 'Containerized (40ft High Cube)',
    originHub: 'Dawood Chicago Logistics Terminal (IL)',
    destinationPort: 'Jebel Ali / Dubai Port (AE)',
    carrierName: 'Maersk Ocean Line / Western Express Haulage',
    trackingNumber: 'MSKU-89210948-US',
    containerNumber: 'MSKU-492019-8 (40ft HC)',
    vesselName: 'Maersk Mc-Kinney Moller (Voyage 2604E)',
    status: 'teardown_containerizing',
    progressPercent: 45,
    estimatedArrivalDate: '2026-11-28',
    currentMilestone: 'Teardown Completed: Blade & ROPS secured in 40ft HC. Moving to Houston Port terminal.',
    timeline: [
      {
        date: '2026-10-21',
        title: 'Wire Deposit Verified & Machine Reserved',
        location: 'Chicago HQ, Illinois',
        completed: true
      },
      {
        date: '2026-10-22',
        title: '120-Point Export Mechanical Inspection & Fluid Flushing',
        location: 'Service Bay 3, Chicago Yard',
        completed: true
      },
      {
        date: '2026-10-23',
        title: 'Component Teardown (Blade, Track Pads & Canopy Disassembly)',
        location: 'Rigging Yard, Chicago',
        completed: true
      },
      {
        date: '2026-10-24',
        title: 'Container Stuffing & Heavy-Duty Lashing into 40ft High Cube',
        location: 'Container Terminal 4, Chicago Intermodal',
        completed: true
      },
      {
        date: '2026-10-28',
        title: 'Intermodal Rail & Lowboy Transit to Houston Sea Port',
        location: 'Port of Houston, Texas',
        completed: false
      },
      {
        date: '2026-11-04',
        title: 'Ocean Vessel Departure via Gulf of Mexico',
        location: 'Atlantic Shipping Lane',
        completed: false
      },
      {
        date: '2026-11-28',
        title: 'Discharge at Jebel Ali Port & Customs Handover',
        location: 'Jebel Ali Terminal 2, UAE',
        completed: false
      }
    ]
  }
];

export const INITIAL_SELL_OFFERS: SellOfferSubmission[] = [
  {
    id: 'sell-501',
    sellerName: 'Marcus Vance',
    sellerEmail: 'marcus@vancecontracting.com',
    sellerPhone: '+1 (312) 555-0199',
    sellerCompany: 'Vance Earthmoving & Paving',
    equipmentMake: 'CATERPILLAR',
    equipmentModel: 'D8R Crawler Dozer',
    year: 2012,
    hours: 6850,
    serialVin: 'CAT00D8RE7XM02194',
    location: 'Peoria, Illinois',
    askingPrice: 95000,
    conditionNotes: 'Undercarriage 75%, original Cat 3406 engine, recent hydraulic pump replacement with invoice records.',
    submittedDate: '2026-10-23',
    status: 'offer_sent',
    adminOfferPrice: 88500
  },
  {
    id: 'sell-502',
    sellerName: 'David Kowalski',
    sellerEmail: 'david@michiganhauling.net',
    sellerPhone: '+1 (616) 402-9811',
    sellerCompany: 'Great Lakes Heavy Excavation',
    equipmentMake: 'KOMATSU',
    equipmentModel: 'WA470-6 Wheel Loader',
    year: 2014,
    hours: 5400,
    serialVin: 'KMT0WA470H65021',
    location: 'Grand Rapids, Michigan',
    askingPrice: 72000,
    conditionNotes: 'Tight pins, clean transmission, 5.5yd bucket with bolt-on edge. Ready for immediate load out.',
    submittedDate: '2026-10-24',
    status: 'under_review'
  }
];
