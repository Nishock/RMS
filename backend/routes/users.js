const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const User = require('../models/User');

// Get all users (Admin only)
router.get('/', auth, checkRole(['admin']), async (req, res) => {
    try {
        const { role } = req.query;
        const query = role ? { role } : {};
        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create new user (Admin only)
router.post('/', auth, checkRole(['admin']), async (req, res) => {
    try {
        const { name, email, phone, password, role, rollNumber, teacherId } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if rollNumber or teacherId already exists
        if (role === 'student') {
            const existingStudent = await User.findOne({ rollNumber });
            if (existingStudent) {
                return res.status(400).json({ message: 'Roll number already exists' });
            }
        } else if (role === 'teacher') {
            const existingTeacher = await User.findOne({ teacherId });
            if (existingTeacher) {
                return res.status(400).json({ message: 'Teacher ID already exists' });
            }
        }

        // Create new user
        user = new User({
            name,
            email,
            phone,
            password,
            role,
            rollNumber,
            teacherId
        });

        await user.save();

        // Return user data without password
        const userData = user.toObject();
        delete userData.password;
        res.status(201).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update user (Admin only)
router.put('/:id', auth, checkRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Remove sensitive fields from updates
        delete updates.password;
        delete updates.role;
        delete updates.email;

        const user = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete user (Admin only)
router.delete('/:id', auth, checkRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 