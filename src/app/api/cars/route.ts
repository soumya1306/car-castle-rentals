import mongoose from 'mongoose';
import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";
import { Car } from "@/types/car";
import { deleteImagesFromVercelBlob } from "@/utils/uploadImages";

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
    
    // Remove any client-provided _id (MongoDB will generate its own)
    const { _id, ...carDataWithoutId } = body;
    
    // Validate required fields
    const requiredFields: (keyof Omit<Car, '_id'>)[] = [
      'brand', 'model', 'image', 'imageArray', 'year', 'category',
      'seating_capacity', 'fuel_type', 'transmission', 'pricePerDay',
      'location', 'description', 'type'
    ];

    const missingFields = requiredFields.filter(field => !carDataWithoutId[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Add creation timestamp
    const carDocument = {
      ...carDataWithoutId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create new car document (MongoDB will auto-generate ObjectId)
    const result = await db.collection("car_data").insertOne(carDocument);
    
    if (!result.insertedId) {
      throw new Error("Failed to insert car into database");
    }

    console.log('Car created successfully with ID:', result.insertedId);

    return NextResponse.json({
      message: "Car added successfully",
      car: { 
        ...carDocument, 
        _id: result.insertedId.toString() // Convert ObjectId to string for client
      }
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

/**
 * Handles PUT requests to update an existing car
 * 
 * @param request - Next.js request object containing the car data and ID
 * @returns NextResponse with updated car data or error message
 * 
 * @throws {Error} When car ID is missing or invalid
 * @throws {Error} When car is not found
 * 
 * @example
 * PUT /api/cars
 * Body: {
 *   _id: "car_id_here",
 *   brand: "Updated Toyota",
 *   model: "Updated Camry",
 *   // ... other fields to update
 * }
 */
export async function PUT(request: NextRequest) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("car_castle_data");

    const body = await request.json();
    const { _id, ...updateData } = body;

    // Validate car ID
    if (!_id) {
      return NextResponse.json(
        { error: 'Car ID is required for updating' },
        { status: 400 }
      );
    }

    let objectId: mongoose.Types.ObjectId;
    try {
      objectId = new mongoose.Types.ObjectId(_id);
    } catch (err) {
      console.error('Invalid ObjectId:', _id);
      return NextResponse.json(
        { error: 'Invalid car ID format', err },
        { status: 400 }
      );
    }

    // Check if car exists
    const existingCar = await db.collection("car_data").findOne({ _id: objectId });
    if (!existingCar) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Add updated timestamp
    const carUpdateData = {
      ...updateData,
      updatedAt: new Date()
    };

    // Update the car
    const result = await db.collection("car_data").updateOne(
      { _id: objectId },
      { $set: carUpdateData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'No changes were made to the car' },
        { status: 400 }
      );
    }

    // Fetch the updated car
    const updatedCar = await db.collection("car_data").findOne({ _id: objectId });

    return NextResponse.json({
      message: "Car updated successfully",
      car: updatedCar
    }, { status: 200 });
  } catch (err) {
    console.error('PUT /api/cars error:', err);
    
    // Handle MongoDB validation errors
    if (err instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: err.message },
        { status: 400 }
      );
    }
    
    // Handle other errors
    const error = err instanceof Error ? err.message : "Failed to update car";
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}

/**
 * Handles DELETE requests to remove a car from the database
 * 
 * @param request - Next.js request object containing query parameters
 * @returns NextResponse with success message or error
 * 
 * @example
 * // Delete a car by ID
 * DELETE /api/cars?_id=507f1f77bcf86cd799439011
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get the car ID from query parameters
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('_id');

    // Validate car ID
    if (!_id) {
      return NextResponse.json(
        { error: 'Car ID is required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("car_castle_data");

    // Convert string ID to ObjectId
    let objectId: mongoose.Types.ObjectId;
    try {
      objectId = new mongoose.Types.ObjectId(_id);
      console.log('Deleting car with ID:', _id);
    } catch (err) {
      console.error('Invalid ObjectId:', _id);
      return NextResponse.json(
        { error: 'Invalid car ID format' },
        { status: 400 }
      );
    }

    // Check if car exists before deletion
    const existingCar = await db.collection("car_data").findOne({ _id: objectId });
    
    if (!existingCar) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Collect all image URLs that need to be deleted
    const imagesToDelete: string[] = [];
    if (existingCar.image) {
      imagesToDelete.push(existingCar.image);
    }
    if (existingCar.imageArray && Array.isArray(existingCar.imageArray)) {
      imagesToDelete.push(...existingCar.imageArray);
    }

    // Delete images from Vercel Blob storage first (before deleting from database)
    if (imagesToDelete.length > 0) {
      console.log('Deleting images from Vercel Blob storage:', imagesToDelete.length);
      try {
        await deleteImagesFromVercelBlob(imagesToDelete);
        console.log('Images deleted successfully from Vercel Blob storage');
      } catch (imageError) {
        console.warn('Warning: Some images may not have been deleted from storage:', imageError);
        // Continue with car deletion even if image deletion fails
      }
    }

    // Delete the car from database
    const deleteResult = await db.collection("car_data").deleteOne({ _id: objectId });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Failed to delete car' },
        { status: 500 }
      );
    }

    console.log('Car deleted successfully:', _id);

    // Return success response with deleted car data
    return NextResponse.json({
      success: true,
      message: 'Car deleted successfully',
      deletedCar: {
        _id: _id,
        brand: existingCar.brand,
        model: existingCar.model,
        year: existingCar.year
      }
    }, { status: 200 });

  } catch (err) {
    console.error('DELETE /api/cars error:', err);
    
    // Handle specific MongoDB errors
    if (err instanceof Error) {
      if (err.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Database connection timeout. Please try again.' },
          { status: 504 }
        );
      }
    }

    const error = err instanceof Error ? err.message : "Failed to delete car";
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}