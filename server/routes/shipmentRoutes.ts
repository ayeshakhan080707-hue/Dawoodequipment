import { Router, Response } from 'express';
import { Shipment } from '../models/Shipment.js';
import { protect, adminOnly, AuthRequest } from '../middleware/auth.js';

const router = Router();

// @route   GET /api/shipments
// @desc    Get tracking shipments (admin gets all, client gets their relevant shipments)
router.get('/', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let query: any = {};
    if (req.user?.role !== 'admin') {
      query.buyerName = new RegExp(req.user?.name || '', 'i');
    }

    const shipments = await Shipment.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: shipments.length, data: shipments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch shipments', error: error.message });
  }
});

// @route   POST /api/shipments
// @desc    Admin only: Dispatch new shipment / logistics order
router.post('/', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      inquiryId,
      machineTitle,
      stockNumber,
      machineImage,
      buyerName,
      buyerCompany,
      mode,
      originHub,
      destinationPort,
      carrierName,
      trackingNumber,
      containerNumber,
      vesselName,
      status,
      progressPercent,
      estimatedArrivalDate,
      currentMilestone,
      timeline
    } = req.body;

    const newShipment = await Shipment.create({
      id: `shp-${Date.now()}`,
      inquiryId: inquiryId || '',
      machineTitle,
      stockNumber: stockNumber || 'N/A',
      machineImage: machineImage || '',
      buyerName,
      buyerCompany: buyerCompany || '',
      mode: mode || 'Containerized (40ft High Cube)',
      originHub: originHub || 'Chicago Logistics Yard, IL',
      destinationPort,
      carrierName: carrierName || 'Maersk Line',
      trackingNumber: trackingNumber || `MAE-${Math.floor(1000000 + Math.random() * 9000000)}`,
      containerNumber,
      vesselName,
      status: status || 'yard_prep',
      progressPercent: progressPercent || 15,
      estimatedArrivalDate: estimatedArrivalDate || 'Within 30 Days',
      currentMilestone: currentMilestone || 'Inspection & Teardown at Chicago Terminal',
      timeline: timeline || [
        {
          date: new Date().toISOString().split('T')[0],
          title: 'Booking Confirmed & Yard Dispatched',
          location: originHub || 'Chicago Logistics Terminal, IL',
          completed: true
        }
      ]
    });

    res.status(201).json({ success: true, message: 'Shipment created successfully', data: newShipment });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create shipment', error: error.message });
  }
});

// @route   PATCH /api/shipments/:id
// @desc    Admin only: Update shipment status, milestone, and progress percent
router.patch('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const { status, currentMilestone, progressPercent, vesselName, containerNumber, newTimelineEvent } = req.body;

    const shipment = await Shipment.findOne({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!shipment) {
      res.status(404).json({ success: false, message: 'Shipment not found' });
      return;
    }

    if (status) shipment.status = status;
    if (currentMilestone) shipment.currentMilestone = currentMilestone;
    if (progressPercent !== undefined) shipment.progressPercent = progressPercent;
    if (vesselName) shipment.vesselName = vesselName;
    if (containerNumber) shipment.containerNumber = containerNumber;

    if (newTimelineEvent) {
      shipment.timeline.push(newTimelineEvent);
    }

    await shipment.save();

    res.json({ success: true, message: 'Shipment updated successfully', data: shipment });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update shipment', error: error.message });
  }
});

// @route   DELETE /api/shipments/:id
// @desc    Admin only: Delete shipment
router.delete('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deleted = await Shipment.findOneAndDelete({
      $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Shipment not found' });
      return;
    }

    res.json({ success: true, message: 'Shipment deleted', data: deleted });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete shipment', error: error.message });
  }
});

export default router;
