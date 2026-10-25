import mongoose, { Document, Schema } from 'mongoose';

export interface IManufacturer extends Document {
  name: string;
  slug: string;
  country?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ManufacturerSchema = new Schema<IManufacturer>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    country: { type: String, default: 'Global' },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Boxes' }
  },
  { timestamps: true }
);

export const ManufacturerModel = mongoose.model<IManufacturer>('Manufacturer', ManufacturerSchema);
export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
