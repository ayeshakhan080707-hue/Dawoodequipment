import mongoose, { Document, Schema } from 'mongoose';

export interface ISellOffer extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const SellOfferSchema = new Schema<ISellOffer>(
  {
    id: { type: String, required: true, unique: true, index: true },
    sellerName: { type: String, required: true },
    sellerEmail: { type: String, required: true, index: true },
    sellerPhone: { type: String, default: '' },
    sellerCompany: { type: String, default: '' },
    equipmentMake: { type: String, required: true },
    equipmentModel: { type: String, required: true },
    year: { type: Number, required: true },
    hours: { type: Number, required: true },
    serialVin: { type: String, default: '' },
    location: { type: String, default: '' },
    askingPrice: { type: Number, default: 0 },
    conditionNotes: { type: String, default: '' },
    submittedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    status: {
      type: String,
      enum: ['under_review', 'offer_sent', 'inspection_scheduled', 'wire_paid', 'declined'],
      default: 'under_review'
    },
    adminOfferPrice: { type: Number }
  },
  { timestamps: true }
);

export const SellOffer = mongoose.model<ISellOffer>('SellOffer', SellOfferSchema);
