# Cars API Documentation

This document outlines the API endpoints for managing cars in the Car Castle Rentals application.

## Base URL
```
/api/cars
```

## Endpoints

### GET /api/cars
Retrieves a list of cars based on the provided query parameters.

#### Query Parameters
| Parameter    | Type    | Description                                                      |
|-------------|---------|------------------------------------------------------------------|
| brand       | string  | Filter cars by brand name                                        |
| category    | string  | Filter by vehicle category (Hatchback, SUV, MPV, Sedan, etc.)   |
| type        | string  | Filter by car type (regular, premium, luxury)                    |
| isAvailable | boolean | Filter by availability status                                    |
| _id         | string  | Retrieve a specific car by its MongoDB ObjectId                  |

#### Example Requests
```http
# Get all cars
GET /api/cars

# Get available premium cars
GET /api/cars?type=premium&isAvailable=true

# Get a specific car by ID
GET /api/cars?_id=65123456789abcdef1234567
```

#### Response
```typescript
{
  cars: Array<{
    _id: string;
    brand: string;
    model: string;
    image: string;
    imageArray: string[];
    year: number;
    category: 'Hatchback' | 'SUV' | 'MPV' | 'Sedan' | 'Luxury' | 'Sports';
    seating_capacity: number;
    fuel_type: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
    transmission: 'Manual' | 'Automatic';
    pricePerDay: number;
    location: string;
    description: string;
    isAvailable: boolean;
    type: 'regular' | 'premium' | 'luxury';
    featured: boolean;
  }>
}
```

### POST /api/cars
Creates a new car entry in the database.

#### Required Fields
```typescript
{
  brand: string;            // Car manufacturer
  model: string;            // Car model name
  image: string;           // Main image URL
  imageArray: string[];    // Additional image URLs
  year: number;           // Manufacturing year
  category: string;       // Vehicle category
  seating_capacity: number; // Number of seats
  fuel_type: string;      // Type of fuel
  transmission: string;   // Transmission type
  pricePerDay: number;    // Rental price per day
  location: string;       // Car location
  description: string;    // Car description
  type: string;          // Car type/segment
}
```

#### Example Request
```http
POST /api/cars
Content-Type: application/json

{
  "brand": "Toyota",
  "model": "Camry",
  "image": "https://example.com/camry.jpg",
  "imageArray": ["https://example.com/camry-1.jpg", "https://example.com/camry-2.jpg"],
  "year": 2023,
  "category": "Sedan",
  "seating_capacity": 5,
  "fuel_type": "Petrol",
  "transmission": "Automatic",
  "pricePerDay": 75,
  "location": "New York",
  "description": "Luxurious sedan with premium features",
  "type": "premium"
}
```

#### Success Response
```json
{
  "message": "Car added successfully",
  "car": {
    "_id": "65123456789abcdef1234567",
    // ... all car details
  }
}
```

## Error Handling

### Common Error Responses

#### 400 Bad Request
Returned when:
- Required fields are missing in POST request
- Invalid data format
- Validation errors

```json
{
  "error": "Missing required fields: brand, model"
}
```

#### 500 Internal Server Error
Returned when:
- Database connection fails
- Server-side errors occur

```json
{
  "error": "Failed to fetch cars"
}
```

## Database Schema
The API uses MongoDB with the following collection structure:

- Database: `car_castle_data`
- Collection: `car_data`

## Notes
- All timestamps are in UTC
- Images should be provided as URLs
- MongoDB ObjectIds are used for unique identification
- The API supports both regular and premium car listings