import { Router, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { protect, adminOnly, AuthRequest } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dawood_heavy_equipment_secret_key_2026_super_secure';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register a new client/buyer
router.post('/register', async (req, res: Response): Promise<void> => {
  try {
    const { name, email, password, company, phone, country, destinationPort } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ success: false, message: 'Please provide name, email and password' });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'An account with this email already exists' });
      return;
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password,
      company: company || 'Enterprise Commercial Buyer',
      phone: phone || '+1 (555) 000-0000',
      country: country || 'United States',
      role: 'buyer', // Real registration creates buyer; admin is seeded or granted
      destinationPort: destinationPort || 'Direct Inland Delivery'
    });

    const token = generateToken(newUser._id.toString(), newUser.role);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company,
        phone: newUser.phone,
        country: newUser.country,
        destinationPort: newUser.destinationPort,
        consigneeDetails: newUser.consigneeDetails
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get JWT token (determines role: admin or buyer)
router.post('/login', async (req, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please provide email and password' });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    if (user.status === 'suspended') {
      res.status(403).json({ success: false, message: 'This account has been suspended by dealership administration' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user._id.toString(), user.role);

    res.json({
      success: true,
      message: `Welcome back, ${user.name}`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        phone: user.phone,
        country: user.country,
        destinationPort: user.destinationPort,
        consigneeDetails: user.consigneeDetails
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get currently authenticated user's profile
router.get('/me', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve profile', error: error.message });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update current user profile and consignee customs information
router.put('/profile', protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { company, phone, country, destinationPort, consigneeDetails } = req.body;
    
    const updateFields: any = {};
    if (company !== undefined) updateFields.company = company;
    if (phone !== undefined) updateFields.phone = phone;
    if (country !== undefined) updateFields.country = country;
    if (destinationPort !== undefined) updateFields.destinationPort = destinationPort;
    if (consigneeDetails !== undefined) updateFields.consigneeDetails = consigneeDetails;

    const updatedUser = await User.findByIdAndUpdate(
      req.user!._id,
      { $set: updateFields },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile and consignee details saved successfully',
      user: updatedUser
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update profile', error: error.message });
  }
});

// @route   GET /api/auth/users
// @desc    Admin only: Get all registered users in system
router.get('/users', protect, adminOnly, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
});

// @route   PATCH /api/auth/users/:id/role
// @desc    Admin only: Change user role (buyer <-> admin)
router.patch('/users/:id/role', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { role } = req.body;
    if (!['buyer', 'admin'].includes(role)) {
      res.status(400).json({ success: false, message: 'Invalid role. Must be "buyer" or "admin"' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.json({ success: true, message: `User role updated to ${role}`, user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update role', error: error.message });
  }
});

// @route   PATCH /api/auth/users/:id/status
// @desc    Admin only: Change user status (active <-> suspended)
router.patch('/users/:id/status', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    if (!['active', 'suspended'].includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status. Must be "active" or "suspended"' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.json({ success: true, message: `User status changed to ${status}`, user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update user status', error: error.message });
  }
});

// @route   POST /api/auth/users/create
// @desc    Admin only: Create a new user with specified role
router.post('/users/create', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password, company, phone, country, destinationPort, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Name, email and password are required' });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'An account with this email already exists' });
      return;
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password,
      company: company || 'Dawood Equipment Co.',
      phone: phone || '+1 (630) 379-9175',
      country: country || 'United States',
      role: role === 'admin' ? 'admin' : 'buyer',
      destinationPort: destinationPort || 'Direct Inland Delivery'
    });

    res.status(201).json({
      success: true,
      message: `User "${name}" created successfully as ${newUser.role}`,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company,
        phone: newUser.phone,
        country: newUser.country,
        status: newUser.status,
        destinationPort: newUser.destinationPort
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
  }
});

export default router;

