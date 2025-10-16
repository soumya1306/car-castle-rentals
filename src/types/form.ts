/**
 * Type definitions for car rental form data
 */

export interface RentalFormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  driverLicense: string;

  // Rental Details
  startDate: string;  // ISO date string
  endDate: string;    // ISO date string
  pickupLocation: string;
  dropoffLocation: string;

  // Additional Options
  addInsurance: boolean;
  additionalDriver: boolean;
  gpsNavigation: boolean;
  childSeat: boolean;

  // Payment Information (you might want to handle this separately for security)
  paymentMethod: 'credit' | 'debit' | 'upi';

  // Optional Fields
  specialRequests?: string;
  promoCode?: string;
}

/**
 * Type for form validation errors
 */
export interface RentalFormErrors {
  [key: string]: string;
}

/**
 * Type for form field validation state
 */
export interface RentalFormValidation {
  isValid: boolean;
  errors: RentalFormErrors;
}

/**
 * Type for initial form state
 */
export const initialRentalFormData: RentalFormData = {
  fullName: '',
  email: '',
  phone: '',
  driverLicense: '',
  startDate: '',
  endDate: '',
  pickupLocation: '',
  dropoffLocation: '',
  addInsurance: false,
  additionalDriver: false,
  gpsNavigation: false,
  childSeat: false,
  paymentMethod: 'credit',
  specialRequests: '',
  promoCode: ''
};

export interface RequestCallbackForm {
  pickupDate: string;
  returnDate: string;
  contactNumber: string;
}