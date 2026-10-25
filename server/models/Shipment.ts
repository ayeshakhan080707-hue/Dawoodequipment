import mongoose, { Document, Schema } from 'mongoose';

export interface IShipmentUpdate {
  date: string;
  title: string;
  location: string;
  completed: boolean;
}

export interface IShipment extends Document {
  id: string;
  inquiryId: string;
  machineTitle: string;
  stockNumber: string;
  machineImage: string;
  buyerName: string;
  buyerCompany: string;
  mode: string;
  originHub: string;
  destinationPort: string;
  carrierName: string;
  trackingNumber: string;
  containerNumber?: string;
  vesselName?: string;
  status: 'yard_prep' | 'trucking_to_port' | 'teardown_containerizing' | 'vessel_transit' | 'port_customs' | 'delivered';
  progressPercent: number;
  estimatedArrivalDate: string;
  currentMilestone: string;
  timeline: IShipmentUpdate[];
  createdAt: Date;
  updatedAt: Date;
}

const ShipmentSchema = new Schema<IShipment>(
  {
    id: { type: String, required: true, unique: true, index: true },
    inquiryId: { type: String, default: '' },
    machineTitle: { type: String, required: true },
    stockNumber: { type: String, default: '' },
    machineImage: { type: String, default: '' },
    buyerName: { type: String, required: true },
    buyerCompany: { type: String, default: '' },
    mode: { type: String, default: 'Containerized (40ft High Cube)' },
    originHub: { type: String, default: 'Chicago Logistics Terminal, IL' },
    destinationPort: { type: String, required: true },
    carrierName: { type: String, default: 'Maersk Line' },
    trackingNumber: { type: String, required: true },
    containerNumber: { type: String },
    vesselName: { type: String },
    status: {
      type: String,
      enum: ['yard_prep', 'trucking_to_port', 'teardown_containerizing', 'vessel_transit', 'port_customs', 'delivered'],
      default: 'yard_prep'
    },
    progressPercent: { type: Number, default: 10 },
    estimatedArrivalDate: { type: String, default: '' },
    currentMilestone: { type: String, default: '' },
    timeline: [
      {
        date: { type: String },
        title: { type: String },
        location: { type: String },
        completed: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true }
);

export const Shipment = mongoose.model<IShipment>('Shipment', ShipmentSchema);
