const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  coverPhoto: { type: String },
  menu: [{ name: String, description: String, price: Number, photo: String }],
  events: [{ title: String, description: String, date: Date }],
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

RestaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
