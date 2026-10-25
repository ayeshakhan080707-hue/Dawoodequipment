import { Router, Request, Response } from 'express';
import { ManufacturerModel, CategoryModel } from '../models/Taxonomy.js';
import { protect, adminOnly, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Default seed data
const DEFAULT_MANUFACTURERS = [
  { name: 'Caterpillar', slug: 'CATERPILLAR', country: 'United States', description: 'World leading manufacturer of construction and mining equipment' },
  { name: 'Komatsu', slug: 'KOMATSU', country: 'Japan', description: 'Japanese multinational manufacturer of construction, mining, and forestry machinery' },
  { name: 'Case', slug: 'CASE', country: 'United States', description: 'Premium manufacturer of backhoes, excavators, and wheel loaders' },
  { name: 'Blaw-Knox', slug: 'BLAW-KNOX', country: 'United States', description: 'Specialized road paving, asphalt pavers, and highway equipment' },
  { name: 'John Deere', slug: 'JOHN DEERE', country: 'United States', description: 'Industrial forestry and earthmoving equipment' },
  { name: 'Sakai', slug: 'SAKAI', country: 'Japan', description: 'Vibratory soil compactors and asphalt rollers' },
  { name: 'Taylor', slug: 'TAYLOR', country: 'United States', description: 'Heavy-duty industrial container handling and pneumatic forklifts' },
  { name: 'Hitachi', slug: 'HITACHI', country: 'Japan', description: 'Hydraulic excavators and quarry machinery' },
  { name: 'Volvo', slug: 'VOLVO', country: 'Sweden', description: 'Articulated haulers, wheel loaders, and excavators' }
];

const DEFAULT_CATEGORIES = [
  { name: 'Dozers', slug: 'Dozer', description: 'Crawler bulldozers with 6-way blades and rippers', icon: 'Tractor' },
  { name: 'Excavators', slug: 'Excavators', description: 'Hydraulic crawler & wheeled excavators', icon: 'Shovel' },
  { name: 'Wheel Loaders', slug: 'Wheel Loader', description: 'Production aggregate and earthmoving loaders', icon: 'Truck' },
  { name: 'Backhoe Loaders', slug: 'Backhoes', description: 'Trenching and loading utility backhoes', icon: 'Wrench' },
  { name: 'Rollers & Compactors', slug: 'Roller', description: 'Vibratory smooth drum and padfoot compactors', icon: 'CircleDot' },
  { name: 'Heavy Forklifts', slug: 'Forklift', description: 'Pneumatic yard and container handling forklifts', icon: 'Boxes' },
  { name: 'Asphalt Pavers', slug: 'Asphalt Paver', description: 'Highway paving and screed compaction equipment', icon: 'Layers' },
  { name: 'Motor Graders', slug: 'Motor Grader', description: 'Precision haul road grading and ditching units', icon: 'Sliders' }
];

// Helper to seed if empty
const ensureTaxonomySeeded = async () => {
  try {
    const mCount = await ManufacturerModel.countDocuments();
    if (mCount === 0) {
      await ManufacturerModel.insertMany(DEFAULT_MANUFACTURERS);
      console.log('Seeded default manufacturers taxonomy');
    }
    const cCount = await CategoryModel.countDocuments();
    if (cCount === 0) {
      await CategoryModel.insertMany(DEFAULT_CATEGORIES);
      console.log('Seeded default categories taxonomy');
    }
  } catch (err) {
    console.error('Taxonomy auto-seed error:', err);
  }
};

// Auto-seed on startup
ensureTaxonomySeeded();

// ==================== MANUFACTURERS ROUTES ====================

// @route   GET /api/taxonomy/manufacturers
// @desc    Get all active manufacturers
router.get('/manufacturers', async (_req: Request, res: Response): Promise<void> => {
  try {
    let list = await ManufacturerModel.find().sort({ name: 1 });
    if (list.length === 0) {
      await ensureTaxonomySeeded();
      list = await ManufacturerModel.find().sort({ name: 1 });
    }
    res.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch manufacturers', error: error.message });
  }
});

// @route   POST /api/taxonomy/manufacturers
// @desc    Admin: Create new manufacturer
router.post('/manufacturers', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, slug, country, description } = req.body;
    if (!name || !name.trim()) {
      res.status(400).json({ success: false, message: 'Manufacturer name is required' });
      return;
    }

    const finalSlug = (slug || name).trim().toUpperCase();
    const existing = await ManufacturerModel.findOne({
      $or: [{ name: name.trim() }, { slug: finalSlug }]
    });

    if (existing) {
      res.status(400).json({ success: false, message: 'A manufacturer with this name or code already exists' });
      return;
    }

    const created = await ManufacturerModel.create({
      name: name.trim(),
      slug: finalSlug,
      country: country ? country.trim() : 'Global',
      description: description ? description.trim() : ''
    });

    res.status(201).json({ success: true, message: 'Manufacturer added successfully', data: created });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create manufacturer', error: error.message });
  }
});

