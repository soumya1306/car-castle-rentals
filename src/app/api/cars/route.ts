import mongoose from 'mongoose';
import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";
import { Car } from "@/types/car";

/**
 * Handles GET requests to fetch cars from the database
 * 
 * @param request - Next.js request object containing query parameters
 * @returns NextResponse with cars data or error message
 * 
 * @example
 * // Fetch all cars
 * GET /api/cars
 * 
 * @example
 * // Fetch premium cars that are available
 * GET /api/cars?type=premium&isAvailable=true
 */
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("car_castle_data");

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const query: Record<string, string | boolean | mongoose.Types.ObjectId> = {};

    // Add filters based on search parameters
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const isAvailable = searchParams.get('isAvailable');
    const _id = searchParams.get('_id');

    if (brand) query.brand = brand;
    if (category) query.category = category;
    if (type) query.type = type;
    if (isAvailable) query.isAvailable = isAvailable === 'true';
    if (_id) {
      try {
        query._id = new mongoose.Types.ObjectId(_id);
        console.log('Searching for car with ID:', _id);
        console.log('MongoDB query:', query);
      } catch (err) {
        console.error('ObjectId creation error:', err);
        console.error('Invalid ObjectId:', _id);
        return NextResponse.json(
          { error: 'Invalid car ID format' },
          { status: 400 }
        );
      }
    }

    const cars = await db.collection("car_data").find(query).sort({ createdAt: -1 }).toArray();
    console.log('Found cars:', cars.length);
    return NextResponse.json({ cars }, { status: 200 });
  } catch (err) {
    console.error('GET /api/cars error:', err);
    const error = err instanceof Error ? err.message : "Failed to fetch cars";
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to create a new car entry
 * 
 * @param request - Next.js request object containing the car data in the body
 * @returns NextResponse with created car data or error message
 * 
 * @throws {Error} When required fields are missing
 * @throws {mongoose.Error.ValidationError} When MongoDB validation fails
 * 
 * @example
 * POST /api/cars
 * Body: {
 *   brand: "Toyota",
 *   model: "Camry",
 *   // ... other required fields
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("car_castle_data");

    const body = await request.json();
    
    // Validate required fields
    const requiredFields: (keyof Car)[] = [
      'brand', 'model', 'image', 'imageArray', 'year', 'category',
      'seating_capacity', 'fuel_type', 'transmission', 'pricePerDay',
      'location', 'description', 'type'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Create new car document
    const result = await db.collection("car_data").insertOne(body);
    
    if (!result.insertedId) {
      throw new Error("Failed to insert car into database");
    }

    return NextResponse.json({
      message: "Car added successfully",
      car: { ...body, _id: result.insertedId }
    }, { status: 201 });
  } catch (err) {
    console.error('POST /api/cars error:', err);
    
    // Handle MongoDB validation errors
    if (err instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: err.message },
        { status: 400 }
      );
    }
    
    // Handle other errors
    const error = err instanceof Error ? err.message : "Failed to add car";
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}