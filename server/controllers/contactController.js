import ContactMessage from '../models/ContactMessage.js';

// In-memory message store fallback
const memoryMessages = [];

export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Subject, Message)',
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const ipAddress = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

    let savedMessage = null;
    try {
      savedMessage = await ContactMessage.create({
        name,
        email,
        subject,
        message,
        ipAddress,
        status: 'new',
      });
    } catch (e) {
      console.warn('[Contact] Saved message to in-memory store:', e.message);
      savedMessage = {
        _id: 'msg_' + Date.now(),
        name,
        email,
        subject,
        message,
        ipAddress,
        status: 'new',
        createdAt: new Date(),
      };
      memoryMessages.unshift(savedMessage);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you soon.',
      data: {
        id: savedMessage._id,
        name: savedMessage.name,
        subject: savedMessage.subject,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getContactMessages = async (req, res, next) => {
  try {
    let messages = [];
    try {
      messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    } catch (e) {
      messages = memoryMessages;
    }

    res.json({
      success: true,
      total: messages.length,
      unreadCount: messages.filter((m) => m.status === 'new').length,
      data: messages,
    });
  } catch (err) {
    next(err);
  }
};

export const updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    let message = null;
    try {
      message = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
    } catch (e) {
      const idx = memoryMessages.findIndex((m) => m._id === id);
      if (idx !== -1) {
        memoryMessages[idx].status = status;
        message = memoryMessages[idx];
      }
    }

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({
      success: true,
      message: `Message marked as ${status}`,
      data: message,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    let deleted = false;

    try {
      const msg = await ContactMessage.findByIdAndDelete(id);
      if (msg) deleted = true;
    } catch (e) {
      const idx = memoryMessages.findIndex((m) => m._id === id);
      if (idx !== -1) {
        memoryMessages.splice(idx, 1);
        deleted = true;
      }
    }

    res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
