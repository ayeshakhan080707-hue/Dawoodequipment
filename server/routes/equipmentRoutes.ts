import { Router, Request, Response } from 'express';
import { EquipmentModel } from '../models/Equipment.js';
import { protect, adminOnly, AuthRequest } from '../middleware/auth.js';

const router = Router();

// @route   GET /api/equipment
// @desc    Get all fleet machinery with optional filters & search
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, vendor, category, status } = req.query;

    const query: any = {};

    if (search && typeof search === 'string') {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { title: regex },
        { model: regex },
        { stockNumber: regex },
        { vendor: regex },
        { category: regex }
      ];
    }

    if (vendor && vendor !== 'all') {
      query.vendor = vendor;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (status === 'available') {
      query.isSold = false;
    } else if (status === 'sold') {
      query.isSold = true;
    }

    const fleet = await EquipmentModel.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: fleet.length, data: fleet });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch equipment', error: error.message });
  }
});

// @route   GET /api/equipment/:id
// @desc    Get single machine details by id or stockNumber
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const machine = await EquipmentModel.findOne({
      $or: [{ id }, { stockNumber: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!machine) {
      res.status(404).json({ success: false, message: 'Equipment not found' });
      return;
    }

    res.json({ success: true, data: machine });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch equipment', error: error.message });
  }
});

// @route   POST /api/equipment
// @desc    Admin only: Create new machinery unit in fleet
router.post('/', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      model,
      vendor,
      category,
      year,
      hours,
      price,
      priceDisplay,
      stockNumber,
      serialVin,
      location,
      image,
      mainImage,
      images,
      galleryImages,
      additionalImages,
      operatingWeightKg,
      powerHp,
      condition,
      specs,
      description,
      features,
      keyHighlights,
      inspectionPdfUrl,
      videoUrl,
      videoTitle,
      videoDuration
    } = req.body;

    if (!title || !model || !vendor || !category) {
      res.status(400).json({ success: false, message: 'Please provide title, model, vendor, and category' });
      return;
    }

    const generatedId = (title + '-' + (stockNumber || Date.now()))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const generatedStock = stockNumber || `DEQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const primaryImg = image || mainImage || 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80';
    const allImgs = (images && images.length > 0) ? images : (galleryImages && galleryImages.length > 0 ? [primaryImg, ...galleryImages.filter((g: string) => g !== primaryImg)] : [primaryImg]);

    const newMachine = await EquipmentModel.create({
      id: generatedId,
      title,
      name: title,
      model,
      vendor,
      manufacturer: vendor,
      category,
      productType: category,
      categoryLabel: `${vendor} ${category}`,
      year: year || new Date().getFullYear(),
      hours: hours || 0,
      price: price || 0,
      numericPrice: price || 0,
      priceDisplay: priceDisplay || (price ? `$${price.toLocaleString()}` : 'Call for Price'),
      stockNumber: generatedStock,
      serialVin: serialVin || `VIN-US-${Math.floor(100000 + Math.random() * 900000)}`,
      location: location || 'Chicago Central Yard, IL',
      image: primaryImg,
      mainImage: primaryImg,
      images: allImgs,
      additionalImages: additionalImages || allImgs.slice(1),
      operatingWeightKg: operatingWeightKg || 20000,
      powerHp: powerHp || 200,
      isSold: false,
      condition: condition || 'Jobsite Ready / Tier 4 Final',
      specs: specs || {},
      description: description || `Heavy equipment unit ready for worldwide export or domestic delivery.`,
      features: features || ['Certified EPA Tier 4', 'Full Service Records', 'Ready for Export'],
      keyHighlights: keyHighlights || ['Pre-shipment serviced', 'Clean hydraulic oil report'],
      inspectionPdfUrl,
      videoUrl: videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-excavator-working-on-a-construction-site-41619-large.mp4',
      videoTitle: videoTitle || 'Dawood Inspection Walkaround & Cold Start',
      videoDuration: videoDuration || '3:20 min'
    });

    res.status(201).json({ success: true, message: 'Equipment added successfully', data: newMachine });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create equipment', error: error.message });
  }
});

// @route   PUT /api/equipment/:id
// @desc    Admin only: Update machinery specifications / pricing
router.put('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const updated = await EquipmentModel.findOneAndUpdate(
      { $or: [{ id }, { stockNumber: id }] },
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: 'Equipment not found' });
      return;
    }

    res.json({ success: true, message: 'Equipment updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update equipment', error: error.message });
  }
});

// @route   PATCH /api/equipment/:id/toggle-sold
// @desc    Admin only: Toggle equipment between AVAILABLE and SOLD
router.patch('/:id/toggle-sold', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const machine = await EquipmentModel.findOne({ $or: [{ id }, { stockNumber: id }] });

    if (!machine) {
      res.status(404).json({ success: false, message: 'Equipment not found' });
      return;
    }

    machine.isSold = !machine.isSold;
    machine.priceDisplay = machine.isSold ? '(SOLD)' : (machine.price ? `$${machine.price.toLocaleString()}` : 'Call for Price');
    await machine.save();

    res.json({
      success: true,
      message: `Machine marked as ${machine.isSold ? 'SOLD' : 'AVAILABLE'}`,
      data: machine
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to toggle sold status', error: error.message });
  }
});

// @route   DELETE /api/equipment/:id
// @desc    Admin only: Delete machinery unit from inventory
router.delete('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deleted = await EquipmentModel.findOneAndDelete({ $or: [{ id }, { stockNumber: id }] });

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Equipment not found' });
      return;
    }

    res.json({ success: true, message: 'Equipment removed from inventory', data: deleted });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete equipment', error: error.message });
  }
});

export default router;
