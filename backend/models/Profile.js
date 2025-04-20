const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  profilePicture: {
    type: String
  },
  bio: {
    type: String,
    maxLength: 500
  },
  education: [{
    institution: String,
    degree: String,
    field: String,
    startYear: Number,
    endYear: Number
  }],
  socialLinks: {
    linkedin: String,
    github: String,
    website: String
  }
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile; 