// @route   PUT /api/taxonomy/manufacturers/:id
// @desc    Admin: Update manufacturer
router.put('/manufacturers/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, slug, country, description } = req.body;
    const updateData: any = {};
    if (name) updateData.name = name.trim();
    if (slug) updateData.slug = slug.trim().toUpperCase();
    if (country !== undefined) updateData.country = country.trim();
    if (description !== undefined) updateData.description = description.trim();

    const updated = await ManufacturerModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: 'Manufacturer not found' });
      return;
    }

    res.json({ success: true, message: 'Manufacturer updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update manufacturer', error: error.message });
  }
});

// @route   DELETE /api/taxonomy/manufacturers/:id
// @desc    Admin: Delete manufacturer
router.delete('/manufacturers/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const deleted = await ManufacturerModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Manufacturer not found' });
      return;
    }
    res.json({ success: true, message: 'Manufacturer deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete manufacturer', error: error.message });
  }
});


// ==================== CATEGORIES ROUTES ====================

// @route   GET /api/taxonomy/categories
// @desc    Get all active equipment product types / categories
router.get('/categories', async (_req: Request, res: Response): Promise<void> => {
  try {
    let list = await CategoryModel.find().sort({ name: 1 });
    if (list.length === 0) {
      await ensureTaxonomySeeded();
      list = await CategoryModel.find().sort({ name: 1 });
    }
    res.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message });
  }
});

// @route   POST /api/taxonomy/categories
// @desc    Admin: Create new category / equipment type
router.post('/categories', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, slug, description, icon } = req.body;
    if (!name || !name.trim()) {
      res.status(400).json({ success: false, message: 'Category name is required' });
      return;
    }

    const finalSlug = slug ? slug.trim() : name.trim();
    const existing = await CategoryModel.findOne({
      $or: [{ name: name.trim() }, { slug: finalSlug }]
    });

    if (existing) {
      res.status(400).json({ success: false, message: 'A category with this name or code already exists' });
      return;
    }

    const created = await CategoryModel.create({
      name: name.trim(),
      slug: finalSlug,
      description: description ? description.trim() : '',
      icon: icon ? icon.trim() : 'Boxes'
    });

    res.status(201).json({ success: true, message: 'Category added successfully', data: created });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create category', error: error.message });
  }
});

// @route   PUT /api/taxonomy/categories/:id
// @desc    Admin: Update category / equipment type
router.put('/categories/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, slug, description, icon } = req.body;
    const updateData: any = {};
    if (name) updateData.name = name.trim();
    if (slug) updateData.slug = slug.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (icon) updateData.icon = icon.trim();

    const updated = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }

    res.json({ success: true, message: 'Category updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update category', error: error.message });
  }
});

// @route   DELETE /api/taxonomy/categories/:id
// @desc    Admin: Delete category
router.delete('/categories/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const deleted = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete category', error: error.message });
  }
});

export default router;
