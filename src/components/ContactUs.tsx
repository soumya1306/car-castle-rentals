"use client";

import { sendContactFormEmail } from "@/utils/emailService";
import SpinLoader from "./loaders/SpinLoader";
import { useState } from "react";

export default function ContactUsSection() {
  const [submitSource, setSubmitSource] = useState<"whatsapp" | "email">();
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleSubmitForm = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (submitSource === "email") {
      setEmailLoading(true);
      setEmailSuccess(false);
      
      try {
        const response = await sendContactFormEmail({ name, email, message });
        if (response.success) {
          setEmailSuccess(true);
          // Hide success message after 5 seconds
          setTimeout(() => {
            setEmailSuccess(false);
          }, 5000);
        }
      } catch (error) {
        console.error('Email sending failed:', error);
        // You could add error state here if needed
      } finally {
        setEmailLoading(false);
      }
      
      return;
    }

    // WhatsApp functionality
    if (submitSource === "whatsapp") {
      // Create WhatsApp message
      const whatsappMessage = `Hello! I\'m interested in Car Castle Rentals.

*Name:* ${name}
*Email:* ${email}

*Message:*
${message}

Please get back to me at your earliest convenience. Thank you!`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Car Castle Rentals WhatsApp number
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918895989070";
      
      // Debug logging for production issues
      console.log("WhatsApp Number:", whatsappNumber);
      
      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Additional validation
      if (!whatsappNumber || whatsappNumber === "undefined") {
        console.error("WhatsApp number is not properly configured");
        alert("WhatsApp configuration error. Please try the email option or contact us directly at +91 8698503094");
        return;
      }
      
      console.log("WhatsApp URL:", whatsappURL);
      
      // Open WhatsApp in a new tab
      window.open(whatsappURL, '_blank');
      
    }
  };
  return (
    <form
      className="flex flex-col items-center text-sm"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmitForm(formData);
      }}
    >
      <h1 className="text-[40px] font-semibold pb-4">Get in touch with us</h1>
      <p className="text-[16px] text-gray-500 text-center pb-10">
        Have questions or need assistance? We&apos;re here to help! Fill out the form{" "}
        <br />
        below, and our team will get back to you as soon as possible.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            Your Name
          </label>
          <input
            className="h-12 p-2 mt-2 w-full bg-white border border-gray-500/30 rounded outline-none focus:border-indigo-300"
            type="text"
            required
            name="name"
            id="name"
          />
        </div>
        <div className="w-full">
          <label className="text-black/70" htmlFor="name">
            Your Email
          </label>
          <input
            className="h-12 p-2 mt-2 w-full border bg-white border-gray-500/30 rounded outline-none focus:border-indigo-300"
            type="email"
            required
            name="email"
            id="email"
          />
        </div>
      </div>

      <div className="mt-6 w-[350px] md:w-[700px]">
        <label className="text-black/70" htmlFor="name">
          Message
        </label>
        <textarea
          className="w-full mt-2 p-2 h-40 border bg-white border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300"
          required
          name="message"
          id="message"
        ></textarea>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button
          type="submit"
          onClick={() => setSubmitSource("whatsapp")}
          className="bg-green-600 hover:bg-green-700 text-[16px] text-white h-12 w-64 px-4 rounded active:scale-95 transition flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Contact via WhatsApp
        </button>
        
        <button
          type="submit"
          onClick={() => setSubmitSource("email")}
          disabled={emailLoading}
          className="bg-primary hover:bg-primary/90 text-[16px] text-white h-12 w-64 px-4 rounded active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send Email
        </button>
      </div>

      {/* Loading State */}
      {emailLoading && (
        <div className="flex items-center justify-center gap-3 mt-6 p-4 bg-blue-50 rounded-lg">
          <SpinLoader size={24} />
          <span className="text-blue-600 font-medium">Sending your message...</span>
        </div>
      )}

      {/* Success Message */}
      {emailSuccess && (
        <div className="flex items-center gap-3 mt-6 p-4 bg-green-50 rounded-lg">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-green-600 font-medium">
            Email sent successfully! We&apos;ll get back to you soon.
          </span>
        </div>
      )}
    </form>
  );
}
