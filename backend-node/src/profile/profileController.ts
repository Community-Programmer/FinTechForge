import { Request, Response } from 'express';
import User from './User';

// GET /api/v1/profile
export const getProfile = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/v1/profile
export const updateProfile = async (req: any, res: any) => {
  try {
    const updates = {
      name: req.body.name,
      bio: req.body.bio,
      avatarUrl: req.body.avatarUrl,
    };
    const user = await User.findByIdAndUpdate(req.user?.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};