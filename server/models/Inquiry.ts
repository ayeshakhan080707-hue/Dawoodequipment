import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
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
  status: 'pending' | 'quoted' | 'deposit_paid' | 'dispatched' | 'delivered';
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
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    id: { type: String, required: true, unique: true, index: true },
    machineId: { type: String, required: true },
    machineTitle: { type: String, required: true },
    machineStock: { type: String, default: '' },
    machineImage: { type: String, default: '' },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true, index: true },
    customerPhone: { type: String, default: '' },
    company: { type: String, default: '' },
    country: { type: String, default: 'United States' },
    destinationPort: { type: String, default: 'Direct Inland Delivery' },
    inquiryDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    status: {
      type: String,
      enum: ['pending', 'quoted', 'deposit_paid', 'dispatched', 'delivered'],
      default: 'pending'
    },
    priceQuoted: { type: Number },
    shippingServices: {
      inlandTrucking: { type: Boolean, default: false },
      containerizing: { type: Boolean, default: false },
      oceanFreight: { type: Boolean, default: false },
      insurance: { type: Boolean, default: false }
    },
    totalEstimatedAmount: { type: Number },
    brokerNotes: { type: String, default: '' },
    proFormaNumber: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model<IInquiry>('Inquiry', InquirySchema);
