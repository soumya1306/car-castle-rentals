"use client";

import Title from "@/components/Title";

export default function PrivacyPolicy() {
  return (
    <div className="">
      {/* Header Section */}
      <div className="w-full bg-primary py-20 mb-10">
        <Title
          title="Privacy Policy"
          subtitle="Your privacy is important to us. Learn how we collect, use, and protect your personal information."
          color="white"
        />
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="prose prose-gray max-w-none">
          
          {/* Last Updated */}
          <div className="mb-8 p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600 mb-0">
              <strong>Last Updated:</strong> October 29, 2025
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-7 mb-4">
              Welcome to Car Castle Rentals (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website, use our services, 
              or rent vehicles from us. Please read this privacy policy carefully.
            </p>
            <p className="text-gray-700 leading-7">
              By using our services, you agree to the collection and use of information in accordance 
              with this policy. If you do not agree with our policies and practices, do not use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 leading-7 mb-4">We may collect the following personal information:</p>
            <ul className="list-disc list-inside text-gray-700 leading-7 mb-4 ml-4">
              <li>Name, email address, and phone number</li>
              <li>Driver&apos;s license information and driving record</li>
              <li>Payment information (credit/debit card details)</li>
              <li>Address and location information</li>
              <li>Age and date of birth for rental eligibility</li>
              <li>Emergency contact information</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatic Information</h3>
            <p className="text-gray-700 leading-7 mb-4">We automatically collect certain information when you visit our website:</p>
            <ul className="list-disc list-inside text-gray-700 leading-7 mb-4 ml-4">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website and search terms</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Vehicle and Rental Information</h3>
            <ul className="list-disc list-inside text-gray-700 leading-7 mb-4 ml-4">
              <li>Rental dates and locations</li>
              <li>Vehicle preferences and rental history</li>
              <li>GPS location data (when using our vehicles)</li>
              <li>Fuel usage and mileage information</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-7 mb-4">We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-700 leading-7 mb-4 ml-4">
              <li>Process and manage your vehicle rental reservations</li>
              <li>Verify your identity and driving eligibility</li>
              <li>Process payments and prevent fraud</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send booking confirmations and rental updates</li>
              <li>Improve our services and website functionality</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Send promotional offers and marketing communications (with consent)</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-7 mb-4">We may share your information in the following circumstances:</p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
            <p className="text-gray-700 leading-7 mb-4">
              We may share information with third-party service providers who help us operate our business, 
              including payment processors, background check providers, and maintenance services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Legal Requirements</h3>
            <p className="text-gray-700 leading-7 mb-4">
              We may disclose information when required by law, court order, or government authority, 
              or to protect our rights, property, or safety.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Insurance and Claims</h3>
            <p className="text-gray-700 leading-7 mb-4">
              In case of accidents or insurance claims, we may share relevant information with 
              insurance companies and legal authorities.
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-7 mb-4">
              We implement appropriate technical and organizational security measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction. 
              These measures include:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-7 mb-4 ml-4">
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing systems</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and employee training</li>
              <li>Data backup and recovery procedures</li>
            </ul>
            <p className="text-gray-700 leading-7">
              However, no method of transmission over the internet or electronic storage is 100% secure. 
              We cannot guarantee absolute security of your information.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">6. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-7 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-gray-700 leading-7 mb-4 ml-4">
              <li><strong>Access:</strong> Request access to your personal information we hold</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
            </ul>
            <p className="text-gray-700 leading-7">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-7 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience. 
              Cookies are small data files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-7 mb-4 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve website security and functionality</li>
            </ul>
            <p className="text-gray-700 leading-7">
              You can control cookie settings through your browser preferences. However, disabling 
              cookies may limit some website functionality.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">8. Data Retention</h2>
            <p className="text-gray-700 leading-7 mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes 
              outlined in this privacy policy, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-7 mb-4 ml-4">
              <li>Active rental agreements and related services</li>
              <li>Legal and regulatory compliance requirements</li>
              <li>Legitimate business interests and dispute resolution</li>
              <li>Tax and accounting obligations</li>
            </ul>
            <p className="text-gray-700 leading-7">
              When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">9. Third-Party Links</h2>
            <p className="text-gray-700 leading-7">
              Our website may contain links to third-party websites or services. We are not responsible 
              for the privacy practices or content of these external sites. We encourage you to review 
              the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-7">
              Our services are not intended for individuals under 18 years of age. We do not knowingly 
              collect personal information from children. If you believe we have inadvertently collected 
              information from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-7">
              We may update this privacy policy from time to time to reflect changes in our practices 
              or legal requirements. We will notify you of any material changes by posting the updated 
              policy on our website and updating the &quot;Last Updated&quot; date. Your continued use of our 
              services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-7 mb-4">
              If you have any questions, concerns, or requests regarding this privacy policy or 
              our data practices, please contact us:
            </p>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Car Castle Rentals</h3>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@carcastlerentals.com</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 8698503094</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> Car Castle Rentals Headquarters</p>
              <p className="text-gray-700">India</p>
            </div>
          </section>

          {/* Agreement */}
          <section className="mb-8">
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <p className="text-primary font-medium mb-2">Agreement to Privacy Policy</p>
              <p className="text-primary/70 text-sm leading-6">
                By using Car Castle Rentals services, you acknowledge that you have read, 
                understood, and agree to be bound by this Privacy Policy. If you do not 
                agree with this policy, please do not use our services.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}