import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const { verifyToken } = await import('@/utils/auth');
    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    const formData = await request.formData();
    const file = formData.get("file");
    const filename = formData.get("filename");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!filename || typeof filename !== "string") {
      return NextResponse.json(
        { error: "No filename provided" },
        { status: 400 }
      );
    }

    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true // Prevents naming conflicts
    });

    return NextResponse.json({
      url: blob.url,
      success: true
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// Generate a URL for the uploaded file
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: `${process.env.NEXT_PUBLIC_BLOB_URL}/${filename}`
    });
  } catch (error) {
    console.error("URL generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate URL" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const { verifyToken } = await import('@/utils/auth');
    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    const { imageUrl } = await request.json();

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // Delete the image from Vercel Blob storage
    await del(imageUrl);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully"
    });
  } catch (error) {
    console.error("Image deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}