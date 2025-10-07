import { NextRequest, NextResponse } from "next/server";

import cars from "@/data/cars";

// Example data - replace with your database

export async function GET() {
  try {
    return NextResponse.json({ cars }, { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Failed to fetch cars";
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate body here
    cars.push({ ...body, id: cars.length + 1 });
    return NextResponse.json({ message: "Car added successfully" }, { status: 201 });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Failed to add car";
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}