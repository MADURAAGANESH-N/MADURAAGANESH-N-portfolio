import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET || 'dev_fallback_secret_key_32_chars_min',
    { expiresIn: '7d' }
  );
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const defaultAdminEmail = process.env.ADMIN_EMAIL || 'nmaduraaganesh@gmail.com';
    const defaultAdminPass = process.env.ADMIN_PASSWORD || 'Admin@ZohoAI2026';

    let user = null;
    try {
      user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    } catch (e) {
      console.warn('[Auth] DB lookup fallback:', e.message);
    }

    let isMatch = false;
    let userId = 'admin-default-id';
    let userName = 'Maduraaganesh N.';
    let userEmail = email.toLowerCase();

    if (user) {
      isMatch = await user.matchPassword(password);
      userId = user._id;
      userName = user.name;
      userEmail = user.email;
    } else if (email.toLowerCase() === defaultAdminEmail.toLowerCase() && password === defaultAdminPass) {
      // Fallback valid check for initial login before/without seeding
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Check email and password.',
      });
    }

    const token = generateToken(userId, userEmail, 'admin');

    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      user: {
        id: userId,
        name: userName,
        email: userEmail,
        role: 'admin',
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutAdmin = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};
