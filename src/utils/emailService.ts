interface SendEmailData {
  to: string;
  subject: string;
  message: string;
  from?: string;
  name?: string;
  email?: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

/**
 * Send an email using the internal email API
 * @param emailData - The email data to send
 * @returns Promise with the API response
 */
export async function sendEmail(emailData: SendEmailData): Promise<EmailResponse> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result: EmailResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Send a contact form email to support
 * @param formData - Contact form data
 * @returns Promise with the API response
 */
export async function sendContactFormEmail(formData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<EmailResponse> {
  const emailContent = `
Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}

Subject: ${'Reaching for support'}

Message:
${formData.message}

---
Sent via Car Castle Rentals Contact Form
Time: ${new Date().toLocaleString()}
  `.trim();

  return sendEmail({
    to: process.env.EMAIL_INQUIRY || "carcastlegoa@gmail.com",
    subject: `Contact Form: Reaching for support`,
    message: emailContent,
    from: formData.email,
    name: formData.name,
    email: formData.email,
  });
}

/**
 * Send a booking inquiry email
 * @param inquiryData - Booking inquiry data
 * @returns Promise with the API response
 */
export async function sendBookingInquiry(inquiryData: {
  customerPhone?: string;
  carModel: string;
  carBrand?: string;
  carCategory?: string;
  pricePerDay?: number;
  pickupDate: string;
  returnDate: string;
  location?: string;
  contactNumber?: string;
  message?: string;
}): Promise<EmailResponse> {
  const emailContent = `
New Booking Inquiry

Customer Details:
- Phone: ${inquiryData.customerPhone || inquiryData.contactNumber || 'Not provided'}

Vehicle Details:
- Vehicle: ${inquiryData.carModel}${inquiryData.carBrand ? ` (${inquiryData.carBrand})` : ''}
- Category: ${inquiryData.carCategory || 'Not specified'}
- Price: ${inquiryData.pricePerDay ? `Rs.${inquiryData.pricePerDay}/day` : 'Not specified'}

Booking Details:
- Pickup Date: ${inquiryData.pickupDate}
- Return Date: ${inquiryData.returnDate}
- Delivery Location: ${inquiryData.location || 'Not specified'}

${inquiryData.message ? `Additional Message:\n${inquiryData.message}` : ''}

---
Sent via Car Castle Rentals Website
Time: ${new Date().toLocaleString()}
  `.trim();

  return sendEmail({
    to: process.env.EMAIL_INQUIRY || "carcastlegoa@gmail.com",
    subject: `Booking Inquiry - ${inquiryData.carModel}`,
    message: emailContent,
  });
}

/**
 * Send a confirmation email to customer
 * @param confirmationData - Confirmation email data
 * @returns Promise with the API response
 */
export async function sendBookingConfirmation(confirmationData: {
  customerEmail: string;
  customerName: string;
  carModel: string;
  pickupDate: string;
  returnDate: string;
  bookingReference: string;
}): Promise<EmailResponse> {
  const emailContent = `
Dear ${confirmationData.customerName},

Thank you for your booking inquiry with Car Castle Rentals!

Booking Reference: ${confirmationData.bookingReference}

Rental Details:
- Vehicle: ${confirmationData.carModel}
- Pickup Date: ${confirmationData.pickupDate}
- Return Date: ${confirmationData.returnDate}

Our team will contact you within 24 hours to confirm availability and finalize your booking details.

If you have any questions, please don't hesitate to contact us:
- Phone: +1 (555) 123-4567
- Email: support@carcastle.com

Best regards,
The Car Castle Rentals Team

---
This is an automated confirmation email.
  `.trim();

  return sendEmail({
    to: confirmationData.customerEmail,
    subject: `Booking Confirmation - ${confirmationData.bookingReference}`,
    message: emailContent,
    from: 'noreply@carcastle.com',
    name: 'Car Castle Rentals',
  });
}