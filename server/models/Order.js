const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  signingType: {
    type: String,
    required: true,
    enum: ['Purchase', 'Refinance', 'HELOC', 'Other']
  },
  fee: {
    type: Number,
    required: true
  },
  appointment: {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },
  signer: {
    name: {
      type: String,
      required: true
    },
    email: String,
    phone: String,
    language: {
      type: String,
      default: 'English'
    }
  },
  pointOfContact: {
    name: String,
    email: String,
    phone: String,
    company: String
  },
  instructions: {
    type: String,
    required: true
  },
  additionalInstructions: String,
  confirmationDetails: {
    confirmedAt: Date,
    confirmedBy: String,
    notes: String,
    messageLeft: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
orderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create index for location-based queries
orderSchema.index({ 'appointment.location': '2dsphere' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 