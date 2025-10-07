import { list, head } from "@vercel/blob";
import { NextResponse } from "next/server";

// GET endpoint to list all images
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix'); // optional prefix to filter images
    
    // List all blobs with the given prefix
    const { blobs } = await list({
      prefix: prefix || 'car-', // default to car- prefix if none provided
    });

    return NextResponse.json({
      images: blobs.map(blob => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      }))
    });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Failed to fetch images";
    return NextResponse.json({ error }, { status: 500 });
  }
}

// GET specific image metadata
export async function HEAD(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    const blob = await head(url);

    if (!blob) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Failed to fetch image metadata";
    return NextResponse.json({ error }, { status: 500 });
  }
}