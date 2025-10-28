import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailRequest {
  to?: string;
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

// Create a transporter for sending emails
const createTransporter = async () => {
  // Check if we have proper email credentials
  const hasCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;
  
  if (!hasCredentials) {
    console.log('📧 No email credentials found, using Ethereal Email for testing');
    
    // Create test account for development
    const testAccount = await nodemailer.createTestAccount();
    
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Production/Development with credentials
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify the transporter configuration
    await transporter.verify();
    console.log('📧 Gmail transporter verified successfully');
    return transporter;
    
  } catch (verifyError) {
    console.error('❌ Gmail verification failed:', verifyError);
    
    // Fallback to Ethereal Email if Gmail fails
    console.log('📧 Falling back to Ethereal Email for testing');
    const testAccount = await nodemailer.createTestAccount();
    
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }
};

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json();

    // Validate required fields
    if (!body.to || !body.subject || !body.message) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields. Required: to, subject, message",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.to)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address format" },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message too long. Maximum 2000 characters allowed.",
        },
        { status: 400 }
      );
    }

    // Create transporter and send email using Nodemailer
    const transporter = await createTransporter();

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER || '"Car Castle Rentals" <noreply@carcastle.com>',
      to: process.env.EMAIL_INQUIRY,
      subject: body.subject,
      text: body.message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #333; margin: 0;">Car Castle Rentals</h2>
              <hr style="border: none; border-top: 2px solid #007bff; width: 50px; margin: 10px auto;">
            </div>
            
            <div style="color: #555; line-height: 1.6; font-size: 16px;">
              ${body.message.replace(/\n/g, "<br>")}
            </div>
            
            ${
              body.name || body.email
                ? `
              <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px; border-left: 4px solid #007bff;">
                <h4 style="margin: 0 0 10px 0; color: #333;">Contact Information:</h4>
                ${
                  body.name
                    ? `<p style="margin: 5px 0;"><strong>Name:</strong> ${body.name}</p>`
                    : ""
                }
                ${
                  body.email
                    ? `<p style="margin: 5px 0;"><strong>Email:</strong> ${body.email}</p>`
                    : ""
                }
              </div>
            `
                : ""
            }
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #888; font-size: 14px; margin: 0;">
                This email was sent from Car Castle Rentals
              </p>
            </div>
          </div>
        </div>
      `,
    };

    try {
      // Send email using Nodemailer
      const info = await transporter.sendMail(mailOptions);

      console.log("📧 Email sent successfully:", {
        messageId: info.messageId,
        to: mailOptions.to,
        subject: mailOptions.subject,
        preview: process.env.NODE_ENV !== "production" ? nodemailer.getTestMessageUrl(info) : null,
        timestamp: new Date().toISOString(),
      });

      const response: EmailResponse = {
        success: true,
        message: "Email sent successfully via Nodemailer",
        messageId: info.messageId,
      };

      return NextResponse.json(response, { status: 200 });
    } catch (emailError) {
      console.error("Nodemailer error:", emailError);
      
      // If Gmail fails, try to create a fallback transporter and retry once
      try {
        console.log('🔄 Attempting fallback to Ethereal Email...');
        const testAccount = await nodemailer.createTestAccount();
        
        const fallbackTransporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const fallbackInfo = await fallbackTransporter.sendMail(mailOptions);
        
        console.log("📧 Email sent via fallback (Ethereal):", {
          messageId: fallbackInfo.messageId,
          previewURL: nodemailer.getTestMessageUrl(fallbackInfo),
          timestamp: new Date().toISOString(),
        });

        const response: EmailResponse = {
          success: true,
          message: "Email sent successfully via fallback service (Ethereal Email)",
          messageId: fallbackInfo.messageId,
        };

        return NextResponse.json(response, { status: 200 });
        
      } catch (fallbackError) {
        console.error("Fallback email also failed:", fallbackError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to send email via both primary and fallback services",
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "Email API endpoint is operational with Nodemailer integration",
      configuration: {
        environment: process.env.NODE_ENV,
        emailService:
          process.env.NODE_ENV === "production"
            ? "Gmail/Production"
            : "Ethereal Email (Development)",
        features: [
          "HTML emails",
          "Text emails",
          "Contact information formatting",
        ],
      },
      usage: {
        method: "POST",
        endpoint: "/api/send-email",
        requiredFields: ["to", "subject", "message"],
        optionalFields: ["from", "name", "phone"],
        example: {
          to: "customer@example.com",
          subject: "Welcome to Car Castle Rentals",
          message:
            "Thank you for choosing our service!\n\nWe appreciate your business.",
          name: "John Doe",
          phone: "+1234567890",
        },
      },
      environmentVariables: {
        production: ["EMAIL_USER", "EMAIL_PASSWORD"],
        development: "Uses Ethereal Email (no config needed)",
      },
    },
    { status: 200 }
  );
}
