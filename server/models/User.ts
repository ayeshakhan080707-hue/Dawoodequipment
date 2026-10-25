import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  company: string;
  phone: string;
  country: string;
  role: 'buyer' | 'admin';
  destinationPort?: string;
  status: 'active' | 'suspended';
  consigneeDetails?: {
    companyName?: string;
    taxId?: string;
    deliveryAddress?: string;
    notifyParty?: string;
    destinationPort?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    company: { type: String, default: 'Independent Buyer' },
    phone: { type: String, default: '+1 (555) 000-0000' },
    country: { type: String, default: 'United States' },
    role: { type: String, enum: ['buyer', 'admin'], default: 'buyer' },
    destinationPort: { type: String, default: 'Direct Inland Delivery' },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' },
    consigneeDetails: {
      companyName: { type: String, default: '' },
      taxId: { type: String, default: '' },
      deliveryAddress: { type: String, default: '' },
      notifyParty: { type: String, default: '' },
      destinationPort: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Compare password helper
UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password || '');
};

export const User = mongoose.model<IUser>('User', UserSchema);
