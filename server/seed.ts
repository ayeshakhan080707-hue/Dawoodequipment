import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { EquipmentModel } from './models/Equipment.js';
import { Inquiry } from './models/Inquiry.js';
import { Shipment } from './models/Shipment.js';
import { SellOffer } from './models/SellOffer.js';

import { FLEET_INVENTORY } from '../src/data/fleetData.js';
import { INITIAL_INQUIRIES, INITIAL_SHIPMENTS, INITIAL_SELL_OFFERS } from '../src/data/authSeedData.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Checking database collections...');

    // 1. Seed Primary Dealership Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@dawoodequipment.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let admin = await User.findOne({ email: adminEmail.toLowerCase() });
    if (!admin) {
      console.log(`[Seed] Creating primary dealership administrator: ${adminEmail}`);
      admin = await User.create({
        name: 'Tariq Dawood (Director & Operations)',
        email: adminEmail.toLowerCase(),
        password: adminPassword,
        company: 'Dawood Equipment Co. (Corporate)',
        phone: '(630) 379-9175',
        country: 'United States',
        role: 'admin',
        destinationPort: 'United States Central Command',
        status: 'active'
      });
      console.log(`[Seed] Admin created successfully. Email: ${adminEmail} | Password: ${adminPassword}`);
    } else {
      console.log(`[Seed] Admin user verified: ${admin.email}`);
    }

    // 2. Also ensure operations@dawoodequipment.com exists as Admin
    let opsAdmin = await User.findOne({ email: 'operations@dawoodequipment.com' });
    if (!opsAdmin) {
      await User.create({
        name: 'Tariq Dawood',
        email: 'operations@dawoodequipment.com',
        password: 'admin123',
        company: 'Dawood Equipment Co. (Corporate)',
        phone: '(630) 379-9175',
        country: 'United States',
        role: 'admin',
        destinationPort: 'United States',
        status: 'active'
      });
      console.log(`[Seed] Operations admin seeded (operations@dawoodequipment.com)`);
    }

    // 3. Seed Verified Client / Buyer
    const buyerEmail = 'alex.miller@apexconstruction.com';
    let buyer = await User.findOne({ email: buyerEmail.toLowerCase() });
    if (!buyer) {
      console.log(`[Seed] Creating sample verified buyer: ${buyerEmail}`);
      await User.create({
        name: 'Alex Miller',
        email: buyerEmail.toLowerCase(),
        password: 'client123',
        company: 'Apex Global Infrastructure Ltd',
        phone: '+1 (415) 890-4421',
        country: 'United Arab Emirates',
        role: 'buyer',
        destinationPort: 'Jebel Ali / Dubai, UAE',
        status: 'active'
      });
      console.log(`[Seed] Verified Buyer seeded. Email: ${buyerEmail} | Password: client123`);
    }

    // 4. Seed Fleet Inventory
    const equipmentCount = await EquipmentModel.countDocuments();
    if (equipmentCount === 0) {
      console.log(`[Seed] Populating ${FLEET_INVENTORY.length} equipment units into MongoDB...`);
      for (const item of FLEET_INVENTORY) {
        const fallbackImg = 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80';
        const img = item.image || (item as any).mainImage || fallbackImg;
        const imgs = item.images || (item as any).galleryImages || [img];

        await EquipmentModel.create({
          id: item.id,
          stockNumber: item.stockNumber || `DEQ-${item.id}`,
          title: item.title || item.name,
          name: item.name || item.title,
          model: item.model || item.title,
          vendor: item.vendor || 'CATERPILLAR',
          manufacturer: item.manufacturer || item.vendor || 'Caterpillar',
          productType: item.productType || item.category || 'Excavators',
          category: item.category || item.productType || 'Excavators',
          categoryLabel: item.categoryLabel || 'Heavy Machinery',
          year: item.year || 2020,
          hours: item.hours || 0,
          isSold: Boolean(item.isSold),
          priceDisplay: item.priceDisplay || (item.numericPrice ? `$${item.numericPrice.toLocaleString()}` : 'Call for Price'),
          numericPrice: item.numericPrice || 0,
          price: item.numericPrice || 0,
          dailyRate: item.dailyRate || 0,
          image: img,
          mainImage: img,
          images: imgs,
          additionalImages: item.additionalImages || [],
          specs: item.specs || {},
          inspection: item.inspection || {},
          description: item.description || '',
          tagline: item.tagline || '',
          features: item.features || [],
          certifications: item.certifications || [],
          truckingAvailable: item.truckingAvailable ?? true,
          containerizingReady: item.containerizingReady ?? true,
          oceanFreightEligible: item.oceanFreightEligible ?? true,
          estimatedShippingWeightLbs: item.estimatedShippingWeightLbs || 45000,
          dismantleComplexity: item.dismantleComplexity || 'Moderate',
          videoUrl: item.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-excavator-working-on-a-construction-site-41619-large.mp4',
          videoTitle: item.videoTitle || 'Dawood Inspection Walkaround & Cold Start',
          videoDuration: item.videoDuration || '3:20 min'
        });
      }
      console.log(`[Seed] Fleet inventory of ${FLEET_INVENTORY.length} machines successfully populated in MongoDB!`);
    } else {
      console.log(`[Seed] Fleet inventory verified: ${equipmentCount} units in database.`);
    }

    // 5. Seed Inquiries
    const inquiryCount = await Inquiry.countDocuments();
    if (inquiryCount === 0) {
      console.log(`[Seed] Populating initial inquiries...`);
      for (const inq of INITIAL_INQUIRIES) {
        await Inquiry.create(inq);
      }
      console.log(`[Seed] Initial inquiries populated!`);
    }

    // 6. Seed Shipments
    const shipmentCount = await Shipment.countDocuments();
    if (shipmentCount === 0) {
      console.log(`[Seed] Populating initial shipments...`);
      for (const shp of INITIAL_SHIPMENTS) {
        await Shipment.create(shp);
      }
      console.log(`[Seed] Initial shipments populated!`);
    }

    // 7. Seed Sell Offers
    const sellOfferCount = await SellOffer.countDocuments();
    if (sellOfferCount === 0) {
      console.log(`[Seed] Populating initial sell offers...`);
      for (const offer of INITIAL_SELL_OFFERS) {
        await SellOffer.create(offer);
      }
      console.log(`[Seed] Initial sell offers populated!`);
    }

    console.log('[Seed] Database initialization and admin seeding completed successfully!');
  } catch (error: any) {
    console.error('[Seed] Error during seeding:', error.message);
  }
};

if (process.argv[1]?.includes('seed')) {
  (async () => {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  })();
}
