import { Schema, model, models } from 'mongoose';

const carSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageArray: {
    type: [String],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Hatchback', 'SUV', 'MPV', 'Sedan'] // Based on the data provided
  },
  seating_capacity: {
    type: Number,
    required: true,
  },
  fuel_type: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Hybrid'] // Based on the data provided
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Manual', 'Automatic']
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isAvaliable: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['regular', 'premium']
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true // This will add createdAt and updatedAt fields automatically
});

// Check if the model exists before creating a new one to prevent overwriting
const Car = models.Car || model('Car', carSchema);

export default Car;