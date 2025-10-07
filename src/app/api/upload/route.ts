import { put } from "@vercel/blob";
import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const filename = formData.get("filename") as string;

  try {
    // Handle the upload using Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({
      url: blob.url,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// GET endpoint to generate a presigned URL for client-side uploads
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const searchParams = new URL(request.url).searchParams;
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    const response = await handleUpload({
      callbackUrl: "/api/upload",
      filename,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}