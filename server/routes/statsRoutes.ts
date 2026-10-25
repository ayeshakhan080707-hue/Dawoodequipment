import { Router, Response } from 'express';
import { EquipmentModel } from '../models/Equipment.js';
import { Inquiry } from '../models/Inquiry.js';
import { Shipment } from '../models/Shipment.js';
import { SellOffer } from '../models/SellOffer.js';
import { User } from '../models/User.js';
import { protect, adminOnly, AuthRequest } from '../middleware/auth.js';

const router = Router();

// @route   GET /api/stats
// @desc    Admin only: Real-time operational metrics and summary KPIs
router.get('/', protect, adminOnly, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalEquipment = await EquipmentModel.countDocuments();
    const soldEquipment = await EquipmentModel.countDocuments({ isSold: true });
    const availableEquipment = totalEquipment - soldEquipment;

    const totalInquiries = await Inquiry.countDocuments();
    const pendingInquiries = await Inquiry.countDocuments({ status: 'pending' });

    const totalShipments = await Shipment.countDocuments();
    const activeShipments = await Shipment.countDocuments({ status: { $ne: 'delivered' } });

    const totalSellOffers = await SellOffer.countDocuments();
    const pendingSellOffers = await SellOffer.countDocuments({ status: 'under_review' });

    const totalUsers = await User.countDocuments();

    // Calculate approximate fleet inventory valuation
    const machines = await EquipmentModel.find().select('price isSold');
    const totalInventoryValue = machines.reduce((sum, m) => sum + (m.price || 0), 0);

    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);
    const recentOffers = await SellOffer.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      stats: {
        totalEquipment,
        availableEquipment,
        soldEquipment,
        totalInquiries,
        pendingInquiries,
        totalShipments,
        activeShipments,
        totalSellOffers,
        pendingSellOffers,
        totalUsers,
        totalInventoryValue
      },
      recent: {
        inquiries: recentInquiries,
        offers: recentOffers
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch operational stats', error: error.message });
  }
});

export default router;
