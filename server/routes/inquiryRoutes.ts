import { Router, Response } from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { protect, adminOnly, AuthRequest } from '../middleware/auth.js';

const router = Router();

// @route   GET /api/inquiries
// @desc    Get inquiries (admin gets all, client gets theirs)
router.get('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let query: any = {};
    if (req.user?.role !== 'admin') {
      query.customerEmail = req.user?.email.toLowerCase().trim();
    }

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch inquiries', error: error.message });
  }
});

// @route   POST /api/inquiries
// @desc    Create a new buyer inquiry / pro-forma quote request
router.post('/', async (req, res: Response): Promise<void> => {
  try {
    const {
      machineId,
      machineTitle,
      machineStock,
      machineImage,
      customerName,
      customerEmail,
      customerPhone,
      company,
      country,
      destinationPort,
      shippingServices,
      totalEstimatedAmount,
      brokerNotes
    } = req.body;

    if (!machineTitle || !customerName || !customerEmail) {
      res.status(400).json({ success: false, message: 'Please provide machinery and contact information' });
      return;
    }

    const newInquiry = await Inquiry.create({
      id: `inq-${Date.now()}`,
      machineId: machineId || 'general',
      machineTitle,
      machineStock: machineStock || 'N/A',
      machineImage: machineImage || '',
      customerName,
      customerEmail: customerEmail.toLowerCase().trim(),
      customerPhone: customerPhone || '',
      company: company || '',
      country: country || 'United States',
      destinationPort: destinationPort || 'Direct Inland Delivery',
      inquiryDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      shippingServices: shippingServices || {
        inlandTrucking: true,
        containerizing: true,
        oceanFreight: true,
        insurance: true
      },
      totalEstimatedAmount: totalEstimatedAmount || 0,
      brokerNotes: brokerNotes || '',
      proFormaNumber: `DEQ-PI-2026-${Math.floor(100 + Math.random() * 900)}`
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. An export broker will contact you.',
      data: newInquiry
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to submit inquiry', error: error.message });
  }
});

// @route   PATCH /api/inquiries/:id/status
// @desc    Admin only: Update inquiry workflow status, price quote & broker internal notes
router.patch('/:id/status', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, brokerNotes, priceQuoted, proFormaNumber } = req.body;
    const id = req.params.id;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (brokerNotes !== undefined) updateData.brokerNotes = brokerNotes;
    if (priceQuoted !== undefined) updateData.priceQuoted = priceQuoted;
    if (proFormaNumber !== undefined) updateData.proFormaNumber = proFormaNumber;

    const updated = await Inquiry.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }

    res.json({ success: true, message: 'Inquiry status updated', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update inquiry', error: error.message });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Admin only: Delete an inquiry
router.delete('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deleted = await Inquiry.findOneAndDelete({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }

    res.json({ success: true, message: 'Inquiry deleted', data: deleted });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete inquiry', error: error.message });
  }
});

export default router;
