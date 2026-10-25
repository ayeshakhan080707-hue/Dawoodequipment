import mongoose, { Schema } from 'mongoose';

export interface IEquipment {
  id: string;
  stockNumber: string;
  title: string;
  name: string;
  model: string;
  vendor: string;
  manufacturer: string;
  productType: string;
  category: string;
  categoryLabel: string;
  year: number;
  hours: number;
  isSold: boolean;
  priceDisplay: string;
  numericPrice: number;
  price?: number;
  dailyRate?: number;
  image: string;
  mainImage?: string;
  images: string[];
  additionalImages?: string[];
  specs: Record<string, any>;
  inspection?: Record<string, any>;
  description: string;
  tagline?: string;
  features: string[];
  certifications?: string[];
  truckingAvailable?: boolean;
  containerizingReady?: boolean;
  oceanFreightEligible?: boolean;
  estimatedShippingWeightLbs?: number;
  dismantleComplexity?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EquipmentSchema = new Schema<IEquipment>(
  {
    id: { type: String, required: true, unique: true, index: true },
    stockNumber: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    name: { type: String, default: '' },
    model: { type: String, default: '' },
    vendor: { type: String, default: 'CATERPILLAR' },
    manufacturer: { type: String, default: 'Caterpillar' },
    productType: { type: String, default: 'Excavators' },
    category: { type: String, default: 'Excavators' },
    categoryLabel: { type: String, default: 'Heavy Machinery' },
    year: { type: Number, default: 2020 },
    hours: { type: Number, default: 0 },
    isSold: { type: Boolean, default: false },
    priceDisplay: { type: String, default: 'Call for Price' },
    numericPrice: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    dailyRate: { type: Number, default: 0 },
    image: { type: String, required: true },
    mainImage: { type: String, default: '' },
    images: [{ type: String }],
    additionalImages: [{ type: String }],
    specs: { type: Schema.Types.Mixed, default: {} },
    inspection: { type: Schema.Types.Mixed, default: {} },
    description: { type: String, default: '' },
    tagline: { type: String, default: '' },
    features: [{ type: String }],
    certifications: [{ type: String }],
    truckingAvailable: { type: Boolean, default: true },
    containerizingReady: { type: Boolean, default: true },
    oceanFreightEligible: { type: Boolean, default: true },
    estimatedShippingWeightLbs: { type: Number, default: 45000 },
    dismantleComplexity: { type: String, default: 'Moderate' },
    videoUrl: { type: String, default: 'https://assets.mixkit.co/videos/preview/mixkit-excavator-working-on-a-construction-site-41619-large.mp4' },
    videoTitle: { type: String, default: 'Dawood Inspection Walkaround & Cold Start' },
    videoDuration: { type: String, default: '3:20 min' }
  },
  { timestamps: true, strict: false }
);

// Populate image/mainImage both ways
EquipmentSchema.pre('save', function (next) {
  if (!this.name) this.name = this.title;
  if (!this.mainImage) this.mainImage = this.image;
  if (!this.image) this.image = this.mainImage;
  if (!this.numericPrice && this.price) this.numericPrice = this.price;
  if (!this.price && this.numericPrice) this.price = this.numericPrice;
  if (!this.images || this.images.length === 0) {
    this.images = [this.image];
  }
  next();
});

export const EquipmentModel = mongoose.model<IEquipment>('Equipment', EquipmentSchema);
