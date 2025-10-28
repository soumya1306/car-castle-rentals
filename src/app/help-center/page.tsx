'use client';

import React, { useState, useEffect } from 'react';
import { LuChevronDown, LuChevronUp, LuCircleHelp, LuPhone, LuMail, LuClock } from 'react-icons/lu';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Booking & Reservations
  {
    id: 1,
    category: "Booking & Reservations",
    question: "How do I make a reservation?",
    answer: "You can make a reservation by browsing our available cars on the website, selecting your preferred vehicle, choosing your rental dates, and requesting a call back. Our customer service team will then contact you to finalize the booking and answer any questions you may have."
  },
  {
    id: 2,
    category: "Booking & Reservations",
    question: "Can I modify or cancel my reservation?",
    answer: "Yes, you can modify or cancel your reservation up to 24 hours before your pickup time without any charges. For changes made within 24 hours, a small fee may apply. Contact our customer service for assistance."
  },
  {
    id: 3,
    category: "Booking & Reservations",
    question: "What information do I need to make a booking?",
    answer: "You'll need a valid driver's license, a credit card for payment and security deposit, and your contact information. International visitors may need an International Driving Permit."
  },
  
  // Pricing & Payment
  {
    id: 4,
    category: "Pricing & Payment",
    question: "What is included in the rental price?",
    answer: "The rental price includes basic insurance coverage, unlimited mileage within the city limits, and 24/7 roadside assistance. Fuel, additional insurance options, and extra equipment are charged separately."
  },
  {
    id: 5,
    category: "Pricing & Payment",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and digital payments. Cash payments are not accepted for security reasons."
  },
  {
    id: 6,
    category: "Pricing & Payment",
    question: "Is there a security deposit required?",
    answer: "Yes, a security deposit is required and varies by vehicle type. The deposit is temporarily held on your credit card and released within 5-7 business days after the car is returned in good condition."
  },
  
  // Vehicle & Features
  {
    id: 7,
    category: "Vehicle & Features",
    question: "What types of vehicles do you offer?",
    answer: "We offer a wide range of vehicles including economy cars, luxury sedans, SUVs, premium vehicles, and specialty cars. Each category has different features and pricing to suit various needs and budgets."
  },
  {
    id: 8,
    category: "Vehicle & Features",
    question: "Are the vehicles regularly maintained?",
    answer: "Yes, all our vehicles undergo regular maintenance checks and thorough cleaning between rentals. We ensure each car meets safety standards and is in excellent condition before rental."
  },
  {
    id: 9,
    category: "Vehicle & Features",
    question: "Can I request a specific car model?",
    answer: "While we can't guarantee a specific model, you can request one when booking. We'll do our best to accommodate your preference based on availability."
  },
  
  // Pickup & Return
  {
    id: 10,
    category: "Pickup & Return",
    question: "What do I need to bring for pickup?",
    answer: "Bring your valid driver's license, the credit card used for booking, and any additional documentation required (like International Driving Permit for international visitors)."
  },
  {
    id: 11,
    category: "Pickup & Return",
    question: "What happens if I return the car late?",
    answer: "Late returns are subject to additional charges. We offer a 30-minute grace period, after which you'll be charged for extra time. Returning more than 24 hours late may result in an additional day's rental charge."
  },
  {
    id: 12,
    category: "Pickup & Return",
    question: "Do you offer delivery and pickup services?",
    answer: "Yes, we offer vehicle delivery and pickup services within the city limits for an additional fee. This service must be arranged at the time of booking."
  },
  
  // Policies & Requirements
  {
    id: 13,
    category: "Policies & Requirements",
    question: "What is the minimum age to rent a car?",
    answer: "The minimum age to rent a car is 21 years. Drivers aged 21-24 may be subject to a young driver surcharge and have limited vehicle options for safety reasons."
  },
  {
    id: 14,
    category: "Policies & Requirements",
    question: "What is your fuel policy?",
    answer: "We operate on a 'full-to-full' fuel policy. You'll receive the car with a full tank and should return it with a full tank. If returned with less fuel, you'll be charged for refueling at premium rates."
  },
  {
    id: 15,
    category: "Policies & Requirements",
    question: "Are there any driving restrictions?",
    answer: "Vehicles should not be driven off-road, used for racing, or taken outside the designated rental area without prior approval. Smoking is prohibited in all vehicles."
  },
  
  // Insurance & Safety
  {
    id: 16,
    category: "Insurance & Safety",
    question: "What insurance coverage is included?",
    answer: "Basic insurance coverage is included, which covers liability and collision damage. We also offer additional coverage options for comprehensive protection and reduced deductibles."
  },
  {
    id: 17,
    category: "Insurance & Safety",
    question: "What should I do in case of an accident?",
    answer: "Ensure everyone's safety first, call emergency services if needed, contact our 24/7 support line, take photos of any damage, and obtain a police report if required. Don't admit fault or make settlements on the spot."
  },
  {
    id: 18,
    category: "Insurance & Safety",
    question: "What if the car breaks down?",
    answer: "Contact our 24/7 roadside assistance immediately. We'll either provide on-site repair or arrange for a replacement vehicle at no additional cost to you."
  }
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

const HelpCenter: React.FC = () => {
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleFAQ = (id: number) => {
    const newOpenFAQs = new Set(openFAQs);
    if (newOpenFAQs.has(id)) {
      newOpenFAQs.delete(id);
    } else {
      newOpenFAQs.add(id);
    }
    setOpenFAQs(newOpenFAQs);
  };

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  useEffect(() => {
    
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <LuCircleHelp className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions about our car rental services. 
            Can&apos;t find what you&apos;re looking for? Contact our support team.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Questions
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <section id='faq-section' className="space-y-4 mb-12">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="text-xs text-primary font-medium mb-1">
                    {faq.category}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {openFAQs.has(faq.id) ? (
                    <LuChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <LuChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openFAQs.has(faq.id) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Contact Support Section */}
        <section id="contact-support" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Still need help?
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Our support team is here to assist you with any questions or concerns.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone Support */}
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <LuPhone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-2">Call us for immediate assistance</p>
              <p className="font-medium text-primary">+1 (555) 123-4567</p>
            </div>

            {/* Email Support */}
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <LuMail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-2">Send us a detailed message</p>
              <p className="font-medium text-primary">help@carcastle.com</p>
            </div>

            {/* Hours */}
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <LuClock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support Hours</h3>
              <p className="text-gray-600 text-sm mb-2">We&apos;re here to help</p>
              <p className="font-medium text-gray-900">24/7 Available</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Contact Support Team
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpCenter;