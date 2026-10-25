import { Router, Response } from 'express';
import { SellOffer } from '../models/SellOffer.js';
import { protect, adminOnly, AuthRequest } from '../middleware/auth.js';

const router = Router();

// @route   GET /api/sell-offers
// @desc    Get equipment buy-in offers
router.get('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let query: any = {};
    if (req.user?.role !== 'admin') {
      query.sellerEmail = req.user?.email.toLowerCase().trim();
    }

    const offers = await SellOffer.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: offers.length, data: offers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch sell offers', error: error.message });
  }
});

// @route   POST /api/sell-offers
// @desc    Client / Contractor submits machine they want to sell
router.post('/', async (req, res: Response): Promise<void> => {
  try {
    const {
      sellerName,
      sellerEmail,
      sellerPhone,
      sellerCompany,
      equipmentMake,
      equipmentModel,
      year,
      hours,
      serialVin,
      location,
      askingPrice,
      conditionNotes
    } = req.body;

    if (!sellerName || !sellerEmail || !equipmentMake || !equipmentModel) {
      res.status(400).json({ success: false, message: 'Please provide seller and machine details' });
      return;
    }

    const newOffer = await SellOffer.create({
      id: `sell-${Date.now()}`,
      sellerName,
      sellerEmail: sellerEmail.toLowerCase().trim(),
      sellerPhone: sellerPhone || '',
      sellerCompany: sellerCompany || '',
      equipmentMake,
      equipmentModel,
      year: year || 2020,
      hours: hours || 0,
      serialVin: serialVin || '',
      location: location || '',
      askingPrice: askingPrice || 0,
      conditionNotes: conditionNotes || '',
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'under_review'
    });

    res.status(201).json({
      success: true,
      message: 'Equipment offer submitted for appraisal. Our acquisitions team will inspect your machine.',
      data: newOffer
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to submit sell offer', error: error.message });
  }
});

// @route   PATCH /api/sell-offers/:id
// @desc    Admin only: Update offer status & counter buyout price
router.patch('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const { status, adminOfferPrice } = req.body;

    const offer = await SellOffer.findOne({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!offer) {
      res.status(404).json({ success: false, message: 'Sell offer not found' });
      return;
    }

    if (status) offer.status = status;
    if (adminOfferPrice !== undefined) offer.adminOfferPrice = adminOfferPrice;

    await offer.save();

    res.json({ success: true, message: 'Sell offer updated', data: offer });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update sell offer', error: error.message });
  }
});

// @route   DELETE /api/sell-offers/:id
// @desc    Admin only: Delete sell offer
router.delete('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deleted = await SellOffer.findOneAndDelete({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Sell offer not found' });
      return;
    }

    res.json({ success: true, message: 'Sell offer deleted', data: deleted });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete sell offer', error: error.message });
  }
});

export default router;
